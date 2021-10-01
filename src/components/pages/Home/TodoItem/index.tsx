import React from 'react'
import { TodoItemT } from '../../../../types'
import { Heading, Text, Box, IconButton, ButtonGroup, Grid} from '@chakra-ui/react'
import { EditIcon, DeleteIcon} from '@chakra-ui/icons'

type Props = {
    item: TodoItemT
    deleteItem: () => void
    updateItem: () => void
}

const TodoItem: React.FC<Props> = ({
    item,
    deleteItem,
    updateItem,
}) => {
    return (
        <Grid bg="blackAlpha.100" borderRadius="1rem" p="1rem" w="100%" templateColumns="1fr max-content" alignItems="center">
            <Box>
                <Heading>{item.title}</Heading>
                <Text fontSize="0.9rem">{item.description}</Text>
            </Box>
            <ButtonGroup colorScheme="blackAlpha">
                <IconButton aria-label="edit-icon" icon={<EditIcon/>} onClick={updateItem}/>
                <IconButton aria-label="delete-icon" icon={<DeleteIcon/>} onClick={deleteItem}/>
            </ButtonGroup>
        </Grid>
    )
}

export default TodoItem