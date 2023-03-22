import { allPages } from 'contentlayer/generated';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Article } from '~/components/ui/layout/Article';
import { MDXContent } from '~/components/ui/mdx/MDXContent';
import { composeTitle } from '~/lib/metadata';

interface GenerateMetadataConfigParams {
  slug: string;
}

interface GenerateMetadataConfig {
  params: GenerateMetadataConfigParams;
}

export async function generateMetadata({ params }: GenerateMetadataConfig): Promise<Metadata> {
  const page = allPages.find(({ slug }) => slug === params.slug);

  return {
    title: composeTitle(page?.title),
  };
}

export async function generateStaticParams() {
  return allPages.map((page) => ({ slug: page.slug }));
}

interface PageParams {
  slug: string;
}

interface PageProps {
  params: PageParams;
}

export default function Page({ params }: PageProps) {
  const page = allPages.find(({ slug }) => slug === params.slug);

  if (!page) {
    notFound();
  }

  return (
    <Article>
      <Article.Header lead={page.lead}>{page.heading ?? page.title}</Article.Header>
      <Article.Body>
        <MDXContent code={page.body.code} />
      </Article.Body>
    </Article>
  );
}
