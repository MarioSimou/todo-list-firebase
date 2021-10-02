import React from 'react'
import { getDownloadURL, getStorage, ref, uploadString, listAll, getMetadata, StorageReference, deleteObject} from 'firebase/storage'
import { getApp } from '@firebase/app'
import { ImageT } from '../types'

type PhotosResult = {
    uploadPhoto: (id: string, dataUrl: string) => Promise<ImageT>
    deletePhoto: (id: string) => Promise<void>
    photos: ImageT[]
}

const usePhotos = (appName: string, bucket: string = 'photos' ): PhotosResult => {
    const [photos, setPhotos] = React.useState<ImageT[]>([])
    const app = React.useMemo(() => getApp(appName), [appName])
    const storage = React.useMemo(() => getStorage(app), [app])

    const uploadPhoto = React.useCallback(async (id: string, dataUrl: string): Promise<ImageT> => {
        // const {mime} = dataUrl.match(/image\/(?<mime>\w+)/)?.groups ?? {mime: 'png'}
        const imageRef = ref(storage, `${bucket}/${id}`)

        const {metadata, ref: uploadedImageRef} = await uploadString(imageRef, dataUrl, 'data_url')
        const url = await getDownloadURL(uploadedImageRef)
        const photo = {...metadata, url}
        setPhotos(photos => [...photos, photo])
        return photo
    }, [storage, bucket, setPhotos])

    const deletePhoto = React.useCallback(async (id: string): Promise<void> => {
        const imageRef = ref(storage, `${bucket}/${id}`)
        await deleteObject(imageRef) 
        return setPhotos(photos => photos.filter(photo => photo.name !== id))
    }, [storage, bucket])

    React.useEffect(() => {
        const fetchImages = async () => {
            const bucketRef = ref(storage, bucket)
            const {items: imagesRefs} = await listAll(bucketRef)
            const getImageUrlAndMeta = async (itemRef: StorageReference): Promise<ImageT> => {
                const url = await getDownloadURL(itemRef)
                const metadata = await getMetadata(itemRef)
                return {...metadata, url}
            }
            const newImages = await Promise.all(imagesRefs.map(getImageUrlAndMeta)) 
            setPhotos(images => [...images, ...newImages])
        }

        fetchImages()
        return () => setPhotos([])
    }, [bucket, storage, setPhotos])

    return {
        photos,
        uploadPhoto,
        deletePhoto,
    }
}

export default usePhotos