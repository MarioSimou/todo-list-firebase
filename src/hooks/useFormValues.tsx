import React from 'react'
import { ObjectSchema } from 'yup'
import { ObjectShape } from 'yup/lib/object'
import { FieldsMap } from '../types'

type FormValuesResult = {
    formValues: FieldsMap,
    handleOnChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
    handleOnBlur: (e: React.MouseEvent<HTMLInputElement | HTMLTextAreaElement>) => void
    setValue: (name: string, value: string) => void
    setError: (name: string, error: string) => void
    enableTouched: (name: string) => void
    resetFormValues: () => void
    onSubmit: (cb: (formValues: FieldsMap) => void) => Function
} 

const validateField = function<T extends ObjectShape>(id: string, value: string, validationSchema: ObjectSchema<T>): string {
    try {
        validationSchema.validateSyncAt(id, {[id]: value})    
        return  ''
    }catch(e){
        return e.message
    }
} 

const useFormValues = function<T extends ObjectShape>(initialValues: FieldsMap, validationSchema: ObjectSchema<T>): FormValuesResult {
    const [formValues, setFormValues] = React.useState(initialValues)

    const handleOnChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {value = '', id} = e.target

        setFormValues(formValues => ({
            ...formValues,
            [id]: {
                touched: true,
                error: validateField(id, value, validationSchema),
                value,
            }
        }))
    }, [setFormValues, validationSchema])

    const handleOnBlur = React.useCallback((e: React.MouseEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {id} = e.currentTarget
        setFormValues(formValues => ({
            ...formValues,
            [id]: {
                ...formValues[id],
                touched: true,
            }
        }))
    }, [setFormValues])

    const setValue = React.useCallback((name: string, value: string) => {
        setFormValues(formValues => ({
            ...formValues,
            [name]: {
                ...formValues[name],
                value,
            },
        }))
    },[setFormValues])

    const setError = React.useCallback((name: string, error: string) => {
        setFormValues(formValues => ({
            ...formValues,
            [name]: {
                ...formValues[name],
                error,
            },
        }))
    },[setFormValues])

    const enableTouched = React.useCallback((name: string) => {
        setFormValues(formValues => ({
            ...formValues,
            [name]: {
                ...formValues[name],
                touched: true,
            },
        }))
    },[setFormValues])

    const resetFormValues = React.useCallback(() => setFormValues(() => initialValues), [initialValues, setFormValues])

    const onSubmit = React.useCallback((cb: (formValues: FieldsMap) => void): Function => {
        try {
            const values = Object.entries(formValues).reduce((fieldValues, [fieldName, {value}]) => ({
                ...fieldValues,
                [fieldName]: value,
            }),{})

            validationSchema.validateSync(values)
            return () => cb(formValues)
        }catch(e){
            console.error(e.message)
            return () => null
        }
    }, [validationSchema, formValues])

    return {
        formValues,
        setValue,
        setError,
        enableTouched,
        handleOnChange,
        handleOnBlur,
        resetFormValues,
        onSubmit,
    }
}

export default useFormValues