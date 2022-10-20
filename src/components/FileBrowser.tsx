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
import { downloadFile, folderChainToStr, getAlertCloseHandler, selectLocalFile } from '../utils';
import { FolderChain } from '../types';


interface FetchFilesProps {
  nRefresh: number;
  setFiles: (files: FileArray) => void;
}


const FetchFiles = (props: FetchFilesProps) => {
  const { nRefresh, setFiles } = props
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
  }, [serverAddr, currentPath, nRefresh])

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


const getFilePath = (currentPath: FolderChain, fname: string) => {
  const dirPath = folderChainToStr(currentPath.slice(1, currentPath.length))
  let path: string
  if (dirPath.length == 0) {
    path = fname
  } else {
    path = dirPath + "/" + fname
  }
}


export default function FileBrowser(props: {}) {
  const [nRefresh, setNRefresh] = React.useState(0)
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
        const path = getFilePath(currentPath, target_file.name)
        axios.post(addr, {path: path}, {responseType: "blob"}).then((resp) => {
          downloadFile(target_file.name, resp.data)
        })
      }
    } else if (data.id === "upload_files") {
      selectLocalFile().then((files) => {
        console.log(files)
        const dirPath = folderChainToStr(currentPath.slice(1, currentPath.length))
        const formData = new FormData()
        for (const file of files) {
          formData.append("files", file)
        }
        const addr = `${serverAddr}/file/upload?path=${dirPath}`
        const config = {
          headers: {
            'accept': "application/json",
            'content-Type': "multipart/form-data",
          }
        }
        axios.post(addr, formData, config).then((resp) => {
          console.log(resp)
          setNRefresh(nRefresh + 1)
        })
      }).catch((_) => {
        console.log("Cancel upload")
      })
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
      <FetchFiles nRefresh={nRefresh} setFiles={setFiles}/>
    </>
  )
}
