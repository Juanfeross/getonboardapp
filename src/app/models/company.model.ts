import { Logo } from '@core/models/logo.models';

export interface CompanyAttributes {
  name: string;
  description: string;
  long_description: string | null;
  projects: string | null;
  benefits: string | null;
  web: string;
  twitter: string;
  github: string;
  facebook: string;
  angellist: string;
  logo: Logo;
  country: string;
}

export interface Company {
  id: string;
  type: string;
  attributes: CompanyAttributes;
  relationships?: Object;
}
