import create from "zustand";
import { FolderChain } from "./types";


interface IProps {
  serverAddr: string,
  setServerAddr: (addr: string) => void,
  validJobTypes: string[],
  setValidJobTypes: (tps: string[]) => void,
  currentPath: FolderChain,
  setCurrentPath: (path: FolderChain) => void,
}


const useStore = create<IProps>((set) => ({
  serverAddr: "http://127.0.0.1:5000",
  setServerAddr: (addr: string) => { set({ serverAddr: addr }) },
  validJobTypes: [],
  setValidJobTypes: (tps: string[]) => { set({ validJobTypes: tps }) },
  currentPath: [{id: 'folder-root', name: 'root'}],
  setCurrentPath: (path: FolderChain) => { set({ currentPath: path }) },
}))


export default useStore
