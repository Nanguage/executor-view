import React from 'react';
import axios from 'axios';
import {
    FileContextMenu,
    FileList,
    FileNavbar,
    FileToolbar,
    FileArray,
    FileData,
    FileActionHandler,
    ChonkyActions,
} from 'chonky';
import { FileBrowser as ChonkyFileBrowser } from 'chonky';
import Snackbar from '@mui/material/Snackbar';
import Alert from '../components/Alert';

import useStore from '../store';
import { downloadFile, folderChainToStr, getAlertCloseHandler } from '../utils';


interface FetchFilesProps {
  setFiles: (files: FileArray) => void;
}


const FetchFiles = (props: FetchFilesProps) => {
  const { setFiles } = props
  const [alertOpen, setAlertOpen] = React.useState<boolean>(false)
  const [errorText, setErrorText] = React.useState<string>("")
  const alertHidenDuration = 6000
  const { currentPath } = useStore((state) => state)
  const serverAddr = useStore((state) => state.serverAddr)
  const handleAlertClose = getAlertCloseHandler(setAlertOpen)

  React.useEffect(() => {
    const addr = `${serverAddr}/file/list_dir/`
    const path = folderChainToStr(currentPath.slice(1, currentPath.length))
    setFiles([])
    axios.post(addr, {path: path}).then((resp) => {
      const sfiles = resp.data.map((f: FileData) => {
        const randID = Math.random().toString().slice(2, 12)
        f['id'] = randID
        return f
      })
      setFiles(sfiles)
    }).catch((error) => {
      console.log(error)
      setErrorText(error.message + `: fetch ${addr}`)
      setAlertOpen(true)
    })
  }, [serverAddr, currentPath])

  return (
    <>
      <Snackbar open={alertOpen} autoHideDuration={alertHidenDuration} onClose={handleAlertClose}>
        <Alert onClose={handleAlertClose} severity="error" sx={{ width: '100%' }}>
          {errorText}
        </Alert>
      </Snackbar>
    </>
  )
}


export default function FileBrowser(props: {}) {
  const [files, setFiles] = React.useState<FileArray>([])
  const { currentPath, setCurrentPath, serverAddr } = useStore((state) => state)

  const handleAction = React.useCallback<FileActionHandler>((data) => {
    if (data.id === "open_files") {
      const target_file = data.payload.files[0]
      if (target_file.isDir) {
        const folder = {id: 'folder-' + target_file.id, name: target_file.name}
        const newPath = currentPath.concat(folder)
        setCurrentPath(newPath)
      } else if (target_file.id.startsWith('folder-')) {
        let n = 0
        for (let f of currentPath) {
          n += 1
          if (f.id === target_file.id) {
            const newPath = currentPath.slice(0, n)
            setCurrentPath(newPath)
          }
        }
      }
    } else if (data.id === "download_files") {
      const addr = `${serverAddr}/file/download`
      const target_file = data.state.selectedFiles[0]
      if (!target_file.isDir) {
        const dirPath = folderChainToStr(currentPath.slice(1, currentPath.length))
        let path: string
        if (dirPath.length == 0) {
          path = target_file.name
        } else {
          path = dirPath + "/" + target_file.name
        }
        axios.post(addr, {path: path}, {responseType: "blob"}).then((resp) => {
          downloadFile(target_file.name, resp.data)
        })
      }
    }
  }, [currentPath])

  const actions = [
    ChonkyActions.UploadFiles,
    ChonkyActions.DownloadFiles,
  ]

  return (
    <>
      <ChonkyFileBrowser
        files={files}
        folderChain={currentPath}
        onFileAction={handleAction}
        fileActions={actions}
        >
        <FileNavbar />
        <FileToolbar />
        <FileList />
        <FileContextMenu />
      </ChonkyFileBrowser>
      <FetchFiles setFiles={setFiles}/>
    </>
  )
}
