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
  created_time: string,
  submit_time: string | null,
  stoped_time: string | null,
}

export type panelLabel = 'launch' | 'jobs' | 'files'
