export interface IPaging<M> {
  total: number;
  page: number;
  items: M[];
}
