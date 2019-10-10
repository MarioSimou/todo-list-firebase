import React from "react";
import ReactQuill from "react-quill";
import makeStyles from "@material-ui/styles/makeStyles";
import Fab from "@material-ui/core/Fab";
import { firestore } from "../utils/configFirebase";

const Editor = ({ id, title, body, setSelectedTask }) => {
  const classes = useStyles();
  const [taskTitle, setTaskTitle] = React.useState(title);
  const [taskBody, setTaskBody] = React.useState(body);
  const onChangeTaskTitle = e => setTaskTitle(e.target.value);
  const onChangeTaskBody = html => setTaskBody(html);
  const onClickSubmit = () =>
    firestore
      .collection("tasks")
      .doc(id)
      .set({ title: taskTitle, body: taskBody })
      .then(() => setSelectedTask({ id: "", title: "", body: "" }))
      .catch(e => window.alert(e));

  React.useEffect(() => {
    setTaskTitle(title);
    setTaskBody(body);
  }, [body, title]);

  return (
    <div className={classes.root}>
      <input
        type="text"
        className={classes.title}
        value={taskTitle}
        onChange={onChangeTaskTitle}
      />
      <ReactQuill value={taskBody} onChange={onChangeTaskBody} placeholder="Add task..." modules={Editor.modules} formats={Editor.formats} />
      {!!taskTitle && !!taskBody && (
        <Fab
          className={classes.submit}
          variant="extended"
          onClick={onClickSubmit}
        >
          Save
        </Fab>
      )}
    </div>
  );
};

const useStyles = makeStyles(theme => ({
  root: {
    height: "100%",
    position: "relative"
  },
  title: {
    fontSize: theme.spacing(2),
    height: theme.spacing(5),
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    lineHeight: `${theme.spacing(5)}px`,
    paddingLeft: theme.spacing(2),
    border: "none",
    width: "100%",
    "&:focus": {
      outline: "none"
    }
  },
  submit: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    position: "absolute",
    bottom: theme.spacing(2),
    right: theme.spacing(2)
  }
}));

Editor.modules = {
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
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false
  }
};
/*
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
Editor.formats = [
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

export default Editor;
