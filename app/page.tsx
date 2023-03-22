import { AppearancesSection } from '~/components/home/AppearancesSection';
import { ContentSection } from '~/components/home/ContentSection';
import { HeroSection } from '~/components/home/HeroSection';
import { PostsSection } from '~/components/home/PostsSection';

export default function Home() {
  return (
    <>
      <HeroSection />
      <ContentSection>
        <PostsSection />
        <AppearancesSection />
      </ContentSection>
    </>
  );
}
