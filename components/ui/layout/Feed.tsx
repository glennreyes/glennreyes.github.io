import { ChevronRightIcon } from '@heroicons/react/20/solid';
import clsx from 'clsx';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import { DateDisplay } from '../elements/DateDisplay';
import { Link } from '../link/Link';
import { H4 } from '../typography/H4';

interface FeedProps extends Omit<ComponentPropsWithoutRef<'div'>, 'className'> {
  appearance?: 'grid' | 'list';
  title?: string;
}

export function Feed({ appearance = 'list', children, title, ...props }: FeedProps) {
  const wrapperClasses = clsx(
    title ? 'col-span-3' : 'not-prose',
    appearance === 'grid' && 'md:grid-cols-2',
    'grid gap-12 md:gap-16',
  );

  if (title) {
    return (
      <div className="not-prose grid gap-y-8 md:grid-cols-4" {...props}>
        <div className="md:border-l md:border-slate-100 md:px-8 dark:md:border-slate-800/50">
          <h2 className="font-semibold text-teal-700/90 md:sticky md:top-20">{title}</h2>
        </div>
        <div className={wrapperClasses}>{children}</div>
      </div>
    );
  }

  return (
    <div className={wrapperClasses} {...props}>
      {children}
    </div>
  );
}

interface FeedItemProps extends Omit<ComponentPropsWithoutRef<'article'>, 'className'> {
  action?: string;
  children?: ReactNode;
  date?: Date | string;
  description?: ReactNode;
  link?: string;
  meta?: ReactNode;
  title: string;
}

function FeedItem({ action, children, description, link, title, ...rest }: FeedItemProps) {
  const articleClasses = clsx(action ? 'gap-8' : 'gap-2', link && 'group relative', 'grid');
  const descriptionClasses = clsx(link && 'relative z-10', 'text-slate-500 dark:text-slate-400');
  const metaClasses = clsx(link && 'relative z-10 order-first', 'text-slate-400 dark:text-slate-500');
  const { date, meta, ...props } = {
    date: 'date' in rest && rest.date !== undefined ? rest.date : undefined,
    meta: 'meta' in rest && rest.meta !== undefined ? rest.meta : undefined,
    ...rest,
  };
  const content = (
    <>
      <H4 as="h3">
        {link ? (
          <Link href={link}>
            <span className="absolute -inset-4 z-20 md:-inset-6" />
            <span className="relative z-10">{title}</span>
          </Link>
        ) : (
          title
        )}
      </H4>
      {meta !== undefined ? (
        <div className={metaClasses}>{meta}</div>
      ) : (
        date !== undefined && <DateDisplay className={metaClasses} value={date} />
      )}
      {typeof description === 'string' ? (
        <p className={descriptionClasses}>{description}</p>
      ) : (
        <div className={descriptionClasses}>{description}</div>
      )}
      {children}
    </>
  );

  return (
    <article className={articleClasses} {...props}>
      {action ? (
        <>
          <div className="grid gap-2">{content}</div>
          <p className="relative z-10 inline-flex items-center gap-0.5 font-semibold text-teal-500 transition group-hover:text-teal-600">
            {action}
            <ChevronRightIcon aria-hidden className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
          </p>
        </>
      ) : (
        content
      )}
      {link && (
        <div className="absolute -inset-4 scale-95 bg-slate-50 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 dark:bg-slate-900/50 lg:-inset-6 lg:rounded-[1.75rem]" />
      )}
    </article>
  );
}

Feed.Item = FeedItem;
