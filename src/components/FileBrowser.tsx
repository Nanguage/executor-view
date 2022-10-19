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
} from 'chonky';
import { FileBrowser as ChonkyFileBrowser } from 'chonky';

import useStore from '../store';
import { folderChainToStr } from '../utils';


export default function FileBrowser(props: {}) {
  const [files, setFiles] = React.useState<FileArray>([])
  const { currentPath, setCurrentPath } = useStore((state) => state)

  const serverAddr = useStore((state) => state.serverAddr)
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
    })
  }, [serverAddr, currentPath])

  const handleAction = React.useCallback<FileActionHandler>((data) => {
    //console.log("file action data:", data)
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
    }
  }, [currentPath])

  return (
    <>
      <ChonkyFileBrowser
        files={files}
        folderChain={currentPath}
        onFileAction={handleAction}
        >
        <FileNavbar />
        <FileToolbar />
        <FileList />
        <FileContextMenu />
      </ChonkyFileBrowser>
    </>
  )
}
