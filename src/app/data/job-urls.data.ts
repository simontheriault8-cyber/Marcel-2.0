import { APP_LINKS } from "./app-links.data";

/**
 * Re-export des URL des métiers depuis LINKS.json pour rétrocompatibilité
 * et centralisation complète de tous les liens de l'application.
 */
export const JOB_URLS: { [key: string]: { fr: string; en: string } } = APP_LINKS.metiers;
