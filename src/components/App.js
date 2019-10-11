import React, { Suspense } from "react";
import Grid from "@material-ui/core/Grid";
import makeStyles from "@material-ui/styles/makeStyles";
import Loader from './Loader'
import { firestore } from "../utils/configFirebase";
import { addTask, updateTask, removeTask } from "../actions";
import { connect } from "react-redux";
import { handleOnSnapshotEvent, doTaskMapping } from "../utils";
import "../assets/css/main.css";

const Editor = React.lazy(() => import('./Editor'))
const Sidebar = React.lazy(() => import('./Sidebar'))

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
          <Suspense fallback={<Loader/>}>
            <Sidebar
              selectedTaskId={selectedTask.id}
              setSelectedTask={setSelectedTask}
            />
          </Suspense>
          
        </Grid>
        <Grid item xs={12} md={9} className={classes.editor}>
          <Suspense fallback={<Loader/>}>
            <Editor {...selectedTask} setSelectedTask={setSelectedTask} />          
          </Suspense>
        </Grid>
      </Grid>
    </div>
  );
};

const useStyles = makeStyles(theme => ({
  root: {
    height: "100vh",
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  gridContainer: {
    height: "100%"
  }
}));

const mapStateToProps = state => {
  return { tasks: Object.values(state.tasksReducer) };
};

export default connect(
  mapStateToProps,
  { addTask, updateTask, removeTask }
)(App);
