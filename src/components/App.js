import React from 'react'
import {makeStyles} from '@material-ui/styles'
import Editor from './Editor'
import Sidebar from './Sidebar'
import {firestore} from '../utils/configFirestore'

const App = props => {
  const classes = useStyles()
  const [noteTitle,setNoteTitle] = React.useState('')
  const [noteId,setNoteId] = React.useState('')

  console.log(noteTitle)
  console.log(noteId)
  return (
    <div className={classes.root}>
      <Sidebar className={classes.sidebar} setNoteTitle={setNoteTitle} setNoteId={setNoteId}/>
      {noteTitle && <Editor className={classes.editor} noteTitle={noteTitle} setNoteTitle={setNoteTitle}/>}
    </div>
  )
}

const useStyles = makeStyles(theme => ({
  root: {
    display: 'grid',
    gridAutoFlow: 'column',
    gridAutoColumns: '300px 1fr',
    height: '100vh',
  },
  sidebar: {
    overflowY: 'scroll',
  },
  editor: {
    width: '100%',
    height: '100%',
  }
}))

export default App