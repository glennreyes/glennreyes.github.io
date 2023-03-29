import { Appearances } from '~/components/home/Appearances';
import { Hero } from '~/components/home/Hero';
import { Posts } from '~/components/home/Posts';
import { Newsletter } from '~/components/newsletter/Newsletter';
import { Content } from '~/components/ui/layout/Content';

export const revalidate = 3600;

export default function Home() {
  return (
    <>
      <Hero />
      <Content>
        <Content.Primary>
          <Posts />
        </Content.Primary>
        <Content.Secondary>
          {/* @ts-expect-error Server Components */}
          <Appearances />
          <Newsletter />
        </Content.Secondary>
      </Content>
    </>
  );
}
