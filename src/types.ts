export interface TaskArg{
  name: string,
  type: string,
  range: Array<string | number> | null,
  default: string | null,
}

export interface Task {
  name: string,
  description: string,
  args: Array<TaskArg>,
}

export interface Job {
  id: string,
  status: string,
  name: string,
  job_type: string,
  check_time: string,
  created_time: string,
  submit_time: string | null,
  stoped_time: string | null,
}

export type PanelLabel = 'launch' | 'jobs' | 'files'

export interface Folder {
  id: string,
  name: string,
}

export type FolderChain = Array<Folder>
