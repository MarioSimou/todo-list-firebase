import * as t from './types'

export const loadTasks = payload => ({
    type: t.LOAD_TASKS,
    payload: payload,
})

export const addTask = payload => ({
    type: t.ADD_TASK,
    payload: payload
})

export const removeTask = id => ({
    type: t.REMOVE_TASK,
    payload: id
})

export const updateTask = payload => ({
    type: t.UPDATE_TASK,
    payload: payload,
})