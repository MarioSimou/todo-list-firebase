import { combineReducers} from 'redux'
import * as t from '../actions/types'

const tasksReducer = (state = {} ,action) => {
    switch(action.type){
        case t.ADD_TASK:
            return { ...state, [action.payload.id]:action.payload}
        case t.REMOVE_TASK:
            delete state[action.payload]
            return { ...state }
        case t.UPDATE_TASK:
            return { ...state, [action.payload.id]:action.payload}
        case t.LOAD_TASKS:
            return { ...state, ...action.payload.reduce((acc, task) => ({ ...acc, [task.id]:task }), {})}
        default:
            return state
    }
}

export default combineReducers({ tasksReducer })