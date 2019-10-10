import React from "react";
import makeStyles from "@material-ui/styles/makeStyles";
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import Grid from '@material-ui/core/Grid'
import classnames from "classnames";
import DeleteIcon from "@material-ui/icons/Delete";
import { firestore } from "../utils/configFirebase";
import {htmlToString} from '../utils'

const Task = ({ id, title, body, selected, ...other }) => {
  const classes = useStyles();
  const onClickDelete = () =>
    firestore
      .collection("tasks")
      .doc(id)
      .delete();

  return (
    <div
      className={classnames(classes.root, selected && classes.selected)}
      data-id={id}
      {...other}
    >
      <Grid container alignContent="center" justify="flex-start">
        <Grid item xs={10}>
          <Typography variant="h6" className={classes.title} component="h6">
            {title}
          </Typography>
          <Typography component="div" className={classes.body}>
            {htmlToString(body).slice(0, 50)}
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <IconButton className={classes.iconBtn} onClick={onClickDelete}>
            <DeleteIcon />
          </IconButton>
        </Grid>
      </Grid>
    </div>
  );
};

const useStyles = makeStyles(theme => ({
  root: {
    display: "block",
    position: "relative",
    padding: theme.spacing(2),
    backgroundColor: theme.palette.secondary.main,
    borderBottom: `1px solid ${theme.palette.secondary.light}`,
    "&:hover": {
      cursor: "pointer",
      opacity: 0.7
    }
  },
  title: {
    color: theme.palette.primary.main,
    textTransform: "capitalize"
  },
  body: {
    fontSize: theme.spacing(1.5)
  },
  selected: {
    border: `1px solid ${theme.palette.primary.main}`
  },
  iconBtn: {
    color: theme.palette.error.main
  }
}));

export default Task;
