import create from "zustand";


interface IProps {
  serverAddr: string,
  setServerAddr: (addr: string) => void,
}


const useStore = create<IProps>((set) => ({
  serverAddr: "http://127.0.0.1:5000",
  setServerAddr: (addr: string) => { set({ serverAddr: addr }) }
}))


export default useStore
