import React from "react";
import ReactQuill from "react-quill";
import { makeStyles } from "@material-ui/styles";
import { connect } from "react-redux";
import { updateTask } from "../actions";
import { firestore } from '../utils/configFirebase'

const Editor = ({ id, title, body }) => {
  const classes = useStyles();

  console.log(body)

  return (
    <div className={classes.root}>
      <input
        type="text"
        className={classes.title}
        value={title}
      />
      <ReactQuill/>
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
  }
}));

const mapStateToProps = state => {
  return state;
};

export default connect(
  mapStateToProps,
  { updateTask }
)(Editor);
