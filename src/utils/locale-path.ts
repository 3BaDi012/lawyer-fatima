import type { PagePathKey } from './paths';
import type { Lang } from './types';

export function localeHref(lang: Lang, pathKey: PagePathKey): string {
  if (pathKey === '') {
    return `/${lang}/`;
  }
  return `/${lang}/${pathKey}/`;
}
