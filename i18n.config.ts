export const i18n = {
    defaultLocale: "en" as const,
    locales: ["en", "es"] as const,
} as const;

export type Locale = (typeof i18n)["locales"][number];
