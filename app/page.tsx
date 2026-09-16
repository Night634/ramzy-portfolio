import { getProfile, getPortfolios, getStacks } from '@/actions/portfolio';
import PortfolioClient from '@/components/PortfolioClient';

export const revalidate = 0; // Disable caching agar update di admin langsung tampil secara real-time

export default async function HomePage() {
  const [profile, portfolios, stacks] = await Promise.all([
    getProfile(),
    getPortfolios(),
    getStacks(),
  ]);

  return (
    <PortfolioClient 
      profile={profile} 
      portfolios={portfolios} 
      stacks={stacks} 
    />
  );
}