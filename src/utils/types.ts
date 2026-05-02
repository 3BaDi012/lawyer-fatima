export type Lang = 'ar' | 'en';

export function isLang(value: string): value is Lang {
  return value === 'ar' || value === 'en';
}
