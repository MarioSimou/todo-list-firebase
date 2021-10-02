import { FullMetadata} from 'firebase/storage'

export type TodoItemT = {
    id: string
    title: string
    description: string
}

export type UnknownMap = {[k in string]: unknown} 

export type FieldOptions = {
    touched: boolean
    error: string
    value: string
}

export type FieldsMap = {[k in string]: FieldOptions}

export type ImageT = {
    url: string
} & FullMetadata