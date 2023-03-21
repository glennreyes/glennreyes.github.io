import type { ComponentPropsWithoutRef } from 'react';

type ArticleProps = Omit<ComponentPropsWithoutRef<'article'>, 'className'>;

export function Article(props: ArticleProps) {
  return <article className="space-y-16 px-4" {...props} />;
}
