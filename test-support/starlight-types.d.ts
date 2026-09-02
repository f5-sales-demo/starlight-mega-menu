import type { AstroIntegration } from "astro";

interface StarlightConfigSetupContext {
  addIntegration: (integration: AstroIntegration) => void;
  astroConfig: {
    integrations: AstroIntegration[];
  };
  config: {
    components?: Record<string, string>;
    customCss?: string[];
  };
  logger: {
    info: (message: string) => void;
  };
  updateConfig: (config: {
    components?: Record<string, string>;
    customCss?: string[];
  }) => void;
}

export interface StarlightPlugin {
  hooks: {
    "config:setup": (
      context: StarlightConfigSetupContext,
    ) => Promise<void> | void;
  };
  name: string;
}
