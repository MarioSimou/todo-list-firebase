import React from 'react'
import {Button, Drawer, DrawerOverlay, DrawerBody, DrawerCloseButton, DrawerFooter, DrawerContent, DrawerHeader, ButtonGroup } from '@chakra-ui/react'

export type Props = {
    isOpen: boolean
    onClose: () => void
    title: string
    children: React.ReactElement
    submitText?: string
    resetText?: string
    onReset: () => void
    onSubmit: () => void
}

const RightDrawer: React.FC<Props> = ({
    isOpen,
    onClose,
    title,
    children,
    submitText = 'Submit',
    onSubmit,
    resetText = 'Reset',
    onReset,
}) => {
    return (
        <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="md">
            <DrawerOverlay/>
            <DrawerContent>
                <DrawerCloseButton/>
                <DrawerHeader>{title}</DrawerHeader>
                <DrawerBody>
                    {children}
                </DrawerBody>
                <DrawerFooter>
                    <ButtonGroup w="100%" flexDirection="column" colorScheme="blue" gridRowGap="0.5rem">
                        <Button onClick={onSubmit}>{submitText}</Button>
                        <Button onClick={onReset} m="0 !important">{resetText}</Button>
                    </ButtonGroup>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}

export default RightDrawer