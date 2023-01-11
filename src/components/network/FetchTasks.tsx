import React from 'react';
import { useSnackbar } from 'notistack';

import useStore from '../../store';
import { getAxiosInstance } from '../../utils';


const FetchTasks = () => {
  const {
    serverAddr, refreshServer, nRefreshTasks, setTasks,
  } = useStore((state) => state)

  const { enqueueSnackbar } = useSnackbar()

  React.useEffect(() => {
    fetchTasks()
  }, [nRefreshTasks])

  const fetchTasks = React.useCallback(() => {
    const addr = "/task/list_all"
    const instance = getAxiosInstance(serverAddr)
    instance.get(addr).then((resp) => {
      setTasks(resp.data)
    })
    .catch((error) => {
      console.log(error)
      enqueueSnackbar(error.message + `: fetch ${addr}`, {variant: "error"})
      refreshServer()
    })
  }, [serverAddr])

  return (
    <></>
  )
}


export default FetchTasks
