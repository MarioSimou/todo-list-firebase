import React from 'react'
import { Flex, Button, ButtonGroup, VStack, Heading, useToast } from '@chakra-ui/react'
import Field from '../../shared/Field'
import { useFormValues, useAuth, useHistory } from '../../../hooks'
import * as yup from 'yup'
import { FieldsMap } from '../../../types'

const validationSchema = yup.object().shape({
    email: yup.string().required().email(),
    password: yup.string().required().test('password', 'Invalid password',(password) => /\w{8,}/.test(password as string))
})

const SignIn = () => {
    const router = useHistory()
    const {signIn} = useAuth()
    const {formValues, handleOnBlur, handleOnChange, onSubmit} = useFormValues({
        email: {
            touched: false,
            error: '',
            value: ''
        },
        password: {
            touched: false,
            error: '',
            value: ''
        }
    }, validationSchema) 
    const setErrorNotification = useToast({
        position: 'bottom-right',
        isClosable: true,
        variant: 'solid',
        status: 'error',
        title: 'Error',
    })

    const onSubmitSignIn = React.useCallback(() => {
        const [e, cb] = onSubmit(async (formValues: FieldsMap) => {
            const {email, password} = formValues 

            const [e] = await signIn(email.value, password.value)
            if(e){
                return setErrorNotification({description: e.message})
            }
            const to = new URLSearchParams(router.location.search).get('redirectTo') ?? '/home'
            return router.push(to)
        })

        if(e){
            return setErrorNotification({
                description: e.message,
            })
        }

        return cb?.()
    }, [onSubmit, setErrorNotification, signIn, router])

    return (
        <Flex p="2rem" w="100%" alignItems="center" justifyContent="center" minH="calc(100vh - 62px)">
            <VStack spacing="1rem" maxW="600px" alignSelf="center" w="100%" bg="blackAlpha.300" p="2rem" as="form">
                <Heading>Sign In</Heading>
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
                    <Button onClick={onSubmitSignIn} isFullWidth>Sign In</Button>
                </ButtonGroup>
            </VStack>
        </Flex>
    )
}

export default SignIn