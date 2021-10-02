import React from 'react'
import {  Flex, VStack, Heading, Button, ButtonGroup, useToast } from '@chakra-ui/react'
import Field from '../../shared/Field'
import { useAuth, useFormValues, useHistory } from '../../../hooks'
import * as yup from 'yup'

const validationSchema = yup.object().shape({
    email: yup.string().required().email(),
    password: yup.string().required().test('password', 'Invalid password',(password) => /\w{8,}/.test(password as string))
})

const SignUp = () => {
    const {signUp} = useAuth()
    const router = useHistory()
    const {formValues, handleOnBlur, handleOnChange, onSubmit} = useFormValues({
        email: {
            touched: false,
            error: '',
            value: '',
        },
        password: {
            touched: false,
            error: '',
            value: '',
        },
    }, validationSchema)
    const setErrorNotification = useToast({
        position: 'bottom-right',
        isClosable: true,
        variant: 'solid',
        status: 'error',
        title: 'Error',
    })

    const onSubmitSignUp = React.useCallback(async () => {
        const [e, cb] = onSubmit(async (formValues) => {
            const {email, password} = formValues
            const [e] = await signUp(email.value, password.value)

            if(e){
                return setErrorNotification({description: e.message})
            }
            const searchParams = new URLSearchParams(router.location.search)
            const to = searchParams.get('redirectTo') ?? '/'
            return router.push(to)
        })

        if(e){
            return setErrorNotification({
                description: e.message
            })
        }
        return cb?.()
    }, [setErrorNotification, signUp, onSubmit, router])

    return (
        <Flex p="2rem" w="100%" alignItems="center" justifyContent="center" minH="calc(100vh - 62px)">
            <VStack spacing="1rem" maxW="600px" alignSelf="center" w="100%" bg="blackAlpha.300" p="2rem" as="form">
                <Heading>Sign Up</Heading>
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
                <Field id="password"
                    label="Password"
                    error={formValues.password.error}
                    touched={formValues.password.touched}
                    value={formValues.password.value}
                    onChange={handleOnChange}
                    onBlur={handleOnBlur}
                    InputProps={{
                        type: 'password',
                    }}
                    required/>
                <ButtonGroup colorScheme="blue" w="100%">
                    <Button onClick={onSubmitSignUp} isFullWidth>Sign Up</Button>
                </ButtonGroup>
            </VStack>
        </Flex>
    )
}

export default SignUp