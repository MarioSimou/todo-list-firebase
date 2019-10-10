import React from "react";
import Grid from "@material-ui/core/Grid";
import Editor from "./Editor";
import Sidebar from "./Sidebar";
import makeStyles from "@material-ui/styles/makeStyles";
import { firestore } from "../utils/configFirebase";
import { addTask, updateTask, removeTask } from "../actions";
import { connect } from "react-redux";
import { handleOnSnapshotEvent, doTaskMapping } from "../utils";
import "../assets/css/main.css";

const initState = {
  id: "",
  title: "",
  body: ""
};

const App = ({ addTask, updateTask, removeTask, tasks }) => {
  const classes = useStyles();
  const [selectedTask, setSelectedTask] = React.useState(initState);
  const reducers = { addTask, updateTask, removeTask };

  firestore
    .collection("tasks")
    .onSnapshot(handleOnSnapshotEvent(tasks, reducers, doTaskMapping));

  return (
    <div className={classes.root}>
      <Grid container className={classes.gridContainer}>
        <Grid item xs={12} md={3} className={classes.sidebar}>
          <Sidebar
            selectedTaskId={selectedTask.id}
            setSelectedTask={setSelectedTask}
          />
        </Grid>
        <Grid item xs={12}umd={9} className={classes.editor}>
          <Editor {...selectedTask} setSelectedTask={setSelectedTask} />
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
  { addTask, updateTask, removeTask }
)(App);
