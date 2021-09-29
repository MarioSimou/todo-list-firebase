import React from 'react'
import TodoList from './TodoList'
import {Box, Flex, VStack, Button   } from '@chakra-ui/react'
import AddTodoItemForm from './AddTodoItemForm'
import {AddIcon} from '@chakra-ui/icons'

const Home = () => {
    const [isDrawerOpen, setDrawerStatus] = React.useState(false)
    const closeDrawer = React.useCallback(() => setDrawerStatus(false), [setDrawerStatus])
    const openDrawer = React.useCallback(() => setDrawerStatus(true), [setDrawerStatus])

    return (
        <Box>
            <Flex p="1rem .5rem" alignItems="center" justifyContent="flex-end" bg="blackAlpha.100">
                <Button leftIcon={<AddIcon/>} variant="unstyled" onClick={openDrawer}>Add Item</Button>
            </Flex>
            <VStack>
                <AddTodoItemForm isOpen={isDrawerOpen} onClose={closeDrawer} />
                <TodoList items={[]}/>
            </VStack>
        </Box>
    )
}

export default Home