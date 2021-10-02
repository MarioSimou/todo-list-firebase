import React from 'react'
import { Flex} from '@chakra-ui/react'
import Link from '../../shared/Link'
import { useAuth, useHistory } from '../../../hooks'

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
                <Link to="/">Home</Link>
                <Link to="/photos">Photos</Link>
                {!user && <Link to="/sign-in">Sign In</Link>}
                {user && <Link to="#" onClick={onClickSignOut}>Sign Out</Link>}
            </Flex>
        </Flex>
    )
}

export default Navbar