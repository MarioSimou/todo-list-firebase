import React from 'react'
import { Textarea, useToast, VStack } from '@chakra-ui/react'
import Field from '../../../shared/Field'
import { useFormValues } from '../../../../hooks'
import * as yup from 'yup'
import { FieldsMap, TodoItemT } from '../../../../types'
import RightDrawer from '../../../shared/RightDrawer'

export type Props = {
    isOpen: boolean
    onClose: () => void
    updateItem: (id: string, item: TodoItemT) => void
    item: TodoItemT
}

const validationSchema = yup.object().shape({
    title: yup.string().required(),
    description: yup.string().required(),
})

const UpdateTodoItemDrawer: React.FC<Props> = ({
    isOpen,
    onClose,
    updateItem,
    item,
}) => {
    const {formValues, handleOnChange, handleOnBlur, resetFormValues, onSubmit} = useFormValues({
        title: {
            value: item.title,
            error: '',
            touched: false,
        },
        description: {
            value: item.description,
            error: '',
            touched: false,
        },
     }, validationSchema)
     const setErrorNotification = useToast({
         status: 'error',
         title: 'Update todo item',
         position: 'bottom-right',
         isClosable: true,
     })

     const onSubmitTodoItem = React.useCallback(() => {
         const [e, cb] = onSubmit(async(formValues: FieldsMap) => {
             const todoItem: TodoItemT = {
                 ...item,
                 title: formValues.title.value,
                 description: formValues.description.value,
             }
             await updateItem(todoItem.id, todoItem)
             
             resetFormValues()
             onClose()
        })
        
        if(e){
            return setErrorNotification({description: e.message})
        }
        return cb?.()
     }, [onSubmit, resetFormValues, updateItem, onClose, item, setErrorNotification])

     const onCloseCallback = React.useCallback(() => {
        resetFormValues()
        onClose()
     }, [onClose, resetFormValues])

    return (
        <RightDrawer isOpen={isOpen}
            onClose={onCloseCallback}
            title="Update Todo Item"
            submitText="Update Item"
            onSubmit={onSubmitTodoItem}
            resetText="Reset"
            onReset={resetFormValues}>
            <VStack spacing="1.5rem" as="form">
                <Field id="title" 
                    label="Title:"
                    value={formValues.title.value}
                    error={formValues.title.error}
                    touched={formValues.title.touched}
                    onChange={handleOnChange} 
                    onBlur={handleOnBlur}
                    InputProps={{
                        type: 'text',
                        placeholder: 'Your title',
                    }}
                    required/>
                <Field id="description" 
                    label="Description:"
                    value={formValues.description.value}
                    error={formValues.description.error}
                    touched={formValues.description.touched}
                    onChange={handleOnChange} 
                    onBlur={handleOnBlur}
                    Input={Textarea}
                    InputProps={{
                        placeholder: 'Your description',
                        rows: 25,
                    }}
                    required/>
            </VStack>
        </RightDrawer>
    )
}

export default UpdateTodoItemDrawer