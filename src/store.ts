import create from "zustand";
import { FolderChain, Job } from "./types";


interface IProps {
  serverAddr: string,
  setServerAddr: (addr: string) => void,
  validJobTypes: string[],
  setValidJobTypes: (tps: string[]) => void,
  currentPath: FolderChain,
  setCurrentPath: (path: FolderChain) => void,
  jobs: Job[],
  setJobs: (jobs: Job[]) => void,
  nRefreshJobs: number,
  refreshJobs: () => void,
}


const useStore = create<IProps>((set) => ({
  serverAddr: "http://127.0.0.1:5000",
  setServerAddr: (addr: string) => { set({ serverAddr: addr }) },
  validJobTypes: [],
  setValidJobTypes: (tps: string[]) => { set({ validJobTypes: tps }) },
  currentPath: [{id: 'folder-root', name: 'root'}],
  setCurrentPath: (path: FolderChain) => { set({ currentPath: path }) },
  jobs: [],
  setJobs: (jobs: Job[]) => { set({ jobs: jobs }) },
  nRefreshJobs: 0,
  refreshJobs: () => {
    set((state) => ({ nRefreshJobs: state.nRefreshJobs + 1 }))
  },
}))


export default useStore
