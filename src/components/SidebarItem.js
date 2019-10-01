import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { Typography,Icon} from '@material-ui/core'
import CrossIcon from '@material-ui/icons/Clear'
import {firestore} from '../utils/configFirestore'

const CloseIcon = ({id, ...other}) => {
    const onClickClose = () => firestore.collection('tasks').doc(id).delete()
    return(<Icon {...other}><CrossIcon onClick={onClickClose}/></Icon>)
}

const SidebarItem = ({id,title,body, setNote}) => {
    const classes = useStyles()
    console.log(id , '====' , title)
    const onClickSidebar = props => () => setNote(props)

    return (
        <div className={classes.root} onClick={onClickSidebar({id,title,body})}>
            <Typography component="h6" className={classes.title}>{title}</Typography>
            <Typography component="p" className={classes.body}>{(body||"").substring(0,30)}{body ? '...' : ''}</Typography>
            <CloseIcon className={classes.cross} id={id}/>
        </div>
    )
}

const useStyles = makeStyles(theme =>({
    root: {
        border: `1.5px solid ${theme.palette.secondary.light}`,
        padding: theme.spacing(1),
        display: 'grid',
        gridAutoFlow: 'row',
        gridRowGap: theme.spacing(1),
        position: 'relative',
        '&:hover': {
            border: `1.5px solid ${theme.palette.primary.light}`,
            cursor: 'pointer',
        }
    },
    title: {
        color: theme.palette.primary.main,
        textTransform: 'capitalize',
        letterSpacing: theme.spacing(0.20),
        height: theme.spacing(3),
    },
    body: {
        fontSize: theme.spacing(1.75),
        height: theme.spacing(4),
        color: theme.palette.secondary.main
    },
    cross: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.secondary.main,
        '&:hover': {
            cursor: 'pointer',
        },
    }
}))

export default SidebarItem