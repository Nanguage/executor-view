export function getAlertCloseHandler (setAlertOpen: (o: boolean) => void) {

  const handleAlertClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setAlertOpen(false);
  };

  return handleAlertClose

}
