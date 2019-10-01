import React from 'react'
import {Button} from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import {firestore} from '../utils/configFirestore'
import SidebarItem from './SidebarItem'

const Sidebar = ({note, setNote, tasks, setTasks, ...other}) => {
  const [hasNote, setHasNote] = React.useState(false)
  const classes = useStyles()
  const onClickAddNote = () => {setHasNote(!hasNote);setNote({title: '',body: '', id: ''})} 
  const onChangeNoteTitle = e => setNote({ ...note, title: e.target.value })
  const onClickSubmitTitle = () => {
    if(!note.title){
      window.alert('Fill a note name')
      return
    }

    firestore.collection('tasks').add({title: note.title})
    .then(doc => { 
      setNote({ ...note, id:doc.id})
      setTasks({ ...tasks, [doc.id]:{ ...note, id:doc.id}})
      setHasNote(false)
    })
    .catch(e => window.alert(e))
  }

  React.useEffect( () => {
    firestore.collection("tasks").get().then(snapshot => {
      setTasks(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data()})).reduce((acc,task) => ({ ...acc, [task.id]:task}), {}))
    })
  }, [])

  return (
    <div {...other}>
      <Button className={classes.addNote} onClick={onClickAddNote}>NEW NOTE</Button>
      {hasNote && <input type="text" value={note.title} onChange={onChangeNoteTitle} className={classes.noteTitle}/>}
      {hasNote && <Button onClick={onClickSubmitTitle} className={classes.submit} fullWidth>Submit</Button>}
      {Object.values(tasks).map(task => <SidebarItem key={task.id} {...task} setNote={setNote}/>)}
    </div>
  )
}

const useStyles = makeStyles(theme => ({
  root: {

  },
  addNote: {
    width: '100%',
    borderRadius: 0,
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    fontWeight: 500,
    letterSpacing: theme.spacing(0.25),
    '&:hover': {
      backgroundColor: theme.palette.primary.main,  
    },
  },
  noteTitle: {
    width: '100%',
    outline: 'none',
    height: theme.spacing(4.5),
    fontSize: theme.spacing(2),
  },
  submit: {
    fontWeight: 500,
    letterSpacing: theme.spacing(0.25),
    backgroundColor: theme.palette.primary.main,
    width: '100%',
    color: theme.palette.primary.contrastText,
    borderRadius: 0,
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
    }
  },
}))

export default Sidebar