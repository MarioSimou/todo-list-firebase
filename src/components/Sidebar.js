import React from 'react'
import {Button} from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import {firestore} from '../utils/configFirestore'

const Sidebar = ({setNoteTitle, setNoteId, ...other}) => {
  const classes = useStyles()
  const [hasNote,setHasNote] = React.useState(false)
  const [title,setTitle] = React.useState('') 
  const onClickNewNote = () => setHasNote(!hasNote) 
  const onChangeTitle = e => setTitle(e.target.value)
  const onClickSubmitTitle = () => {
    if(!title){
      window.alert('Fill a note name')
      return
    }

    firestore.collection('tasks').add({title, body: ''})
    .then(doc => { 
      console.log(doc)
      setNoteTitle(title)
      setHasNote(!hasNote)
      setNoteId(doc.id)
    })
    .catch(e => window.alert(e))
  }

  return (
    <div {...other}>
      <Button className={classes.addNote} onClick={onClickNewNote}>NEW NOTE</Button>
      { hasNote && 
        <>
         <input type="text" value={title} onChange={onChangeTitle} className={classes.noteTitle} fullWidth/>
         <Button onClick={onClickSubmitTitle} className={classes.submit} fullWidth>Submit</Button>
        </>
      }
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