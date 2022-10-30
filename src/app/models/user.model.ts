import { Job } from './job.model';

export interface User {
  name: string;
  email: string;
  favoriteJobs: Job[];
}
