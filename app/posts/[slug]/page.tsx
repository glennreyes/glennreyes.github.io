import { allPosts } from 'contentlayer/generated';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { useMDXComponent } from '~/hooks/useMDXComponent';
import { getTitle } from '~/utils/metadata';

interface GenerateMetaDataConfigParams {
  slug: string;
}

interface GenerateMetaDataConfig {
  params: GenerateMetaDataConfigParams;
}

export async function generateMetaData({ params }: GenerateMetaDataConfig): Promise<Metadata> {
  const post = allPosts.find(({ slug }) => slug === params.slug);

  return {
    title: getTitle(post?.title),
  };
}

export async function generatStaticParams() {
  return allPosts.map((post) => ({ slug: post.slug }));
}

interface PostPageParams {
  slug: string;
}

interface PostPageProps {
  params: PostPageParams;
}

export default function PostPage({ params }: PostPageProps) {
  const post = allPosts.find(({ slug }) => slug === params.slug);
  const MDXComponent = useMDXComponent(post?.body.code);

  if (!MDXComponent) {
    notFound();
  }

  return <MDXComponent />;
}
