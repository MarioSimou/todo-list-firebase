import React from 'react'
import { TodoItemT } from '../../types'
import { Heading, Text, Box} from '@chakra-ui/react'

type Props = {
    item: TodoItemT
}

const TodoItem: React.FC<Props> = ({
    item,
}) => {
    return (
        <Box bg="yellow.300">
            <Heading>{item.title}</Heading>
            <Text fontSize="0.9rem">{item.description}</Text>
        </Box>
    )
}

export default TodoItem