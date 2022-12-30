import React from 'react';
import axios from 'axios';
import {
    FileArray,
    FileData,
} from 'chonky';

import useStore from '../../store';
import { folderChainToStr } from '../../utils';
import MessageBar from '../common/MessageBar';


interface FetchFilesProps {
  nRefresh: number;
  setFiles: (files: FileArray) => void;
}


const FetchFiles = (props: FetchFilesProps) => {
  const { nRefresh, setFiles } = props
  const [alertOpen, setAlertOpen] = React.useState<boolean>(false)
  const [errorText, setErrorText] = React.useState<string>("")
  const { currentPath } = useStore((state) => state)
  const serverAddr = useStore((state) => state.serverAddr)

  React.useEffect(() => {
    const addr = `${serverAddr}/file/list_dir`
    const path = folderChainToStr(currentPath.slice(1, currentPath.length))
    setFiles([])
    axios.post(addr, {path: path}).then((resp) => {
      const sfiles = []
      for (let f of resp.data) {
        const randID = Math.random().toString().slice(2, 12)
        f['id'] = randID
        sfiles.push(f)
      }
      if (path.length > 0) {
        const parent: FileData = {
          'id': 'parent',
          'name': '../',
          'isDir': true,
          'draggable': false,
        }
        sfiles.push(parent)
      }
      setFiles(sfiles)
    }).catch((error) => {
      console.log(error)
      setErrorText(error.message + `: fetch ${addr}`)
      setAlertOpen(true)
    })
  }, [serverAddr, currentPath, nRefresh])

  return (
    <MessageBar
      alertOpen={alertOpen}
      setAlertOpen={setAlertOpen}
      alertHidenDuration={6000}
      text={errorText}
      />
  )
}


export default FetchFiles;
