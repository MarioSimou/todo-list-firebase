import React from 'react'
import { Flex, Button, ButtonGroup, VStack, Heading, useToast } from '@chakra-ui/react'
import Field from '../../shared/Field'
import { useFormValues, useAuth, useHistory } from '../../../hooks'
import * as yup from 'yup'
import { FieldsMap } from '../../../types'

const validationSchema = yup.object().shape({
    email: yup.string().required().email(),
})

const SendResetPassword = () => {
    const {resetPassword} = useAuth()
    const router = useHistory()
    const {formValues, handleOnBlur, handleOnChange, onSubmit} = useFormValues({
        email: {
            touched: false,
            error: '',
            value: ''
        },
    }, validationSchema) 
    const setErrorNotification = useToast({
        position: 'bottom-right',
        isClosable: true,
        variant: 'solid',
        status: 'error',
        title: 'Error',
    })

    const onSubmitSendResetPassword = React.useCallback(() => {
        const [e, cb] = onSubmit(async ({email}: FieldsMap) => {
            const redirectTo = `${process.env.REACT_APP_BASE_URL as string}/sign-in`
            const [e] = await resetPassword(email.value, redirectTo)
            if(e){
                return setErrorNotification({description: e.message})
            }
            return router.push('/sign-in')
        })

        if(e){
            return setErrorNotification({
                description: e.message,
            })
        }

        return cb?.()
    }, [onSubmit, setErrorNotification, resetPassword, router])

    return (
        <Flex p="2rem" w="100%" alignItems="center" justifyContent="center" minH="calc(100vh - 62px)">
            <VStack spacing="1rem" maxW="600px" alignSelf="center" w="100%" bg="blackAlpha.300" p="2rem" as="form">
                <Heading>Send Reset Password</Heading>
                <Field id="email"
                    label="Email"
                    error={formValues.email.error}
                    touched={formValues.email.touched}
                value={formValues.email.value}
                    onChange={handleOnChange}
                    onBlur={handleOnBlur}
                    InputProps={{
                        type: 'email',
                    }}
                    required/>
                <ButtonGroup variant="solid" colorScheme="blue" w="100%" display="flex" flexDirection="column">
                    <Button onClick={onSubmitSendResetPassword} isFullWidth>Reset Password</Button>
                </ButtonGroup>
            </VStack>
        </Flex>
    )
}

export default SendResetPassword