export interface Hub {
  id: number;
  nom: string;
  province: number; // ID
  focus_minier: string;
  specialisation_pedagogique: string;
}

export interface Province {
  id: number;
  nom: string;
  code: string;
}

export interface Cohorte {
  id: number;
  programme: number;
  hub: number;
  date_debut: string;
  date_fin: string;
  nombre_candidats_prevus: number;
  nombre_femmes_min: number;
}