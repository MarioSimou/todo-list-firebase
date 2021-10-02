import React from 'react'
import {Link as ChakraLink, LinkProps as ChakraLinkProps} from '@chakra-ui/react'
import {Link as RouterLink, LinkProps} from 'react-router-dom'

const Link: React.FC<LinkProps & ChakraLinkProps> = (props) => {
    return (
        <ChakraLink as={RouterLink} color="#f4f4f4" fontWeight={500} letterSpacing="wider" fontSize="1.25rem" {...props} />
    )
}

export default Link