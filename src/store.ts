import { FileArray } from "chonky";
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
  connected: boolean,
  setConnected: (c: boolean) => void,
  clearAllStates: () => void,
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
  setUserInfo: (u: UserInfo | null) => void,
  nRefreshUserInfo: number,
  refreshUserInfo: () => void,
  files: FileArray,
  setFiles: (files: FileArray) => void,
  selectedFiles: FileArray,
  setSelectedFiles: (files: FileArray) => void,
  fileSelectDialogOpen: boolean,
  setFileSelectDialogOpen: (o: boolean) => void,
  returnFile: string | null,
  setReturnFile: (f: string | null) => void,
  fieldSetter: (val: any) => void,
  setFieldSetter: (f: (val: any) => void) => void,
}


const useStore = create<IProps>((set, get) => ({
  panel: "home",
  setPanel: (p) => { set({panel: p}) },
  serverAddr: "http://127.0.0.1:5000",
  setServerAddr: (addr) => { set({ serverAddr: addr }) },
  connected: false,
  setConnected: (c) => {
    if (c === false) {
      get().clearAllStates()
    }
    set({connected: c})
  },
  clearAllStates: () => {
    set({
      panel: "home",
      allowedRouters: [],
      userMode: "free",
      monitorMode: false,
      userInfo: null,
      jobs: [],
      tasks: [],
      files: [],
    })
  },
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
  setUserInfo: (u) => {
    if (u === null) {
      set({
        jobs: [],
        tasks: [],
        files: [],
      })
    } else {
      const state = get()
      state.refreshTasks()
      state.refreshJobs()
    }
    set({ userInfo: u })
  },
  nRefreshUserInfo: 0,
  refreshUserInfo: () => set((state) => ({nRefreshUserInfo: state.nRefreshUserInfo + 1})),
  files: [],
  setFiles: (files) => set({files: files}),
  selectedFiles: [],
  setSelectedFiles: (files) => set({selectedFiles: files}),
  fileSelectDialogOpen: false,
  setFileSelectDialogOpen: (o) => set({fileSelectDialogOpen: o}),
  returnFile: null,
  setReturnFile: (f) => set({returnFile: f}),
  fieldSetter: (val) => {},
  setFieldSetter: (f) => set({fieldSetter: f}),
}))


export default useStore
