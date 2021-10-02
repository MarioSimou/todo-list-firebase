import React from 'react'
import { Box, Heading, Input, Button, Image, VStack, ButtonGroup, FormControl, FormErrorMessage } from '@chakra-ui/react'
import {useFormValues,validateField, usePhotos} from '../../../hooks'
import PhotoList from './PhotosList'
import * as yup from 'yup'
import {v4 as uuid4} from 'uuid'

const validationSchema = yup.object().shape({
    image: yup.string().required().test('image', "This isn't is valid iamge", (value) => /data:image\/\w+;base64,.+/.test(value as string))
})

const Photos = () => {
    const {photos, uploadPhoto, deletePhoto} = usePhotos('todo-list')
    const {formValues, setValue, setError, enableTouched} = useFormValues({
        image: {
            touched: false,
            error: '',
            value: '',
        }
    }, validationSchema)

    const fileFieldRef = React.useRef<HTMLInputElement>()
    const onClickSelectImage = React.useCallback(() => {
        if(!fileFieldRef.current){
            return
        }
        return fileFieldRef.current.click()
    }, [fileFieldRef]) 

    const onChangeImage = React.useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
        const {files, id} = e.currentTarget

        enableTouched(id)

        if(files?.length === 0){
            return
        }

        const file = files?.[0] as File

        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => {
            const imageDataURL = reader.result as string
            const e = validateField(id, imageDataURL, validationSchema)

            if(e){
                return setError(id, e)
            }

            setError(id, '')
            return setValue(id, imageDataURL)
        }
        reader.onerror = () => {
            setError(id, reader.error?.message as string)
        }
    }, [enableTouched, setError, setValue])

    const onClickUploadImage = React.useCallback(async () => {
        const id = uuid4()
        const image = await uploadPhoto(id,formValues.image.value)
        console.log(image)
    }, [uploadPhoto, formValues])

    return (
        <VStack p="2rem" spacing="2rem" maxW="1200px" m="0 auto">
            <Heading>Upload image</Heading>
            <Box as="form">
                <FormControl id="image" isInvalid={Boolean(formValues.image.error && formValues.image.touched)}>
                    <Input type="file" name="image" accept="image/*" ref={fileFieldRef} display="none" onChange={onChangeImage}/>
                    <Image src={formValues.image.value} 
                        alt="image" 
                        title="image" 
                        fallbackSrc="https://blogs.oregonstate.edu/bhs323cjp/wp-content/themes/koji/assets/images/default-fallback-image.png"
                        objectFit="cover"
                        h={[200,200,400,400]}
                        w="100%"/>
                    <ButtonGroup variant="solid" colorScheme="blue" flexDirection="column" w="100%" gridRowGap="0.5rem">
                        <Button onClick={onClickSelectImage} isFullWidth>Select Image</Button>
                        <Button onClick={onClickUploadImage} isFullWidth m="0 !important" disabled={Boolean(formValues.image.error || !formValues.image.touched)}>Upload</Button>
                    </ButtonGroup>
                    <FormErrorMessage>{formValues.image.error}</FormErrorMessage>
                </FormControl>
            </Box>
            <VStack spacing="1rem" mt="3rem">
                <Heading as="h2">Photos</Heading>
                <PhotoList photos={photos} onDelete={deletePhoto}/>
            </VStack>
        </VStack>
    )
}

export default Photos