import { useEffect, useState } from 'react'
import { getLookUpValues } from '../../../Services/lookup.services'
import { IControlProps } from '../../../Types/formType'
import CheckBox from '../Controls/CheckBox'
import DropDown from '../Controls/DropDown'
import Email from '../Controls/Email'
import MultiSelect from '../Controls/MultiSelect'
import Number from '../Controls/Number'
import RadioButton from '../Controls/RadioButton'
import TextBox from '../Controls/TextBox'

const Control = (props:IControlProps) => {

    useEffect(()=> {
        if(props.sc.sourceid!=="" || props.sc.sourceid) {
            lookupvalues(props.sc.sourceid)
        }
    },[])

    const [source, setSource] = useState<string[]>([])

    const lookupvalues = async (id:string) => {
        if(id!==null && id) {
          setSource(await getLookUpValues(id.toString()))  
        }
        else {
            setSource([])
        }
    }

    const check = () => {
        let index = props.selected.findIndex((obj => obj.condition.dependentcontrolid === props.sc.controlid))
        if(index!==-1) {
            let i = props.selected.findIndex((obj => obj.controlid == props.selected[index].condition.controlid))
            let currentValue = props.fieldValue[props.selected[i].fieldname]
            let selectedValue = props.selected[index].condition.value
            let operator = props.selected[index].condition.operator
            return operator==="equal"?(currentValue===selectedValue||currentValue.includes(selectedValue)):(!(currentValue===selectedValue||currentValue.includes(selectedValue)))
        }
        else {
            return true
        }
    }


    return (
        <>
            {props.sc.controlname==="CheckBox" && check() && <CheckBox sc={props.sc} allcontrols={props.selected} setValue={props.setFieldValue} source={source}/>}

            {props.sc.controlname==="DropDown" && !props.sc.multipleSelect && check() && <DropDown sc={props.sc} allcontrols={props.selected} setValue={props.setFieldValue} source={source}/>}

            {props.sc.controlname==="DropDown" && props.sc.multipleSelect && check() && <MultiSelect sc={props.sc} allcontrols={props.selected} setValue={props.setFieldValue} source={source}/>}

            {props.sc.controlname==="RadioButton" && check() && <RadioButton sc={props.sc} setValue={props.setFieldValue} allcontrols={props.selected} source={source} />}

            {props.sc.controlname==="TextBox" && check() && <TextBox sc={props.sc} setValue={props.setFieldValue} allcontrols={props.selected} />}

            {props.sc.controlname==="Number" && check() && <Number sc={props.sc} setValue={props.setFieldValue} allcontrols={props.selected}/>}

            {props.sc.controlname==="Email" && check() && <Email sc={props.sc} allcontrols={props.selected} setValue={props.setFieldValue} />}
        </>
    )
}

export default Control
