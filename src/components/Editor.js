import React from 'react'
import ReactQuill from 'react-quill'
import {makeStyles} from '@material-ui/styles'

const Editor = () => {
    const [text,setText] = React.useState('')
    const classes = useStyles()
    const onChangeText = html => setText(html)

    return (
        <div className={classes.root}>
            <ReactQuill value={text} onChange={onChangeText} />
        </div>
    )
}

const useStyles = makeStyles(theme => ({
    root: {
        height: '100%',
    }
}))

export default Editor