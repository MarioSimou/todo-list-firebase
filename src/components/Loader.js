import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'

const Loader = ({...other}) => {
  return (
    <CircularProgress color="primary" size={64} {...other}/>
  )
}

export default Loader