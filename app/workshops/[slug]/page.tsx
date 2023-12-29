import type { Metadata } from 'next';
import { AppearancesFeed } from '@/components/appearances/appearances-feed';
import { Divider } from '@/components/ui/elements/divider2';
import { TagCloud } from '@/components/ui/elements/tag-cloud';
import { Page } from '@/components/ui/layout/page2';
import { ActionLink } from '@/components/ui/link/action-link';
import { MDXRemoteContent } from '@/components/ui/mdx/mdx-remote-content';
import { H2 } from '@/components/ui/typography/h22';
import { getAllWorkshops, getWorkshopBySlug } from '@/lib/workshops';

export const revalidate = 3600;

interface GenerateMetadataConfigParams {
  slug: string;
}

interface GenerateMetadataConfig {
  params: GenerateMetadataConfigParams;
}

export async function generateMetadata({
  params,
}: GenerateMetadataConfig): Promise<Metadata> {
  const workshop = await getWorkshopBySlug(params.slug);

  return {
    title: workshop.title,
  };
}

export async function generateStaticParams() {
  const allWorkshops = await getAllWorkshops();

  return allWorkshops.map((workshop) => ({ slug: workshop.slug }));
}

interface WorkshopPageParams {
  slug: string;
}

interface WorkshopPageProps {
  params: WorkshopPageParams;
}

export default async function WorkshopPage({ params }: WorkshopPageProps) {
  const workshop = await getWorkshopBySlug(params.slug);
  const events = workshop.appearances.map((appearance) => appearance.event);

  return (
    <Page>
      <Page.Header lead={<TagCloud tags={workshop.tags} />} meta="Workshop">
        {workshop.title}
      </Page.Header>
      <Page.Body>
        <MDXRemoteContent source={workshop.description} />
        {workshop.curriculum !== null && (
          <MDXRemoteContent source={workshop.curriculum} />
        )}
        {events.length > 0 && (
          <>
            <Divider />
            <H2>Appearances</H2>
            <AppearancesFeed events={events}>
              <ActionLink href="/appearances">All Appearances</ActionLink>
            </AppearancesFeed>
          </>
        )}
      </Page.Body>
    </Page>
  );
}
