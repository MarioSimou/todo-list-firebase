import React, { Suspense } from "react";
import Button from "@material-ui/core/Button";
import Collapse from "@material-ui/core/Collapse";
import FormControl from "@material-ui/core/FormControl";
import Loader from "./Loader";
import makeStyles from "@material-ui/styles/makeStyles";
import { connect } from "react-redux";
import { firestore } from "../utils/configFirebase";
const Task = React.lazy(() => import("./Task"));

const Sidebar = props => {
  const classes = useStyles();
  const [showTask, setShowTask] = React.useState(false);
  const [taskTitle, setTaskTitle] = React.useState("");
  const onClickShowTask = () => setShowTask(!showTask);
  const onChangeTaskName = e => setTaskTitle(e.target.value);
  const onDoubleClick = e => {
    const id = e.currentTarget.dataset.id;
    props.setSelectedTask(props.tasks.find(task => task.id === id));
  };

  const onSubmitTask = () => {
    if (!taskTitle) {
      window.alert("Please submit a task name");
      return;
    }

    firestore
      .collection("tasks")
      .add({ title: taskTitle, body: "" })
      .then(doc => doc.get())
      .then(snapshot =>
        props.setSelectedTask({ id: snapshot.id, ...snapshot.data() })
      )
      .then(setShowTask(false))
      .then(setTaskTitle(""))
      .catch(e => window.alert(JSON.stringify(e)));
  };

  return (
    <div className={classes.root}>
      <FormControl fullWidth>
        <Button
          variant="contained"
          color="primary"
          className={classes.btn}
          onClick={onClickShowTask}
          fullWidth
        >
          ADD TASK
        </Button>
        <Collapse in={showTask}>
          <div>
            <input
              type="text"
              value={taskTitle}
              onChange={onChangeTaskName}
              placeholder="Your task"
              className={classes.titleInput}
            />
            <Button
              className={classes.btn}
              variant="contained"
              color="primary"
              onClick={onSubmitTask}
            >
              Submit
            </Button>
          </div>
        </Collapse>
      </FormControl>
      <div>
        {props.tasks.map(task => (
          <Suspense key={task.id} fallback={<Loader />}>
            <Task
              {...task}
              selected={task.id === props.selectedTaskId}
              onDoubleClick={onDoubleClick}
            />
          </Suspense>
        ))}
      </div>
    </div>
  );
};

const useStyles = makeStyles(theme => ({
  root: {
    overflowY: "scroll",
    height: "100%"
  },
  btn: {
    borderRadius: "0",
    height: theme.spacing(5),
    width: "100%"
  },
  titleInput: {
    width: "100%",
    borderRadius: 0,
    margin: 0,
    border: 0,
    padding: "8px 14px",
    height: "42px"
  }
}));

const mapStateToProps = state => {
  return { tasks: Object.values(state.tasksReducer) };
};

export default connect(mapStateToProps)(Sidebar);
