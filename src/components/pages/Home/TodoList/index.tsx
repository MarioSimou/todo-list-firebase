import React from 'react'
import TodoItem from '../TodoItem'
import {Flex} from '@chakra-ui/react'
import { TodoItemT } from '../../../../types'

type Props = {
    items: TodoItemT[]
    deleteItem: (id: string) => void
    updateItem: (item: TodoItemT) => void
}

const TodoList: React.FC<Props> = ({
    items,
    deleteItem,
    updateItem
}) => {
    return (
        <Flex flexDirection="column" gridRowGap="1rem" w="100%">
            {items.map<React.ReactElement>(item => {
                const onDeleteItem = () => deleteItem(item.id)
                const onUpdateItem = () => updateItem(item)
                return (
                    <TodoItem key={item.title} item={item} deleteItem={onDeleteItem} updateItem={onUpdateItem}/>
                )
            })}
        </Flex>
    )
}

export default TodoList