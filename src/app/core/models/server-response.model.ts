import { Meta } from "./meta.model";

export interface ServerResponse<T> {
  data: T;
  meta: Meta;
}
