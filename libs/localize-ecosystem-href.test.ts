import { describe, expect, it } from 'vitest';
import { langToSlug, localizeEcosystemHref } from './localize-ecosystem-href';

describe('langToSlug', () => {
  it('converts BCP-47 codes to slugs', () => {
    expect(langToSlug('pt-BR')).toBe('pt-br');
    expect(langToSlug('zh-CN')).toBe('zh-cn');
    expect(langToSlug('zh-TW')).toBe('zh-tw');
  });

  it('passes through simple codes', () => {
    expect(langToSlug('en')).toBe('en');
    expect(langToSlug('fr')).toBe('fr');
  });
});

describe('localizeEcosystemHref', () => {
  it('injects locale slug into ecosystem URLs', () => {
    expect(
      localizeEcosystemHref('https://f5xc-salesdemos.github.io/waf/', 'fr'),
    ).toBe('https://f5xc-salesdemos.github.io/waf/fr/');
  });

  it('skips URLs that already have a locale segment', () => {
    expect(
      localizeEcosystemHref('https://f5xc-salesdemos.github.io/waf/fr/', 'fr'),
    ).toBe('https://f5xc-salesdemos.github.io/waf/fr/');
  });

  it('ignores non-ecosystem hosts', () => {
    expect(
      localizeEcosystemHref('https://example.com/page/', 'fr'),
    ).toBe('https://example.com/page/');
  });

  it('rejects invalid slugs', () => {
    expect(
      localizeEcosystemHref('https://f5xc-salesdemos.github.io/waf/', 'invalid'),
    ).toBe('https://f5xc-salesdemos.github.io/waf/');
  });
});
