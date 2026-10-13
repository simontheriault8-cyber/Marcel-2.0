export interface CmrDomainSupport {
  arts: boolean;
  genie: boolean;
  science: boolean;
}

export const CMR_JOB_DOMAINS: Record<string, CmrDomainSupport> = {
  "00178": { arts: true, genie: true, science: true }, // Pilote
  "00179": { arts: true, genie: true, science: true }, // OSRAC (Air Combat Systems Officer)
  "00180": { arts: true, genie: true, science: true }, // OCA (Aerospace Control Officer)
  "00181": { arts: false, genie: true, science: true }, // Officier du génie aérospatial (AERE)
  "00182": { arts: true, genie: true, science: true }, // Blindé (Armour)
  "00183": { arts: true, genie: true, science: true }, // Artillerie
  "00184": { arts: true, genie: true, science: true }, // Infanterie
  "00185": { arts: false, genie: true, science: true }, // Génie de combat
  "00187": { arts: false, genie: true, science: true }, // Officier des transmissions (Sigs)
  "00189": { arts: false, genie: true, science: false }, // Officier du génie électrique et mécanique (GEM)
  "00203": { arts: true, genie: false, science: false }, // Logistique
  "00207": { arts: true, genie: true, science: true }, // Officier de guerre navale (OGN)
  "00208": { arts: true, genie: false, science: false }, // Officier de développement de l'instruction (ODI)
  "00213": { arts: true, genie: true, science: true }, // Renseignement (Int)
  "00214": { arts: true, genie: false, science: false }, // Police militaire (PM)
  "00328": { arts: true, genie: true, science: true }, // Opérations maritimes et de surface
  "00340": { arts: false, genie: true, science: true }, // Génie maritime des systèmes de combat
  "00341": { arts: false, genie: true, science: true }, // Génie maritime des systèmes de coque et de propulsion
  "00344": { arts: false, genie: true, science: true }, // Cyberopérations
  "00345": { arts: false, genie: true, science: true }, // Opérations spatiales
  "00389": { arts: true, genie: true, science: true }, // Affaires publiques (PAO)
  "00398": { arts: true, genie: false, science: false }, // Administration du personnel
};
