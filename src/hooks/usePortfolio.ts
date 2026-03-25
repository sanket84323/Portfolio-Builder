'use client';

import { useState, useEffect, useCallback } from 'react';
import { IPortfolio } from '@/models/Portfolio';

export function usePortfolio(id: string | null) {
  const [portfolio, setPortfolio] = useState<Partial<IPortfolio> | null>(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  const fetchPortfolio = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/portfolios/${id}`);
      if (res.ok) {
        const data = await res.json();
        setPortfolio(data.portfolio);
      }
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchPortfolio();
  }, [fetchPortfolio]);

  const save = useCallback(
    async (updates: Partial<IPortfolio>) => {
      if (!id) return;
      setSaving(true);
      try {
        const res = await fetch(`/api/portfolios/${id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updates),
        });
        if (res.ok) {
          const data = await res.json();
          setPortfolio(data.portfolio);
          setLastSaved(new Date());
          return data.portfolio;
        }
      } finally {
        setSaving(false);
      }
    },
    [id]
  );

  const update = useCallback((updates: Partial<IPortfolio>) => {
    setPortfolio((prev) => (prev ? { ...prev, ...updates } : updates));
  }, []);

  return { portfolio, loading, saving, lastSaved, save, update, refetch: fetchPortfolio };
}

export function usePortfolios() {
  const [portfolios, setPortfolios] = useState<IPortfolio[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPortfolios = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/portfolios');
      if (res.ok) {
        const data = await res.json();
        setPortfolios(data.portfolios);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPortfolios();
  }, [fetchPortfolios]);

  const createPortfolio = async (title: string) => {
    const res = await fetch('/api/portfolios', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title }),
    });
    if (res.ok) {
      const data = await res.json();
      setPortfolios((prev) => [data.portfolio, ...prev]);
      return data.portfolio;
    }
    return null;
  };

  const deletePortfolio = async (id: string) => {
    const res = await fetch(`/api/portfolios/${id}`, { method: 'DELETE' });
    if (res.ok) {
      setPortfolios((prev) => prev.filter((p) => p._id.toString() !== id));
    }
  };

  return { portfolios, loading, createPortfolio, deletePortfolio, refetch: fetchPortfolios };
}
