import React from 'react'
import {
    Grid
} from '@material-ui/core'
import Editor from './Editor'
import Sidebar from './Sidebar'
import {makeStyles} from '@material-ui/styles'
import '../assets/css/main.css'

const App = () => {
    const classes = useStyles()
    
    return (
        <div className={classes.root}>
            <Grid container className={classes.gridContainer}>
                <Grid item xs={3} className={classes.sidebar}>
                    <Sidebar/>
                </Grid>
                <Grid item xs={9} className={classes.editor}>
                    <Editor/>
                </Grid>
            </Grid>
        </div>
    )
}

const useStyles = makeStyles(theme =>({
    root: {
        height: '100vh',
    },
    gridContainer: {
        height: '100%',
    },
    sidebar: {

    },
    editor: {

    },
}))

export default App