export interface ITaskArg{
  name: string,
  type: string,
  range: Array<string | number> | null,
  default: string | null,
}

export interface ITask {
  name: string,
  description: string,
  args: Array<ITaskArg>,
}
