/** @jsxRuntime automatic */
import type * as React from 'react';
import type { MegaMenuSvgIcon } from '../types.ts';

interface MegaMenuIconProps {
  icon: MegaMenuSvgIcon | undefined;
  className: string;
}

function isSvgIcon(icon: unknown): icon is MegaMenuSvgIcon {
  if (!icon || typeof icon !== 'object') return false;
  const candidate = icon as Partial<MegaMenuSvgIcon>;
  return (
    typeof candidate.body === 'string' &&
    candidate.body.trim().length > 0 &&
    typeof candidate.width === 'number' &&
    Number.isFinite(candidate.width) &&
    candidate.width > 0 &&
    typeof candidate.height === 'number' &&
    Number.isFinite(candidate.height) &&
    candidate.height > 0 &&
    (candidate.mode === 'original' || candidate.mode === 'currentColor')
  );
}

function svgDataUri(icon: MegaMenuSvgIcon): string {
  const fill = icon.mode === 'currentColor' ? ' fill="currentColor"' : '';
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${icon.width}" height="${icon.height}" viewBox="0 0 ${icon.width} ${icon.height}"${fill}>${icon.body}</svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

/** Renders serializable SVG descriptors through one safe desktop/mobile path. */
export function MegaMenuIcon({ icon, className }: MegaMenuIconProps): React.ReactElement | null {
  if (!isSvgIcon(icon)) return null;

  const uri = svgDataUri(icon);
  if (icon.mode === 'original') {
    return (
      <img
        className={`${className} smm-svg-image`}
        src={uri}
        width={icon.width}
        height={icon.height}
        alt=""
        aria-hidden="true"
      />
    );
  }

  return (
    <span
      className={`${className} smm-svg-mask`}
      style={{
        backgroundColor: 'currentColor',
        maskImage: `url("${uri}")`,
        WebkitMaskImage: `url("${uri}")`,
      }}
      aria-hidden="true"
    />
  );
}
