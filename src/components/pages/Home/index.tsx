import React from 'react'
import TodoList from './TodoList'
import {Box, Flex, VStack, Button, Heading} from '@chakra-ui/react'
import AddTodoItemDrawer from './AddTodoItemDrawer'
import UpdateTodoItemDrawer from './UpdateTodoItemDrawer'
import {AddIcon} from '@chakra-ui/icons'
import { useTodoItems } from '../../../hooks'
import { TodoItemT } from '../../../types'

const Home = () => {
    const {items, addItem, deleteItem, updateItem, selectedItem, selectItem, resetSelectedItem} = useTodoItems("todo-list", [], true)
    const [isAddTodoItemDrawerOpen, setAddTodoItemDrawerStatus] = React.useState(false)
    const [isUpdateTodoItemDrawerOpen, setUpdateTodoItemDrawerStatus] = React.useState(false)
    const closeAddTodoItemDrawer = React.useCallback(() => setAddTodoItemDrawerStatus(false), [setAddTodoItemDrawerStatus])
    const openAddTodoItemDrawer = React.useCallback(() => setAddTodoItemDrawerStatus(true), [setAddTodoItemDrawerStatus])
    const closeUpdateTodoItemDrawer = React.useCallback(() => setUpdateTodoItemDrawerStatus(false), [setUpdateTodoItemDrawerStatus])
    const openUpdateTodoItemDrawer = React.useCallback(() => setUpdateTodoItemDrawerStatus(true), [setUpdateTodoItemDrawerStatus])

    const onClickUpdateTodoItem = React.useCallback((item: TodoItemT) => {
        selectItem(item) 
        openUpdateTodoItemDrawer()
    }, [selectItem,openUpdateTodoItemDrawer])

    const onCloseUpdateTodoItem = React.useCallback(() => {
        resetSelectedItem()
        closeUpdateTodoItemDrawer()
    }, [resetSelectedItem, closeUpdateTodoItemDrawer])

    return (
        <Box>
            <Flex p="1rem .5rem" alignItems="center" justifyContent="flex-end" bg="blackAlpha.100">
                <Button leftIcon={<AddIcon/>} variant="unstyled" onClick={openAddTodoItemDrawer}>Add Item</Button>
            </Flex>
            <AddTodoItemDrawer isOpen={isAddTodoItemDrawerOpen} onClose={closeAddTodoItemDrawer} addItem={addItem}/>
            {selectedItem && <UpdateTodoItemDrawer isOpen={isUpdateTodoItemDrawerOpen} onClose={onCloseUpdateTodoItem} updateItem={updateItem} item={selectedItem}/>}
            <VStack p="2rem" spacing="2rem">
                <Heading>Todo Items List</Heading>
                <TodoList items={items} deleteItem={deleteItem} updateItem={onClickUpdateTodoItem}/>
            </VStack>
        </Box>
    )
}

export default Home