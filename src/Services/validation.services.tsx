// import * as yup from 'yup'

// export function createYupSchema(schema:any, config:any) {

//     const { fieldname, controlname, isRequired, multipleSelect, condition } = config

//     if((controlname === "CheckBox" || (controlname==="DropDown" && multipleSelect)) && isRequired)
//     {
//         let validator = yup["array"]()
//         if(condition.controlid) {
//             if(condition.operator === "equal") {
//                 validator = validator["when"](condition.fieldname,{
//                     is:condition.value||condition.fieldname.includes(condition.value),
//                     then:yup.array().test(fieldname,fieldname+" is Required",function(value) {
//                         if(isRequired) {
//                             if(value?.length===0 || !value) {
//                                 return false 
//                             }
//                             else {
//                                 return true
//                             }
//                         }
//                         else {
//                             return true
//                         }
//                     })
//                 })
//             }
//             else {
//                 validator = validator["when"](condition.fieldname,{
//                     is:condition.value||condition.fieldname.includes(condition.value),
//                     otherwise:yup.array().test(fieldname,fieldname+" is Required",function(value) {
//                         if(isRequired) {
//                             if(value?.length===0 || !value) {
//                                 return false 
//                             }
//                             else {
//                                 return true
//                             }
//                         }
//                         else {
//                             return true
//                         }
//                     })
//                 })
//             }
//         }
//         else {
//             validator = validator.test(fieldname,fieldname+" is Required",function(value){
//                 if(value?.length===0) {
//                     return false
//                 }
//                 else {
//                     return true
//                 }
//             })
//         }
//         schema[fieldname] = validator   
//     }
//     else
//     {
//         let validator = yup["string"]()
//         if(controlname==="Email") {
//             validator = validator["email"]('Enter Valid Email')
//         }
//         if(condition.controlid) {
//             if(condition.operator === "equal") {
//                 validator = validator["when"](condition.fieldname,{
//                     is:condition.value||condition.fieldname.includes(condition.value),
//                     then:yup.string().test(fieldname,fieldname+" is Required",function(value) {
//                         if(isRequired) {
//                             if(!value) {
//                                 return false 
//                             }
//                             else {
//                                 return true
//                             }
//                         }
//                         else {
//                             return true
//                         }
//                     })
//                 })
//             }
//             else {
//                 validator = validator["when"](condition.fieldname,{
//                     is:condition.value||condition.fieldname.includes(condition.value),
//                     otherwise:yup.string().test(fieldname,fieldname+" is Required",function(value) {
//                         if(isRequired) {
//                             if(!value) {
//                                 return false 
//                             }
//                             else {
//                                 return true
//                             }
//                         }
//                         else {
//                             return true
//                         }
//                     })
//                 })
//             }
//         }
//         else {
//             if(isRequired) {
//                 validator = validator["required"](fieldname+" is Required")
//             }
//         }
//         schema[fieldname] = validator
//     }
//     return schema
//   }

import * as yup from 'yup'

export function createYupSchema(schema:any, config:any) {

    const { fieldname, controlname, isRequired, multipleSelect, condition } = config
    console.log(controlname)
    if(controlname === "Email")
    {
        let validator = yup["string"]().email('Enter Valid Email')
        if(condition.controlid) {
            if(condition.operator === "equal") {
                validator = validator["when"](condition.fieldname,{
                    is:condition.value||condition.fieldname.includes(condition.value),
                    then:yup.string().test(fieldname,fieldname+" is Required",function(value) {
                        if(isRequired) {
                            if(!value) {
                                return false 
                            }
                            else {
                                return true
                            }
                        }
                        else {
                            return true
                        }
                    })
                })
            }
            else {
                validator = validator["when"](condition.fieldname,{
                    is:condition.value||condition.fieldname.includes(condition.value),
                    otherwise:yup.string().test(fieldname,fieldname+" is Required",function(value) {
                        if(isRequired) {
                            if(!value) {
                                return false 
                            }
                            else {
                                return true
                            }
                        }
                        else {
                            return true
                        }
                    })
                })
            }
        }
        else {
            if(isRequired) {
                validator = validator["required"](fieldname+" is Required")
            }
        }
        schema[fieldname] = validator
    }
    else if(controlname === "Number")
    {
        let validator = yup["string"]()
        if(condition.controlid) {
            if(condition.operator === "equal") {
                validator = validator["when"](condition.fieldname,{
                    is:condition.value||condition.fieldname.includes(condition.value),
                    then:yup.string().test(fieldname,fieldname+" is Required",function(value) {
                        if(isRequired) {
                            if(!value) {
                                return false 
                            }
                            else {
                                return true
                            }
                        }
                        else {
                            return true
                        }
                    })
                })
            }
            else {
                validator = validator["when"](condition.fieldname,{
                    is:condition.value||condition.fieldname.includes(condition.value),
                    otherwise:yup.string().test(fieldname,fieldname+" is Required",function(value) {
                        if(isRequired) {
                            if(!value) {
                                return false 
                            }
                            else {
                                return true
                            }
                        }
                        else {
                            return true
                        }
                    })
                })
            }
        }
        else {
            if(isRequired) {
                validator = validator["required"](fieldname+" is Required")
            }
        }
        validator = validator["matches"](/^[0-9]+$/, "Must be only digits")
        schema[fieldname] = validator
    }
    else if((controlname === "CheckBox" || (controlname==="DropDown" && multipleSelect)) && isRequired)
    {
        let validator = yup["array"]()
        if(condition.controlid) {
            if(condition.operator === "equal") {
                validator = validator["when"](condition.fieldname,{
                    is:condition.value||condition.fieldname.includes(condition.value),
                    then:yup.array().test(fieldname,fieldname+" is Required",function(value) {
                        if(isRequired) {
                            if(value?.length===0 || !value) {
                                return false 
                            }
                            else {
                                return true
                            }
                        }
                        else {
                            return true
                        }
                    })
                })
            }
            else {
                validator = validator["when"](condition.fieldname,{
                    is:condition.value||condition.fieldname.includes(condition.value),
                    otherwise:yup.array().test(fieldname,fieldname+" is Required",function(value) {
                        if(isRequired) {
                            if(value?.length===0 || !value) {
                                return false 
                            }
                            else {
                                return true
                            }
                        }
                        else {
                            return true
                        }
                    })
                })
            }
        }
        else {
            validator = validator.test(fieldname,fieldname+" is Required",function(value){
                if(value?.length===0) {
                    return false
                }
                else {
                    return true
                }
            })
        }
        schema[fieldname] = validator   
    }
    else if(isRequired)
    {
        let validator = yup["string"]()
        if(condition.controlid) {
            if(condition.operator === "equal") {
                validator = validator["when"](condition.fieldname,{
                    is:condition.value||condition.fieldname.includes(condition.value),
                    then:yup.string().test(fieldname,fieldname+" is Required",function(value) {
                        if(isRequired) {
                            if(!value) {
                                return false 
                            }
                            else {
                                return true
                            }
                        }
                        else {
                            return true
                        }
                    })
                })
            }
            else {
                validator = validator["when"](condition.fieldname,{
                    is:condition.value||condition.fieldname.includes(condition.value),
                    otherwise:yup.string().test(fieldname,fieldname+" is Required",function(value) {
                        if(isRequired) {
                            if(!value) {
                                return false 
                            }
                            else {
                                return true
                            }
                        }
                        else {
                            return true
                        }
                    })
                })
            }
        }
        else {
            if(isRequired) {
                validator = validator["required"](fieldname+" is Required")
            }
        }
        schema[fieldname] = validator
    }
    return schema
  }