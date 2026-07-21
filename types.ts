import type { MegaMenuIconName } from './components/icons.tsx';

export type { MegaMenuIconName };

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
  icon?: MegaMenuIconName;
}

export interface MegaMenuFooter {
  label: string;
  translations?: I18nString;
  href: string;
  description?: string;
  descriptionTranslations?: I18nString;
}
