import React from 'react'
import TodoItem from '../TodoItem'
import {Flex} from '@chakra-ui/react'
import { TodoItemT } from '../../../../types'

type Props = {
    items: TodoItemT[]
}

const TodoList: React.FC<Props> = ({
    items,
}) => {
    return (
        <Flex>
            {items.map<React.ReactElement>(item => {
                return (
                    <TodoItem key={item.title} item={item}/>
                )
            })}
        </Flex>
    )
}

export default TodoList