import React from 'react';
import {
    FileContextMenu,
    FileList,
    FileNavbar,
    FileToolbar,
    FileActionHandler,
    ChonkyActions,
} from 'chonky';
import { FileBrowser as ChonkyFileBrowser } from 'chonky';
import { useSnackbar } from 'notistack';

import useStore from '../../store';
import { downloadFile, folderChainToStr, selectLocalFile } from '../../utils';
import { FolderChain } from '../../types';
import FetchFiles from '../network/FetchFiles';
import { getAxiosInstance } from '../../utils';


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
  const {
    currentPath, setCurrentPath, serverAddr,
    files, setFiles,
  } = useStore((state) => state)

  const { enqueueSnackbar } = useSnackbar();

  const handleAction = React.useCallback<FileActionHandler>((data) => {
    console.log(data)
    const instance = getAxiosInstance(serverAddr)

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
      const addr = '/file/download'
      const target_file = data.state.selectedFiles[0]
      if (!target_file.isDir) {
        const path = getFilePath(currentPath, target_file.name)
        instance.post(addr, {path: path}, {responseType: "blob"}).then((resp) => {
          downloadFile(target_file.name, resp.data)
        }).catch((error) => {
          console.log(error)
          enqueueSnackbar(`${error.message}: fetch ${addr}`, { variant: "error" })
        })
      }
    } else if (data.id === "upload_files") {
      selectLocalFile().then((files) => {
        const dirPath = folderChainToStr(currentPath.slice(1, currentPath.length))
        const formData = new FormData()
        for (const file of files) {
          formData.append("files", file)
        }
        const addr = `/file/upload?path=${dirPath}`
        const config = {
          headers: {
            'accept': "application/json",
            'content-Type': "multipart/form-data",
          }
        }
        instance.post(addr, formData, config).then((resp) => {
          setNRefresh(nRefresh + 1)
        }).catch((error) => {
          console.log(error)
          enqueueSnackbar(`${error.message}: fetch ${addr}`, { variant: "error" })
        })
      }).catch((_) => {
        console.log("Cancel upload")
      })
    } else if (data.id === "delete_files") {
      const addr = '/file/delete'
      const paths: string[] = []
      for (const f of data.state.selectedFiles) {
        const path = getFilePath(currentPath, f.name)
        paths.push(path)
      }
      instance.post(addr, {paths: paths}).then((resp) => {
        setNRefresh(nRefresh + 1)
      }).catch((error) => {
        console.log(error)
        enqueueSnackbar(`${error.message}: fetch ${addr}`, { variant: "error" })
      })
    } else if(data.id === "move_files") {
      const addr = '/file/move'
      const paths: string[] = []
      for (const f of data.state.selectedFiles) {
        const path = getFilePath(currentPath, f.name)
        paths.push(path)
      }
      instance.post(addr, {
        paths: paths,
        destination: getFilePath(currentPath, data.payload.destination.name)
      }).then((resp) => {
        setNRefresh(nRefresh + 1)
      }).catch((error) => {
        console.log(error)
        enqueueSnackbar(`${error.message}: fetch ${addr}`, { variant: "error" })
      })
    }
  }, [currentPath, serverAddr])

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
    </>
  )
}
