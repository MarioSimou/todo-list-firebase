import React from 'react'
import { FormControl, FormErrorMessage, Input as ChakraInput, FormLabel} from '@chakra-ui/react'
import { UnknownMap } from '../../../types'

type Props<T> = {
    id: string
    label: string
    error?: string
    touched?: boolean
    required?: boolean
    disabled?: boolean
    value: string
    Input?: React.ElementType
    InputProps?: UnknownMap
    onBlur: (e: React.MouseEvent<T>) => void
    onChange: (e: React.ChangeEvent<T>) => void
}

function Field<T>({
    id,
    label,
    value,
    touched = false, 
    error = '',
    disabled =false,
    required = false,
    Input = ChakraInput,
    InputProps = {type: "text"},
    onChange,
    onBlur,
}: Props<T>): React.ReactElement {

    return (
        <FormControl id={id} isInvalid={Boolean(error && touched)} isRequired={required} isDisabled={disabled}>
            <FormLabel>{label}</FormLabel>
            <Input variant="filled" value={value} onChange={onChange} onBlur={onBlur} {...InputProps}/>
            <FormErrorMessage>{error}</FormErrorMessage>
        </FormControl>
    )
}   

export default Field