import React from "react";
import { Grid } from "@material-ui/core";
import Editor from "./Editor";
import Sidebar from "./Sidebar";
import { makeStyles } from "@material-ui/styles";
import "../assets/css/main.css";
import { firestore } from "../utils/configFirebase";
import { loadTasks } from "../actions";
import { connect } from "react-redux";
import {
    handleOnSnapshotEvent,
    doTaskMapping
} from '../utils'

const App = ({ loadTasks, tasks }) => {
  const classes = useStyles();
  const [selectedTask, setSelectedTask] = React.useState({});

  firestore.collection("tasks").onSnapshot(handleOnSnapshotEvent(tasks, loadTasks, doTaskMapping));

  return (
    <div className={classes.root}>
      <Grid container className={classes.gridContainer}>
        <Grid item xs={3} className={classes.sidebar}>
          <Sidebar
            selectedTaskId={selectedTask.id}
            setSelectedTask={setSelectedTask}
          />
        </Grid>
        <Grid item xs={9} className={classes.editor}>
          <Editor {...selectedTask} />
        </Grid>
      </Grid>
    </div>
  );
};

const useStyles = makeStyles(theme => ({
  root: {
    height: "100vh"
  },
  gridContainer: {
    height: "100%"
  },
  sidebar: {},
  editor: {}
}));

const mapStateToProps = state => {
  return { tasks: Object.values(state.tasksReducer) };
};

export default connect(
  mapStateToProps,
  { loadTasks }
)(App);
