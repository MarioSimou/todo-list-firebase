import React from 'react'
import {makeStyles} from '@material-ui/styles'
import Editor from './Editor'
import Sidebar from './Sidebar'
import {firestore} from '../utils/configFirestore'

const App = props => {
  const classes = useStyles()
  const [note, setNote] = React.useState({title: '',body: '', id: ''})
  const [tasks,setTasks] = React.useState({})

  return (
    <div className={classes.root}>
      <Sidebar className={classes.sidebar} note={note} setNote={setNote} tasks={tasks} setTasks={setTasks}/>
      {Boolean(note.id) && <Editor note={note} setNote={setNote} className={classes.editor} tasks={tasks} setTasks={setTasks}/>}
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