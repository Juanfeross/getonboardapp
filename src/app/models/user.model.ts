import { SelectedJob } from './selected-job.model';

export interface User {
  id: number;
  name: string;
  lastName: string;
  email: string;
  roles: string[];
  createdAt: string;
  status: boolean;
  selectedJobs?: SelectedJob[];
}
