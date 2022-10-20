import Snackbar from '@mui/material/Snackbar';
import Alert from './Alert';

import { getAlertCloseHandler } from '../utils';

interface ErrorBarProps {
  alertOpen: boolean,
  setAlertOpen: (o: boolean) => void,
  text: string,
  alertHidenDuration: number,
  type?: "error" | "success" | "info",
}


export default function MessageBar(props: ErrorBarProps) {
  const { alertOpen, setAlertOpen, alertHidenDuration, text } = props
  const handleAlertClose = getAlertCloseHandler(setAlertOpen)

  return (
    <Snackbar open={alertOpen} autoHideDuration={alertHidenDuration} onClose={handleAlertClose}>
      <Alert onClose={handleAlertClose} severity={props.type || "error"} sx={{ width: '100%' }}>
        {text}
      </Alert>
    </Snackbar>
  )
}

