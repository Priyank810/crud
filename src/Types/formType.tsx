export type IControlProps = {
    sc:ControlDetailType
    setFieldValue:any
    fieldValue:any
    selected:ControlDetailType[]
}

export type IDataSourceProps = {
    checkFieldName:(controlid:string,value:any)=>boolean
    submit:(
        values:any,
        id:string
    )=>void
    addRenderValues:(
        values:any,
        controlid:string,
        fieldname:string
    )=>void
    hide:()=>void
    data:ControlDetailType
    allControls:ControlDetailType[]
}

export type IPreviewFormProps = {
    SelectedControls:ControlDetailType[]
    hide:()=>void
}

export type ISourceFieldProps = {
    sc:ControlDetailType
    source:string[]
    setValue:any
    allcontrols:ControlDetailType[]
}

export type IFieldProps = {
    sc:ControlDetailType
    setValue:any
    allcontrols:ControlDetailType[]
}

export type ControlDetailType = {
    sourceid:string,
    label:string,
    controlid:string,
    fieldname:string,
    controlname:string,
    isRequired:boolean,
    iValue:string|[]|number|null|string[],
    isReadOnly:boolean,
    multipleSelect:boolean
    condition:RenderType
}

export type ControlCounterType = {
    name:string
    count:number
}

export type RenderType = {
    controlid:string
    fieldname:string
    value:any
    operator:string,
    dependentfieldname:string
    dependentcontrolid:string
}

export type LookupType = {
    id:number,
    name:string
}[]

export let conditionValue = {
    controlid:"",
    fieldname:"",
    value:"",
    operator:"",
    dependentfieldname:"",
    dependentcontrolid:""
}

export let controlValue = {
    sourceid:"",
    label:"",
    controlid:"",
    fieldname:"",
    controlname:"",
    isRequired:false,
    iValue:"",
    isReadOnly:false,
    multipleSelect:false,
    condition:conditionValue
}

export const operators = [
    {key:'equal', value:'==='},
    {key:'notequal', value:'!=='}
]

