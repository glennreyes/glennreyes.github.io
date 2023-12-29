import { notFound } from 'next/navigation';
import { Page } from '@/components/ui/layout/page2';
import { MDXContent } from '@/components/ui/mdx/mdx-content';
import { allPages } from 'contentlayer/generated';

const page = allPages.find(({ path }) => path === 'legal');

export const metadata = {
  title: page?.title,
};

export default function LegalPage() {
  if (!page) {
    notFound();
  }

  return (
    <Page>
      <Page.Header lead={page.lead} meta={page.meta}>
        {page.heading ?? page.title}
      </Page.Header>
      <Page.Body>
        <MDXContent code={page.body.code} />
      </Page.Body>
    </Page>
  );
}
