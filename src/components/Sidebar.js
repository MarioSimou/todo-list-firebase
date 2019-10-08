import React from "react";
import Task from './Task'
import { Button, Fade, FormControl } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { connect } from 'react-redux'
import { firestore } from '../utils/configFirebase'
import { addTask } from '../actions'

const Sidebar = props => {
  const classes = useStyles();
  const [showTask, setShowTask] = React.useState(false);
  const [taskName, setTaskName] = React.useState("");
  const onClickShowTask = () => setShowTask(!showTask);
  const onChangeTaskName = e => setTaskName(e.target.value);
  const onSubmitTask = () => {
    if(!taskName) {
      window.alert('Please submit a task name')
      return
    }

    firestore.collection("tasks").add({name: taskName})
    .then( doc => doc.get())
    .then( snapshot => props.addTask({id: snapshot.id, ...snapshot.data()}))
    .then(setShowTask(false))
    .catch(e => window.alert(JSON.stringify(e)))
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
        <Fade in={showTask}>
          <div className={classes.taskNameWrapper}>
            <input type="text" value={taskName} onChange={onChangeTaskName} placeholder="Your task" className={classes.taskNameInput} />
            <Button
              className={classes.btn}
              variant="contained"
              color="primary"
              onClick={onSubmitTask}
            >
              Submit
            </Button>
          </div>
        </Fade>
      </FormControl>
      <div>
        {props.tasks.map(task => <Task key={task.id} task={task}/>)}
      </div>
    </div>
  );
};

const useStyles = makeStyles(theme => ({
  root: {},
  btn: {
    borderRadius: "0",
    height: "42px",
    width: "100%"
  },
  taskNameInput: {
    width: "100%",
    borderRadius: 0,
    margin: 0,
    border: 0,
    padding: '8px 14px',
    height: "42px"
  }
}));

const mapStateToProps = state => {
  return { tasks: Object.values(state.tasksReducer) }
} 

export default connect(mapStateToProps, { addTask })(Sidebar);
