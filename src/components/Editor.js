import React from "react";
import ReactQuill from "react-quill";
import { makeStyles } from "@material-ui/styles";
import Icon from '@material-ui/core/Icon'
import BorderColorOutlinedIcon from '@material-ui/icons/BorderColorOutlined';
import { firestore } from '../utils/configFirestore'
import "react-quill/dist/quill.snow.css";

const modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" }
    ],
    ["link", "image", "video"],
    ["clean"]
  ],
  clipboard: {
    matchVisual: false
  }
};

const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video"
];

const Editor = ({ note, setNote, tasks, setTasks, ...other }) => {
  const onChangeNoteBody = body => setNote({ ...note, body})
  const onChangeNoteTitle = e => setNote({ ...note, title:e.target.value })
  const onBlurEditor = () => {
    firestore.collection('tasks').doc(note.id).set(note)
    setTasks({ ...tasks, [note.id]:note})
  }
  const classes = useStyles()

  return (
    <div {...other} onBlur={onBlurEditor}>
      <div className={classes.header}>
        <Icon className={classes.iconWrapper}><BorderColorOutlinedIcon className={classes.icon}/></Icon>
        <input type="text" value={note.title} className={classes.noteTitle} onChange={onChangeNoteTitle} />
      </div>
      <ReactQuill
      value={note.body}
      onChange={onChangeNoteBody}
      modules={modules}
      formats={formats}
      placeholder={"Add your task"}/>
  </div>
    );
};

const useStyles = makeStyles(theme => ({
  header: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    display: 'flex',
    padding: `${theme.spacing(0.5)}px ${theme.spacing(0.5)}px`,
  },
  iconWrapper: {
    margin: `auto 0`,
  },
  icon: {
    fontSize: theme.spacing(2.5),
  },
  noteTitle: {
    outline: 'none',
    backgroundColor: 'transparent',
    border: 'none',
    color: theme.palette.primary.contrastText,
    fontSize: theme.spacing(2.5),
    fontWeight: 500,
    // marginLeft: theme.spacing.unit * 1,
  }
}))

export default Editor;
