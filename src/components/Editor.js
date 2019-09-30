import React from "react";
import ReactQuill from "react-quill";
import { makeStyles } from "@material-ui/styles";
import Icon from '@material-ui/core/Icon'
import BorderColorOutlinedIcon from '@material-ui/icons/BorderColorOutlined';
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

const Editor = ({ noteTitle, setNoteTitle, ...other }) => {
  const [html, setHtml] = React.useState("");
  const onChangeHtml = html => setHtml(html);
  const onChangeNote = e => setNoteTitle(e.target.value)
  const classes = useStyles()

  return (
    <div {...other}>
      <div className={classes.header}>
        <Icon className={classes.iconWrapper}><BorderColorOutlinedIcon className={classes.icon}/></Icon>
        <input type="text" value={noteTitle} className={classes.noteTitle} onChange={onChangeNote} />
      </div>
      <ReactQuill
      value={html}
      onChange={onChangeHtml}
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
