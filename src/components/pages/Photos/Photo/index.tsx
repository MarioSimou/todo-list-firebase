import React from 'react'
import {Box, Image, CloseButton} from '@chakra-ui/react'
import { ImageT } from '../../../../types'

type Props = {
    photo: ImageT
    onDelete: () => void
}

const  Photo: React.FC<Props> = ({photo, onDelete}) => {
    return (
        <Box position="relative">
            <CloseButton position="absolute" top=".5rem" right="0.5rem" bg="red.50" borderRadius="full" _hover={{bg: 'red.600', color: 'white'}} onClick={onDelete}/>
            <Image key={photo.fullPath} 
                src={photo.url} 
                title={photo.fullPath} 
                alt={photo.fullPath} 
                boxSize="100%"
                objectFit="cover" w="100%"/>
        </Box>
    )
}

export default Photo