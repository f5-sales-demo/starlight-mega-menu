import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { MegaMenuIcon } from '../components/MegaMenuIcon.tsx';

const root = fileURLToPath(new URL('..', import.meta.url));

function render(icon, className = 'smm-link-icon') {
  return renderToStaticMarkup(createElement(MegaMenuIcon, { icon, className }));
}

test('rejects obsolete named registry values', () => {
  assert.equal(render('book'), '');
});

test('renders original-color descriptors as encoded isolated images', () => {
  const html = render({
    body: '<path fill="#e4002b" d="M0 0h32v16H0z"/>',
    width: 32,
    height: 16,
    mode: 'original',
  });

  assert.match(html, /^<img /);
  assert.match(html, /class="smm-link-icon smm-svg-image"/);
  assert.match(html, /src="data:image\/svg\+xml,%3Csvg/);
  assert.match(html, /width="32" height="16"/);
  assert.match(html, /alt=""/);
  assert.match(html, /aria-hidden="true"/);
  assert.doesNotMatch(html, /<path/);
});

test('renders currentColor descriptors as encoded masks', () => {
  const html = render(
    {
      body: '<path d="M0 0h24v24H0z"/>',
      width: 24,
      height: 24,
      mode: 'currentColor',
    },
    'smm-mobile-link-icon',
  );

  assert.match(html, /^<span /);
  assert.match(html, /class="smm-mobile-link-icon smm-svg-mask"/);
  assert.match(html, /mask-image:url\(&quot;data:image\/svg\+xml,%3Csvg/);
  assert.match(html, /background-color:currentColor/);
  assert.match(html, /aria-hidden="true"/);
});

test('does not emit wrappers for invalid icon input', () => {
  for (const icon of [
    'missing',
    {},
    { body: '', width: 24, height: 24, mode: 'original' },
    { body: '<path/>', width: 0, height: 24, mode: 'currentColor' },
  ]) {
    assert.equal(render(icon), '');
  }
});

test('desktop and mobile components use the shared icon renderer', () => {
  const desktop = readFileSync(resolve(root, 'components/MegaMenu.tsx'), 'utf8');
  const mobile = readFileSync(resolve(root, 'components/MegaMenuMobile.tsx'), 'utf8');
  assert.match(desktop, /<MegaMenuIcon icon=\{item\.icon\} className="smm-link-icon" \/>/);
  assert.match(mobile, /<MegaMenuIcon icon=\{link\.icon\} className="smm-mobile-link-icon" \/>/);
});

test('source never reintroduces raw DOM injection', () => {
  for (const path of ['components/MegaMenuIcon.tsx', 'components/MegaMenu.tsx', 'components/MegaMenuMobile.tsx']) {
    assert.doesNotMatch(readFileSync(resolve(root, path), 'utf8'), /dangerouslySetInnerHTML/);
  }
});

test('public types expose only the descriptor icon contract', () => {
  const types = readFileSync(resolve(root, 'types.ts'), 'utf8');
  const index = readFileSync(resolve(root, 'index.ts'), 'utf8');
  assert.doesNotMatch(types, /MegaMenuIconName/);
  assert.doesNotMatch(index, /MegaMenuIconName/);
  assert.match(types, /icon\?: MegaMenuSvgIcon;/);
});
