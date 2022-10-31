import { User } from './user.model';

export interface Login {
  email?: string;
  password?: string;
  accessToken?: string;
  user?: User;
}
