import React from 'react'
import {Link as RouterLink, LinkProps} from 'react-router-dom'
import { Flex, Link as ChakraLink } from '@chakra-ui/react'

const Link: React.FC<LinkProps> = (props) => {
    return (
        <ChakraLink as={RouterLink} {...props} color="#f4f4f4" fontWeight={500} letterSpacing="wider" fontSize="1.25rem" />
    )
}

const Navbar = () => {
    return (
        <Flex p="1rem" alignItems="center" justifyContent="flex-end" bg="blackAlpha.800">
            <Flex gridColumnGap="1rem">
                <Link to="/home">Home</Link>
                <Link to="/photos">Photos</Link>
            </Flex>
        </Flex>
    )
}

export default Navbar