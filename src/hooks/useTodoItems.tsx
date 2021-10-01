import React from 'react'
import { TodoItemT } from '../types'
import { getApp } from 'firebase/app'
import { QuerySnapshot,setDoc, getFirestore, doc, deleteDoc, updateDoc, collection, getDocs } from 'firebase/firestore'

export type TodoItemsResult = {
    items: TodoItemT[]
    addItem: (item: TodoItemT) => void
    deleteItem: (id: string) => void
    updateItem: (id: string, item: TodoItemT) => void
    resetItems: () => void
    selectedItem: TodoItemT | undefined
    selectItem: (item: TodoItemT) => void
    resetSelectedItem: () => void  
}

const useTodoItems = (appName: string, initialItems: TodoItemT[] = [], fetchOnLoad: boolean = true): TodoItemsResult => {
    const [items, setItems] = React.useState<TodoItemT[]>(initialItems)
    const [selectedItem, selectItem] = React.useState<TodoItemT>()
    const app = React.useMemo(() => getApp(appName), [appName])
    const firestore = React.useMemo(() => getFirestore(app), [app])

    const addItem = React.useCallback(async (item: TodoItemT) => {
        await setDoc(doc(firestore, 'items', item.id), item)
        return setItems(items => [...items, item])
    }, [firestore])

    const deleteItem = React.useCallback(async (id: string) => {
        await deleteDoc(doc(firestore, 'items', id))
        return setItems(items => items.filter(item => item.id !== id))
    }, [firestore])

    const updateItem = React.useCallback(async (id: string, item: TodoItemT) => {
        await updateDoc(doc(firestore, 'items', id), item)
        return setItems(items => ([
            ...items.filter(({id}) => id !== item.id),
            item,
        ]))
    }, [firestore])

    const resetItems = React.useCallback(() => setItems(initialItems) , [setItems, initialItems])

    React.useEffect(() => {
        if(!fetchOnLoad){
            return
        }

        const fetchItems = async (): Promise<void> => {
            const docsSnapshot: QuerySnapshot = await getDocs(collection(firestore, 'items'))

            if(docsSnapshot.empty) {
                return                
            }

            const newItems = docsSnapshot.docs.map<TodoItemT>(doc => doc.data() as TodoItemT)
            return setItems((items) => [...items,...newItems])
        }

        fetchItems()

        return () => setItems([])
    }, [firestore,fetchOnLoad, setItems])

    const resetSelectedItem = React.useCallback(() => {
        selectItem(undefined)
    }, [selectItem])

    return {
        items,
        addItem,
        deleteItem,
        updateItem,
        resetItems,
        selectedItem,
        selectItem,
        resetSelectedItem,
    }
}

export default useTodoItems