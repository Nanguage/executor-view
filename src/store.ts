import create from "zustand";
import {
  PanelLabel,
  FolderChain, Job, ServerRouter,
  CallReq, JobModify, UserMode,
  UserInfo, Task,
} from "./types";


interface IProps {
  panel: PanelLabel,
  setPanel: (p: PanelLabel) => void, 
  serverAddr: string,
  setServerAddr: (addr: string) => void,
  monitorMode: boolean,
  setMonitorMode: (m: boolean) => void,
  allowedRouters: ServerRouter[],
  setAllowedRouters: (rts: ServerRouter[]) => void,
  userMode: UserMode,
  setUserMode: (m: UserMode) => void,
  nRefreshServer: number,
  refreshServer: () => void,
  currentPath: FolderChain,
  setCurrentPath: (path: FolderChain) => void,
  jobs: Job[],
  setJobs: (jobs: Job[]) => void,
  id2Job: Map<string, Job>,
  setId2Job: (m: Map<string, Job>) => void,
  nRefreshJobs: number,
  refreshJobs: () => void,
  tasks: Task[],
  setTasks: (tasks: Task[]) => void,
  nRefreshTasks: number,
  refreshTasks: () => void,
  currentCallReq: CallReq | null,
  launchTask: (req: CallReq) => void,
  selectedJobs: Job[],
  setSelectedJobs: (jobs: Job[]) => void,
  jobModify: JobModify | undefined,
  jobsForModify: Job[],
  nJobModify: number,
  modifyJobs: (jobs: Job[], modify: JobModify) => void,
  loginDialogOpen: boolean,
  setLoginDialogOpen: (o: boolean) => void,
  nLogin: number,
  currentUsername: string | null,
  currentPassword: string | null,
  login: (username: string, password: string) => void,
  userInfo: UserInfo | null,
  setUserInfo: (u: UserInfo) => void,
  nRefreshUserInfo: number,
}


const useStore = create<IProps>((set) => ({
  panel: "home",
  setPanel: (p) => { set({panel: p}) },
  serverAddr: "http://127.0.0.1:5000",
  setServerAddr: (addr) => { set({ serverAddr: addr }) },
  monitorMode: false,
  setMonitorMode: (m) => { set({ monitorMode: m }) },
  allowedRouters: [],
  setAllowedRouters: (rts) => { set({ allowedRouters: rts }) },
  userMode: "free",
  setUserMode: (m) => { set({ userMode: m }) },
  nRefreshServer: 0,
  refreshServer: () => {
    set((state) => ({ nRefreshServer: state.nRefreshServer + 1 }))
  },
  currentPath: [{id: 'folder-root', name: 'root'}],
  setCurrentPath: (path) => { set({ currentPath: path }) },
  jobs: [],
  setJobs: (jobs) => { set({ jobs: jobs }) },
  id2Job: new Map(),
  setId2Job: (m) => { set({ id2Job: m }) },
  nRefreshJobs: 0,
  refreshJobs: () => {
    set((state) => ({ nRefreshJobs: state.nRefreshJobs + 1 }))
  },
  tasks: [],
  setTasks: (tasks) => set({tasks: tasks}),
  nRefreshTasks: 0,
  refreshTasks: () => set((state) => ({nRefreshTasks: state.nRefreshTasks + 1})),
  currentCallReq: null,
  launchTask: (req) => { set({ currentCallReq: req }) },
  selectedJobs: [],
  setSelectedJobs: (jobs) => { set({ selectedJobs: jobs }) },
  jobModify: undefined,
  jobsForModify: [],
  nJobModify: 0,
  modifyJobs: (jobs, modify) => {
    set({ jobsForModify: jobs })
    set({ jobModify: modify })
    set((state) => ({ nJobModify: state.nJobModify + 1 }))
  },
  loginDialogOpen: false,
  setLoginDialogOpen: (o) => set({ loginDialogOpen: o }),
  currentUsername: null,
  currentPassword: null,
  nLogin: 0,
  login: (username, password) => set((state) => ({
    currentUsername: username,
    currentPassword: password,
    nLogin: state.nLogin + 1,
  })),
  userInfo: null,
  setUserInfo: (u) => set({ userInfo: u }),
  nRefreshUserInfo: 0,
  refreshUserInfo: () => set((state) => ({nRefreshUserInfo: state.nRefreshUserInfo + 1})),
}))


export default useStore
