import { FunctionComponent, useEffect, useState } from 'react'
import { Button, ButtonToolbar, Table } from 'react-bootstrap'
import { useHistory } from 'react-router'
import { setTokenSourceMapRange } from 'typescript'
import { checkLogin } from '../../../Services/checkLogin'
import { deletedata } from '../../../Services/DeleteData'
import { editLookUp, editLookUpValues, getLookUpList, getLookUpValues } from '../../../Services/lookup.services'
import Navigation from '../../Navigation/Navigation'
import AddLookUp from './AddLookUp'
import AddLookUpValues from './AddLookUpValues'

type lp = {
    id:number,
    name:string,
    description:string,
    createdby:string,
    createddate:Date|null,
    modifieddate:Date|null,  
    isActive:boolean
}

const LookUp:FunctionComponent = () => {

    const [lookup, setlookup] = useState<lp[]>([])
    const [addModalShow, setaddModalShow] = useState<boolean>(false)
    const [addvaluesModalShow, setaddValuesModalShow] = useState<boolean>(false)
    const [lookUpId, setLookUpId] = useState<number>(0)
    const [name,setName] = useState<string>('')
    const history = useHistory()

    useEffect(() =>{
        if(checkLogin()) {
            history.push("/")
        }
        else {
            lookUpList()
        }
    },[])

    const handleChange = (id:number) => {
        editLookUp(id).then((result)=>{lookUpList()},(error)=>alert('Failed'))
    }

    const lookUpList = async () => {
        setlookup(await getLookUpList())
    }

    const update = () => {
        setaddModalShow(false)
        setaddValuesModalShow(false)
        lookUpList()
    }
    
    const addModalClose = () => {
        setaddModalShow(false)
    }

    const addValueModalClose = () => {
        setaddValuesModalShow(false)
    }

    return (
        <div>
            <Navigation/>
            <div style={{marginTop: "20px"}}>
                <strong style={{fontSize:'25px'}}>Look Up</strong>
                <>
                    <button className="btn btn-primary" style={{marginLeft:'950px'}} onClick={()=>{
                        setaddModalShow(true)
                    }}>ADD</button>
                    {addModalShow && <AddLookUp show={addModalShow} onHide={addModalClose} update={update}/>}
                </>
                <Table className="mt-4" striped bordered>
                    <thead>
                        <tr>
                            <th></th>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Created By</th>
                            <th>Created Date</th>
                            <th>Values</th>
                            <th>isActive</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {lookup.length!==0&&lookup!==null?lookup.map(lu=>
                            <tr key={lu.id}>
                                <td><input type="checkbox" name="toggle" checked={lu.isActive} onChange={()=>{
                                    handleChange(lu.id)
                                }} /></td>
                                <td>{lu.id}</td>
                                <td>{lu.name}</td>
                                <td>{lu.description}</td>
                                <td>{lu.createdby}</td>
                                <td>{lu.createddate!==null?lu.createddate.toString().slice(0,10):""}</td>
                                <td>
                                    <button onClick={()=>{
                                        setLookUpId(lu.id)
                                        setName(lu.name)
                                        setaddValuesModalShow(true)
                                    }}>
                                        Add/Edit
                                    </button>
                                    {addvaluesModalShow && <AddLookUpValues show={addvaluesModalShow} onHide={addValueModalClose} id={lookUpId} update={update} name={name} />}
                                </td>
                                <td>{lu.isActive?"Yes":"No"}</td>
                                <td><button className="btn btn-danger" onClick={()=>{if (window.confirm('Are you sure you wish to delete?')) deletedata("lookup",lu.id).then((result)=>{update()},(error)=>alert('Failed'))}}>Delete</button></td>
                            </tr>    
                        ):null}
                    </tbody>
                </Table>
                {/* <ButtonToolbar>
                    <button className="btn btn-primary" onClick={()=>{
                        setaddModalShow(true)
                    }}>ADD</button>
                    {addModalShow && <AddLookUp show={addModalShow} onHide={addModalClose} update={update}/>}
                </ButtonToolbar> */}
            </div>
        </div>
    )
}

export default LookUp
