import { SelectedJob } from './selected-job.model';

export interface SelectedJobRequest {
  id: number;
  selectedJobs: SelectedJob[];
}
