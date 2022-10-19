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
