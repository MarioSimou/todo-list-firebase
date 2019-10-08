import * as t from './types'

export const addTask = payload => ({
    type: t.ADD_TASK,
    payload: payload
})

export const removeTask = id => ({
    type: t.REMOVE_TASK,
    payload: id
})