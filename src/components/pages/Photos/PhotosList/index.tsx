import React from 'react'
import {Grid} from '@chakra-ui/react'
import Photo from '../Photo'
import { ImageT } from '../../../../types'

type Props = {
    photos: ImageT[]
    onDelete: (id: string) => void 
}

const  PhotosList: React.FC<Props> = ({photos, onDelete}) => {
    return (
        <Grid templateColumns="repeat(auto-fill, minmax(300px,1fr))" gridGap="1rem">
            {photos.map(photo => {
                const onDeletePhoto = () => onDelete(photo.name)
                return (
                    <Photo key={photo.fullPath} photo={photo} onDelete={onDeletePhoto}/>
                )
            })}
        </Grid>
    )
}

export default PhotosList