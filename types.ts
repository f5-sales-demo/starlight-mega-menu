/** A serializable SVG icon that can be rendered without inserting markup into the DOM. */
export interface MegaMenuSvgIcon {
  /** SVG child markup, excluding the outer `<svg>` element. */
  body: string;
  /** Intrinsic SVG viewBox width. */
  width: number;
  /** Intrinsic SVG viewBox height. */
  height: number;
  /** Preserve original fills or render the icon using the link's current color. */
  mode: 'original' | 'currentColor';
}

export type I18nString = Record<string, string>;

export interface MegaMenuConfig {
  items: MegaMenuItem[];
  mobileLabels?: {
    open?: string;
    openTranslations?: I18nString;
    close?: string;
    closeTranslations?: I18nString;
    menu?: string;
    menuTranslations?: I18nString;
  };
}

export interface MegaMenuItem {
  label: string;
  translations?: I18nString;
  href?: string;
  content?: MegaMenuPanel;
}

export interface MegaMenuPanel {
  layout?: 'grid' | 'list';
  columns?: number;
  categories?: MegaMenuCategory[];
  footer?: MegaMenuFooter;
}

export interface MegaMenuCategory {
  title: string;
  translations?: I18nString;
  items: MegaMenuLink[];
}

export interface MegaMenuLink {
  label: string;
  translations?: I18nString;
  description?: string;
  descriptionTranslations?: I18nString;
  href: string;
  icon?: MegaMenuSvgIcon;
}

export interface MegaMenuFooter {
  label: string;
  translations?: I18nString;
  href: string;
  description?: string;
  descriptionTranslations?: I18nString;
}
