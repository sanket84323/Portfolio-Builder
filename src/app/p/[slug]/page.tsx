import { Metadata } from 'next';
import connectDB from '@/lib/mongodb';
import Portfolio from '@/models/Portfolio';
import PublicPortfolio from '@/components/PublicPortfolio';
import { IPortfolio } from '@/models/Portfolio';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    await connectDB();
    const p = await Portfolio.findOne({ publicSlug: slug, status: 'published' }).lean() as IPortfolio | null;
    if (!p) return { title: 'Portfolio Not Found' };
    return {
      title: p.seoTitle || `${(p as any).displayName || p.title} – Portfolio`,
      description: p.seoDescription || p.about || `Check out this professional portfolio.`,
      openGraph: {
        title: p.seoTitle || p.title,
        description: p.seoDescription || p.about || '',
        images: p.profileImage ? [p.profileImage] : [],
      },
    };
  } catch {
    return { title: 'Portfolio' };
  }
}

export default async function PublicPortfolioPage({ params }: Props) {
  const { slug } = await params;

  try {
    await connectDB();
    const portfolio = await Portfolio.findOne({ publicSlug: slug, status: 'published' }).lean() as IPortfolio | null;

    if (!portfolio) {
      return (
        <div style={{ minHeight: '100vh', background: '#0a0a14', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
          <div style={{ fontSize: '4rem' }}>🔍</div>
          <h1 style={{ color: '#f1f5f9', fontSize: '1.75rem', fontWeight: 700 }}>Portfolio Not Found</h1>
          <p style={{ color: '#64748b' }}>This portfolio doesn't exist or isn't published yet.</p>
          <a href="/" style={{ color: '#818cf8', textDecoration: 'none', fontWeight: 600 }}>← Go to PortfolioBuilder</a>
        </div>
      );
    }

    // Increment view count
    await Portfolio.findByIdAndUpdate(portfolio._id, { $inc: { viewCount: 1 } });

    return <PublicPortfolio portfolio={JSON.parse(JSON.stringify(portfolio))} />;
  } catch (error) {
    return (
      <div style={{ minHeight: '100vh', background: '#0a0a14', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ color: '#f87171' }}>Something went wrong loading this portfolio.</p>
      </div>
    );
  }
}
