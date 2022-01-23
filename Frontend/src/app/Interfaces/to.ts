import { Status } from './status';
import { Sts } from './sts';

export interface To {
  id: number;
  sts_id: number;
  sts: Sts;
  date: string;
  status_id: number;
  status: Status;
}
