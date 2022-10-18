import {
    FileBrowser,
    FileContextMenu,
    FileList,
    FileNavbar,
    FileToolbar,
    FileArray,
} from 'chonky';


const CustomFileBrowser = () => {
  const files: FileArray = [];
  return (
    <FileBrowser files={files}>
      <FileNavbar />
      <FileToolbar />
      <FileList />
      <FileContextMenu />
    </FileBrowser>
  )
}


export default function FilesPanel(props: {}) {
  return (
    <>
      <CustomFileBrowser/>
    </>
  )
}