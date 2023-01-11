import React from 'react';
import {
    FileArray,
    FileData,
} from 'chonky';
import { useSnackbar } from 'notistack';

import useStore from '../../store';
import { folderChainToStr } from '../../utils';
import { getAxiosInstance } from '../../utils';


interface FetchFilesProps {
  nRefresh: number;
  setFiles: (files: FileArray) => void;
}


const FetchFiles = (props: FetchFilesProps) => {
  const { nRefresh, setFiles } = props
  const { currentPath } = useStore((state) => state)
  const serverAddr = useStore((state) => state.serverAddr)

  const { enqueueSnackbar } = useSnackbar()

  React.useEffect(() => {
    setFiles([])
    reqFiles()
  }, [serverAddr, currentPath, nRefresh])

  const reqFiles = React.useCallback(() => {
    const path = folderChainToStr(currentPath.slice(1, currentPath.length))
    const addr = '/file/list_dir'
    const instance = getAxiosInstance(serverAddr)
    instance.post(addr, {path: path}).then((resp) => {
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
      enqueueSnackbar(error.message + `: fetch ${addr}`, {variant: "error"})
    })
  }, [serverAddr])

  return (
    <></>
  )
}


export default FetchFiles;
