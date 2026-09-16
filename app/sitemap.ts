import { MetadataRoute } from 'next';
import { getAllMedications } from '@/lib/medications';
import { ALL_LOCALES, BASE_URL, getLocalizedPath } from '@/lib/i18n/config';

export default function sitemap(): MetadataRoute.Sitemap {
  const meds = getAllMedications();
  const currentDate = new Date();

  // 7 Core Static Routes across all 5 languages
  const baseStaticSubpaths = [
    { path: '/', priority: 1.0, changeFrequency: 'daily' as const },
    { path: '/manifest', priority: 0.95, changeFrequency: 'daily' as const },
    { path: '/drugs', priority: 0.9, changeFrequency: 'daily' as const },
    { path: '/customs-card', priority: 0.85, changeFrequency: 'weekly' as const },
    { path: '/guide/port-clearance-walkthrough', priority: 0.85, changeFrequency: 'weekly' as const },
    { path: '/calculator', priority: 0.8, changeFrequency: 'weekly' as const },
    { path: '/guide/bring-medications-to-china', priority: 0.8, changeFrequency: 'monthly' as const },
  ];

  const localizedStaticRoutes: MetadataRoute.Sitemap = [];

  for (const item of baseStaticSubpaths) {
    for (const locale of ALL_LOCALES) {
      const localizedPath = getLocalizedPath(item.path, locale);
      localizedStaticRoutes.push({
        url: localizedPath === '/' ? `${BASE_URL}` : `${BASE_URL}${localizedPath}`,
        lastModified: currentDate,
        changeFrequency: item.changeFrequency,
        priority: locale === 'en' ? item.priority : Math.max(0.7, item.priority - 0.05),
      });
    }
  }

  // Dynamic Drug Dossier Routes across all 5 languages (31 meds * 5 = 155 URLs)
  const localizedDrugRoutes: MetadataRoute.Sitemap = [];

  for (const med of meds) {
    for (const locale of ALL_LOCALES) {
      const localizedPath = getLocalizedPath(`/drugs/${med.slug}`, locale);
      localizedDrugRoutes.push({
        url: `${BASE_URL}${localizedPath}`,
        lastModified: currentDate,
        changeFrequency: 'weekly',
        priority: locale === 'en' ? 0.9 : 0.85,
      });
    }
  }

  return [...localizedStaticRoutes, ...localizedDrugRoutes];
}
