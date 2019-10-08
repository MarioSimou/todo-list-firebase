import { combineReducers} from 'redux'
import * as t from '../actions/types'

const tasksReducer = (state = {} ,action) => {
    switch(action.type){
        case t.ADD_TASK:
            return { ...state, [action.payload.id]:action.payload}
        case t.REMOVE_TASK:
            delete state[action.payload]
            return { ...state }
        default:
            return state
    }
}

export default combineReducers({ tasksReducer })