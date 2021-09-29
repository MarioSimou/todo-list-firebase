import React from 'react'
import { Textarea, VStack, Button, Drawer, DrawerOverlay, DrawerBody, DrawerCloseButton, DrawerFooter, DrawerContent, DrawerHeader, ButtonGroup } from '@chakra-ui/react'
import Field from '../../../shared/Field'

export type Props = {
    isOpen: boolean
    onClose: () => void
}

const AddTodoItemDrawer: React.FC<Props> = ({
    isOpen,
    onClose,
}) => {
    const handleOnChange = () => console.log('change')
    const handleOnBlur = () => console.log('on blur')

    return (
        <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="md">
            <DrawerOverlay/>
            <DrawerContent>
                <DrawerCloseButton/>
                <DrawerHeader>Add Todo Item</DrawerHeader>
                <DrawerBody>
                    <VStack spacing="1.5rem" as="form">
                        <Field id="title" 
                            label="Title:"
                            value=""
                            onChange={handleOnChange} 
                            onBlur={handleOnBlur}
                            InputProps={{
                                type: 'text',
                                placeholder: 'Your title',
                            }}
                            required/>
                        <Field id="description" 
                            label="Description:"
                            value=""
                            onChange={handleOnChange} 
                            onBlur={handleOnBlur}
                            Input={Textarea}
                            InputProps={{
                                placeholder: 'Your description',
                                rows: 25,
                                isFullWidth: true,
                            }}
                            required/>
                    </VStack>
                </DrawerBody>
                <DrawerFooter>
                    <ButtonGroup w="100%" flexDirection="column" colorScheme="blue" gridRowGap="0.5rem">
                        <Button onClick={() => console.log('add item')}>Add Item</Button>
                        <Button onClick={() => console.log('reset content')} m="0 !important">Reset</Button>
                    </ButtonGroup>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}

export default AddTodoItemDrawer