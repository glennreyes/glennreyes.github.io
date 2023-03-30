import type { ComponentPropsWithoutRef } from 'react';
import { Link } from './Link';

type InlineLinkProps = Omit<ComponentPropsWithoutRef<typeof Link>, 'className'>;

export function InlineLink(props: InlineLinkProps) {
  return (
    <Link
      className="text-slate-800 underline decoration-teal-200 decoration-2 underline-offset-4 transition hover:text-slate-600 hover:decoration-teal-400 focus-visible:text-slate-600 focus-visible:no-underline"
      {...props}
    />
  );
}
