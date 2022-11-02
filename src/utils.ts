import React from 'react';
import { FolderChain } from "./types";

export const getAlertCloseHandler = (setAlertOpen: (o: boolean) => void) => {

  const handleAlertClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setAlertOpen(false);
  };

  return handleAlertClose

}

export const folderChainToStr = (fc: FolderChain) => {
  const path = fc.map((f) => (f).name).join("/")
  return path
}

export const downloadFile = (fileName:string, fileContent: Blob) => {
  const url = window.URL.createObjectURL(
    new Blob([fileContent])
  )
  const link = document.createElement('a')
  link.href = url
  link.setAttribute('download', fileName)
  document.body.appendChild(link)
  link.click()
  link.parentNode?.removeChild(link)
}


export const selectLocalFile = () => {
  // see https://stackoverflow.com/a/73552508/8500469
  let lock = false
  return new Promise<FileList>((resolve, reject) => {
    const el = document.createElement('input');
    el.id = (new Date()).toString();
    el.style.display = 'none';
    el.setAttribute('type', 'file');
    el.setAttribute('multiple', "")
    document.body.appendChild(el)

    el.addEventListener('change', () => {
      lock = true;
      resolve(el.files as FileList)
      document.body.removeChild(el);
    }, { once: true })

    window.addEventListener('focus', () => { // file blur
      setTimeout(() => {
        if (!lock && document.getElementById(el.id)) {
          reject(new Error('onblur'))
          document.body.removeChild(el)
        }
      }, 300)
    }, { once: true })
    el.click() // open file select box
  })
}
