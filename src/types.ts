export interface ITaskArg{
  name: string,
  type: string,
  range: string | null,
  default: string | null,
}

export interface ITask {
  name: string,
  description: string,
  args: [ITaskArg],
}
