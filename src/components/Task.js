import React from 'react'
import {makeStyles} from '@material-ui/styles'
import {
    Typography
} from '@material-ui/core'
import classnames from 'classnames'

const Task = ({id,title,body, selected, ...other}) => {
    const classes = useStyles()
    return (
        <div className={classnames(classes.root, selected && classes.selected)} data-id={id} {...other}>
            <Typography variant="h6" className={classes.title} component="h6">{title}</Typography>
            <Typography component="div" className={classes.body}>{body}</Typography>
        </div>
    )
}

const useStyles = makeStyles(theme => ({
    root: {
        display: 'block',
        padding: theme.spacing(2),
        border: `1.5px solid ${theme.palette.secondary.main}`,
        backgroundColor: theme.palette.secondary.light,
        '&:hover': {
            cursor: 'pointer',
            opacity: 0.7,
        }
    },
    title: {
        color: theme.palette.primary.main,
    },
    body: {

    },
    selected: {
        border: `2px solid ${theme.palette.primary.main}`
    }
}))

export default Task