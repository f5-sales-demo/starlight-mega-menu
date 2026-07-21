import type * as React from 'react';

/**
 * Vetted inline-SVG icon registry for mega-menu link icons.
 *
 * Link icons are referenced by name (see {@link MegaMenuIconName}) and resolved
 * to a trusted React element here. Raw SVG-string icons are intentionally NOT
 * supported: injecting arbitrary markup via `dangerouslySetInnerHTML` is a
 * security risk and is disallowed by the fleet lint rules. To add an icon,
 * append a named entry below using the shared house style.
 *
 * House style: 24x24 viewBox, `fill="none"`, `stroke="currentColor"`, rounded
 * caps/joins. The consuming `.smm-link-icon svg` / `.smm-mobile-link-icon svg`
 * rules size the icon to its container, so no explicit width/height is needed.
 */
function icon(children: React.ReactNode): React.ReactElement {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

export const ICONS = {
  'arrow-right': icon(<path d="M5 12h14M13 6l6 6-6 6" />),
  'chevron-right': icon(<path d="M9 18l6-6-6-6" />),
  'external-link': icon(
    <>
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <path d="M15 3h6v6M10 14 21 3" />
    </>,
  ),
  book: icon(
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />,
  ),
  check: icon(<path d="M20 6 9 17l-5-5" />),
  dot: icon(<circle cx="12" cy="12" r="4" />),
} satisfies Record<string, React.ReactElement>;

/** Names of the icons available to mega-menu links. */
export type MegaMenuIconName = keyof typeof ICONS;
