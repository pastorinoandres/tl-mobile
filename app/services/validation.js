
const getErrorsFromValidationError = (validationError)=>{
    const FIRST_ERROR = 0
    return validationError.inner.reduce((errors, error) => {
      return {
        ...errors,
        [error.path]: error.errors[FIRST_ERROR],
      }
    }, {})
}

export default getValidateFunction = (values, getValidationSchema,abortEarly)=> {
        
    const validationSchema = getValidationSchema(values);
    try {
    validationSchema.validateSync(values, { abortEarly })
    return {}
    } catch (error) {
    return getErrorsFromValidationError(error)
    }
    
}

