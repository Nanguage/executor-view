import create from "zustand";
import { FolderChain, Job, ServerRouter } from "./types";


interface IProps {
  serverAddr: string,
  setServerAddr: (addr: string) => void,
  monitorMode: boolean,
  setMonitorMode: (m: boolean) => void,
  allowedRouters: ServerRouter[],
  setAllowedRouters: (rts: ServerRouter[]) => void,
  validJobTypes: string[],
  setValidJobTypes: (tps: string[]) => void,
  nRefreshServer: number,
  refreshServer: () => void,
  currentPath: FolderChain,
  setCurrentPath: (path: FolderChain) => void,
  jobs: Job[],
  setJobs: (jobs: Job[]) => void,
  nRefreshJobs: number,
  refreshJobs: () => void,
}


const useStore = create<IProps>((set) => ({
  serverAddr: "http://127.0.0.1:5000",
  setServerAddr: (addr) => { set({ serverAddr: addr }) },
  monitorMode: false,
  setMonitorMode: (m) => { set({ monitorMode: m }) },
  allowedRouters: [],
  setAllowedRouters: (rts) => { set({ allowedRouters: rts }) },
  validJobTypes: [],
  setValidJobTypes: (tps) => { set({ validJobTypes: tps }) },
  nRefreshServer: 0,
  refreshServer: () => {
    set((state) => ({ nRefreshServer: state.nRefreshServer + 1 }))
  },
  currentPath: [{id: 'folder-root', name: 'root'}],
  setCurrentPath: (path) => { set({ currentPath: path }) },
  jobs: [],
  setJobs: (jobs) => { set({ jobs: jobs }) },
  nRefreshJobs: 0,
  refreshJobs: () => {
    set((state) => ({ nRefreshJobs: state.nRefreshJobs + 1 }))
  },
}))


export default useStore
