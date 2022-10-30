export interface JobAttributes {
  title: string;
  description_headline: string;
  description: string;
  functions_headline?: string | null;
  functions: string;
  benefits_headline: string;
  benefits: string;
  desirable_headline: string;
  desirable: string;
  remote: boolean;
  remote_modality: string;
  remote_zone?: string | null;
  country: string;
  category_name: string;
  perks: any[];
  min_salary: number;
  max_salary: number;
  modality: string;
  seniority: string;
  published_at: number;
  id: number;
  slug: string;
  questions?: null;
  submitted_at: number;
  created_at: number;
  updated_at: number;
}

export interface Job {
  id: string;
  type: string;
  attributes: JobAttributes;
}
