import React from 'react'
import { Textarea, useToast, VStack } from '@chakra-ui/react'
import Field from '../../../shared/Field'
import { useFormValues } from '../../../../hooks'
import * as yup from 'yup'
import { FieldsMap, TodoItemT } from '../../../../types'
import { v4 as uuid4 } from 'uuid'
import RightDrawer from '../../../shared/RightDrawer'

export type Props = {
    isOpen: boolean
    onClose: () => void
    addItem: (item: TodoItemT) => void
}

const validationSchema = yup.object().shape({
    title: yup.string().required(),
    description: yup.string().required(),
})

const AddTodoItemDrawer: React.FC<Props> = ({
    isOpen,
    onClose,
    addItem,
}) => {
    const {formValues, handleOnChange, handleOnBlur, resetFormValues, onSubmit} = useFormValues({
        title: {
            value: '',
            error: '',
            touched: false,
        },
        description: {
            value: '',
            error: '',
            touched: false,
        },
     }, validationSchema)
     const setNotification = useToast({
         position: 'bottom-right',
         isClosable: true,
         variant: 'solid'
     })

     const onSubmitTodoItem = React.useCallback(() => {
         const [e, cb] = onSubmit(async(formValues: FieldsMap) => {
             const todoItem: TodoItemT = {
                 id: uuid4(),
                 title: formValues.title.value,
                 description: formValues.description.value,
             }
             await addItem(todoItem)
             
             resetFormValues()
             onClose()
        })

        if(e){
            return setNotification({
                title: 'Error',
                description: e.message,
                status: 'error'
            })
        }

        return cb?.()
     }, [onSubmit, resetFormValues, setNotification, addItem, onClose])

    return (
        <RightDrawer isOpen={isOpen}
            onClose={onClose}
            title="Add Todo Item"
            submitText="Add Item"
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

export default AddTodoItemDrawer