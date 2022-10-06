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

export interface IJob {
  id: string,
  status: string,
  name: string,
  job_type: string,
  check_time: string,
}
