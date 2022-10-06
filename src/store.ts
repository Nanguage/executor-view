import create from "zustand";


interface IProps {
  serverAddr: string,
  setServerAddr: (addr: string) => void,
  validJobTypes: string[],
  setValidJobTypes: (tps: string[]) => void,
}


const useStore = create<IProps>((set) => ({
  serverAddr: "http://127.0.0.1:5000",
  setServerAddr: (addr: string) => { set({ serverAddr: addr }) },
  validJobTypes: [],
  setValidJobTypes: (tps: string[]) => { set({ validJobTypes: tps }) },
}))


export default useStore
