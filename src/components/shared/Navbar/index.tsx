import React from 'react'
import {Link as RouterLink, LinkProps, useHistory} from 'react-router-dom'
import { Flex, Link as ChakraLink } from '@chakra-ui/react'
import { useAuth } from '../../../hooks'

const Link: React.FC<LinkProps> = (props) => {
    return (
        <ChakraLink as={RouterLink} {...props} color="#f4f4f4" fontWeight={500} letterSpacing="wider" fontSize="1.25rem" />
    )
}

const Navbar = () => {
    const {signOut, user} = useAuth()
    const router = useHistory()
    const onClickSignOut = React.useCallback(() => {
        signOut()
        return router.push('/sign-in')
    }, [signOut, router])

    return (
        <Flex p="1rem" alignItems="center" justifyContent="flex-end" bg="blackAlpha.800">
            <Flex gridColumnGap="1rem">
                <Link to="/home">Home</Link>
                <Link to="/photos">Photos</Link>
                {!user && <Link to="/sign-in">Sign In</Link>}
                {user && <Link to="#" onClick={onClickSignOut}>Sign Out</Link>}
            </Flex>
        </Flex>
    )
}

export default Navbar