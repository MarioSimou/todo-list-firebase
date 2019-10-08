import { combineReducers} from 'redux'
import * as t from '../actions/types'

const tasksReducer = (state = [] ,action) => {
    switch(action.type){
        case t.ADD_TASK:
            return [ ...state, action.payload ]
        case t.REMOVE_TASK:
            return state.filter(task => task.id !== action.payload )
        default:
            return state
    }
}

export default combineReducers({ tasksReducer })