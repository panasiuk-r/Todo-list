export default interface TodosState {
  entities: Array<{ id: number; todo: string }>,
  status: 'idle' | 'pending' | 'succeeded' | 'failed'
};