import React from 'react'
import {makeStyles} from '@material-ui/styles'

const Task = ({name,desc}) => {
    const classes = useStyles()
    return (
        <div className={classes.root}>
            <p>{name}</p>
            <p>{desc}</p>
        </div>
    )
}

const useStyles = makeStyles(theme => ({
    root: {

    }
}))

export default Task