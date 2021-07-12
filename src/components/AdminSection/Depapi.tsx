import  { FunctionComponent, useState, useEffect } from 'react'
import {Table} from 'react-bootstrap'
import {Button, ButtonToolbar} from 'react-bootstrap'
import AddDepartment from './AddDepartment'
import EditDepartment from './EditDepartment'
import {useHistory} from 'react-router-dom'
import Navigation from '../Navigation/Navigation'
import Pagination from '../Pagination/pagse'
import { checkLogin } from '../../Services/checkLogin'
import { get } from '../../Services/GetData'
import { deletedata } from '../../Services/DeleteData'
import { obj } from '../../Types/departmentType'


const Department:FunctionComponent = () => {

    const [tempdeps, setTempDeps] = useState<obj[]>([])
    const [addModalShow, setaddModalShow] = useState<boolean>(false)
    const [editModalShow, seteditModalShow] = useState<boolean>(false)
    const [sort, setsort] = useState<string>("asc")
    const [search, setsearch] = useState<string>("")
    const [depId, setdepId] = useState<number|string>("")
    const [depName, setdepName] = useState<string>("")
    const history = useHistory()
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [itemsPerPage, setItemsPerPage] = useState<number>(2)
    const [totalItems, setTotalItems] = useState<number>()

    useEffect(()=>{
        if(checkLogin()) {
            history.push("/")
        }
        else {
            DepartmentList(itemsPerPage,currentPage,search)
        }
    },[])

    const DepartmentList = (i:any,p:any,search:any) => {

        const parameters = new URLSearchParams({
            p:p,    
            i:i,
            search:search
        })

        get("department",parameters).then(
            data => {
                setTempDeps(data.getdata)
                setTotalItems(data.count)
            }
        )

    }

    const updateList = () => {
        setaddModalShow(false)
        seteditModalShow(false)
        DepartmentList(itemsPerPage,currentPage,search)
    }

    const deleteDep = (depId:number) => {

        deletedata("department",depId).then((result)=>{DepartmentList(itemsPerPage,currentPage,search)},(error)=>alert('Failed'))

    }

    const desCompareName = (a: { DepartmentName: string }, b: { DepartmentName: string }) => {

        const name1 = a.DepartmentName.toUpperCase();
        const name2 = b.DepartmentName.toUpperCase();
    
        let comparison = 0;
    
        if (name1 < name2) {
            comparison = 1;
        } else if (name1 > name2) {
            comparison = -1;
        }
        return comparison;
    }

    const asCompareName = (a: { DepartmentName: string }, b: { DepartmentName: string }) => {

        const name1 = a.DepartmentName.toUpperCase();
        const name2 = b.DepartmentName.toUpperCase();
    
        let comparison = 0;
    
        if (name1 > name2) {
            comparison = 1;
        } else if (name1 < name2) {
            comparison = -1;
        }
        return comparison;
    }

    const sortOrder = (so: string) => {
        if(so === 'asc')
        {
            setTempDeps(tempdeps.sort(desCompareName))
            setsort('desc')
        }
        else
        {
            setTempDeps(tempdeps.sort(asCompareName))
            setsort('asc')
        }
    }

    const handleSearch = () => {
        setCurrentPage(1)
        DepartmentList(itemsPerPage,currentPage,search)
    }

    const paginate = (pageNumber:any) => {DepartmentList(itemsPerPage,pageNumber,search)}
    

    let addModalClose = () => setaddModalShow(false)
    let editModalClose = () => seteditModalShow(false)

    return (
        <div>
            <Navigation/>
            <div style={{marginTop: "20px"}}>
            <div>
                <div className="input-group rounded">
                        <input type="search" className="form-control rounded search-box" value={search} onChange={e=>setsearch(e.target.value)} placeholder="Search" aria-label="Search"
                        aria-describedby="search-addon" />
                    <span><button className="btn btn-primary" onClick={handleSearch}>Search</button></span>
                </div>
            </div>
            <Table className="mt-4" striped bordered size="sm">
                <thead>
                    <tr>
                        <th>DepartmentID</th>
                        <th><button onClick={()=>sortOrder(sort)}>DepartmentName {sort}</button></th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {tempdeps.map(dep=>
                        <tr key={dep.DeparmentID}>
                            <td>{dep.DeparmentID}</td>
                            <td>{dep.DepartmentName}</td>
                            <td>
                            <ButtonToolbar>
                                <Button variant="info" onClick={()=>{
                                    seteditModalShow(true)
                                    setdepId(dep.DeparmentID)
                                    setdepName(dep.DepartmentName)
                                }}>
                                    Edit
                                </Button>
                                <EditDepartment deps={tempdeps} updatelist={updateList} show={editModalShow} onHide={editModalClose} depId={depId} depName={depName}/>
                            </ButtonToolbar>
                            </td>
                            <td>
                                <ButtonToolbar>
                                    <Button variant="danger" onClick={()=>deleteDep(dep.DeparmentID)}>
                                        Delete
                                    </Button>
                                </ButtonToolbar>
                            </td>
                        </tr>    
                    )}
                </tbody>
            </Table>
            <ButtonToolbar>
                <Button variant="primary" onClick={()=>setaddModalShow(true)}>
                    Add Deparment
                </Button>
                <AddDepartment deps={tempdeps} updatelist={updateList} show={addModalShow} onHide={addModalClose}/>
            </ButtonToolbar>
            </div>
            <div className="row" style={{marginTop: "50px",marginLeft:"39%"}}>
                <div className="col">
                    <Pagination itemsPerPage={itemsPerPage} totalItems={totalItems} paginate={paginate} />
                </div>
            </div>
        </div>
    )
}

export default Department
