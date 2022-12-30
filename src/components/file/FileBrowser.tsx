import React from 'react';
import axios from 'axios';
import {
    FileContextMenu,
    FileList,
    FileNavbar,
    FileToolbar,
    FileArray,
    FileActionHandler,
    ChonkyActions,
} from 'chonky';
import { FileBrowser as ChonkyFileBrowser } from 'chonky';

import useStore from '../../store';
import { downloadFile, folderChainToStr, selectLocalFile } from '../../utils';
import { FolderChain } from '../../types';
import MessageBar from '../common/MessageBar';
import FetchFiles from '../network/FetchFiles';



const getFilePath = (currentPath: FolderChain, fname: string) => {
  const dirPath = folderChainToStr(currentPath.slice(1, currentPath.length))
  let path: string
  if (dirPath.length == 0) {
    path = fname
  } else {
    path = dirPath + "/" + fname
  }
  return path
}


export default function FileBrowser(props: {}) {
  const [nRefresh, setNRefresh] = React.useState(0)
  const [files, setFiles] = React.useState<FileArray>([])
  const { currentPath, setCurrentPath, serverAddr } = useStore((state) => state)
  const [alertOpen, setAlertOpen] = React.useState<boolean>(false)
  const [errorText, setErrorText] = React.useState<string>("")

  const handleAction = React.useCallback<FileActionHandler>((data) => {
    console.log(data)
    if (data.id === "open_files") {
      const target_file = data.payload.files[0]
      if (target_file.isDir) {
        if (target_file.id === "parent") {
          setCurrentPath(currentPath.slice(0, currentPath.length-1))
        } else {
          const folder = {id: 'folder-' + target_file.id, name: target_file.name}
          const newPath = currentPath.concat(folder)
          setCurrentPath(newPath)
        }
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
        }).catch((error) => {
          console.log(error)
          setErrorText(`${error.message}: fetch ${addr}`)
          setAlertOpen(true)
        })
      }
    } else if (data.id === "upload_files") {
      selectLocalFile().then((files) => {
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
          setNRefresh(nRefresh + 1)
        }).catch((error) => {
          console.log(error)
          setErrorText(`${error.message}: fetch ${addr}`)
          setAlertOpen(true)
        })
      }).catch((_) => {
        console.log("Cancel upload")
      })
    } else if (data.id === "delete_files") {
      const addr = `${serverAddr}/file/delete`
      const paths: string[] = []
      for (const f of data.state.selectedFiles) {
        const path = getFilePath(currentPath, f.name)
        paths.push(path)
      }
      axios.post(addr, {paths: paths}).then((resp) => {
        setNRefresh(nRefresh + 1)
      }).catch((error) => {
        console.log(error)
        setErrorText(`${error.message}: fetch ${addr}`)
        setAlertOpen(true)
      })
    } else if(data.id === "move_files") {
      const addr = `${serverAddr}/file/move`
      const paths: string[] = []
      for (const f of data.state.selectedFiles) {
        const path = getFilePath(currentPath, f.name)
        paths.push(path)
      }
      axios.post(addr, {
        paths: paths,
        destination: getFilePath(currentPath, data.payload.destination.name)
      }).then((resp) => {
        setNRefresh(nRefresh + 1)
      }).catch((error) => {
        console.log(error)
        setErrorText(`${error.message}: fetch ${addr}`)
        setAlertOpen(true)
      })
    }
  }, [currentPath])

  const actions = [
    ChonkyActions.UploadFiles,
    ChonkyActions.DownloadFiles,
    ChonkyActions.DeleteFiles,
    ChonkyActions.MoveFiles,
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
      <MessageBar
        alertOpen={alertOpen}
        setAlertOpen={setAlertOpen}
        alertHidenDuration={6000}
        text={errorText}
      />
    </>
  )
}
