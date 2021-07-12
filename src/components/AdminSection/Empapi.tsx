import { FunctionComponent, useState, useEffect } from 'react'
import {Table} from 'react-bootstrap'
import {Button, ButtonToolbar} from 'react-bootstrap'
import EditEmployee from './EditEmployee'
import AddEmployee from './AddEmployee'
import {Link, useHistory} from 'react-router-dom'
import Navigation from '../Navigation/Navigation'
import Pagination from '../Pagination/pagse'
import { checkLogin } from '../../Services/checkLogin'
import { get } from '../../Services/GetData'
import { deletedata } from '../../Services/DeleteData'
import { empObj, experiencedetail } from '../../Types/employeeType'


const Employee:FunctionComponent = () => {

    const [tempemps,setTempEmps] = useState<empObj[]>([])
    const [addModalShow, setaddModalShow] = useState<boolean>(false)
    const [editModalShow, seteditModalShow] = useState<boolean>(false)
    const [sort, setsort] = useState<string>("")
    const [search, setsearch] = useState<string>("")
    const [empid, setempid] = useState<number|string>("")
    const [empname, setempname] = useState<string>("")
    const [empdept, setempdept] = useState<string>("")
    const [empmailid, setempmailid] = useState<string>("")
    const [gender, setgender] = useState<string>("")
    const [hobby, sethobby] = useState<[]>([])
    const [address1, setaddress1] = useState<string>('')
    const [address2, setaddress2] = useState<string>('')
    const [empdoj, setempdoj] = useState<Date>(new Date())
    const [img, setimg] = useState<any>()
    const [experience, setexperience] = useState<experiencedetail[]>([])
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [itemsPerPage, setItemsPerPage] = useState<number>(2)
    const [totalItems, setTotalItems] = useState<number>()

    const history = useHistory()

    useEffect(()=>{
        if(checkLogin()) {
            history.push("/")
        }
        else {
            EmployeeList(itemsPerPage,currentPage,search,sort)
        }
    },[])

    const EmployeeList = (i:any,p:any,search:any,so:any) => {

        const parameters = new URLSearchParams({
            page:p,    
            items:i,
            search:search,
            order:so
        })

        get("employee",parameters).then(
            data => {
                setTempEmps(data.a)
                setTotalItems(data.count)
            }
        )

    }

    const deleteEmp = (empId: number) => {

        deletedata("employee",empId).then((result)=>{updateList()},(error)=>alert('Failed'))
        
    }

    const updateList = () => {
        setaddModalShow(false)
        seteditModalShow(false)
        EmployeeList(itemsPerPage,currentPage,search,sort)
    }

    const sortOrder = (so: string, sob: string) => {
        if(sob=="name")
        {
            if(so === 'nameasc')
            {
                EmployeeList(itemsPerPage,currentPage,search,"namedesc")
                setsort('namedesc')
            }
            else
            {
                EmployeeList(itemsPerPage,currentPage,search,"nameasc")
                setsort('nameasc')
            }
        }
        else
        {
            if(so === 'dateasc')
            {
                EmployeeList(itemsPerPage,currentPage,search,"datedesc")
                setsort('datedesc')
            }
            else
            {
                EmployeeList(itemsPerPage,currentPage,search,"dateasc")
                setsort('dateasc')
            }
        }
    }

    const handleSearch = () => {
        setCurrentPage(1)
        EmployeeList(itemsPerPage,currentPage,search,sort)
    }

    const paginate = (pageNumber:any) => {EmployeeList(itemsPerPage,pageNumber,search,sort)}

    let addModalClose = () => setaddModalShow(false)
    let editModalClose = () => seteditModalShow(false)

    return (
        <div>
            <Navigation/>
            <div style={{marginTop: "20px"}}>
                <div className="row">
                    <div className="col-md-12">
                        <div className="input-group rounded">
                                <input type="search" className="form-control rounded search-box" value={search} onChange={e=>setsearch(e.target.value)} placeholder="Search" aria-label="Search"
                                aria-describedby="search-addon" />
                                <span><button className="btn btn-primary" onClick={handleSearch}>Search</button></span>
                        </div>
                    </div>
                </div>
                <Table className="mt-4" striped bordered>
                    <thead>
                        <tr>
                            <th>EmployeeID</th>
                            <th><button onClick={()=>sortOrder(sort,"name")}>EmployeeName</button></th>
                            <th>Department</th>
                            <th>MailID</th>
                            <th><button onClick={()=>sortOrder(sort,"date")}>Date Of Joining</button></th>
                            <th>Gender</th>
                            <th>Show Info</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {tempemps.map(emp=>
                            <tr key={emp.EmployeeID}>
                                <td>{emp.EmployeeID}</td>
                                <td>{emp.EmployeeName}</td>
                                <td>{emp.Department}</td>
                                <td>{emp.MailID}</td>
                                <td>{emp.DOJ.toString().slice(0,10)}</td>
                                <td>{emp.gender}</td>
                                <td>
                                    <Link to={`/showdetail/${emp.EmployeeID}`}>show</Link>
                                </td>
                                <td>
                                <ButtonToolbar>
                                    <Button variant="info" onClick={()=>{
                                        seteditModalShow(true) 
                                        setempid(emp.EmployeeID)
                                        setempname(emp.EmployeeName)
                                        setempdept(emp.Department)
                                        setempmailid(emp.MailID)
                                        setempdoj(emp.DOJ)
                                        setgender(emp.gender)
                                        sethobby(emp.hobby)
                                        setaddress1(emp.primaryaddress)
                                        setaddress2(emp.secondaryaddress)
                                        setimg(emp.imgFile)
                                        setexperience(emp.experience)
                                    }}>
                                        Edit
                                    </Button>
                                    <EditEmployee show={editModalShow} updatelist={updateList} onHide={editModalClose} experience={experience} gender={gender} hobby={hobby} primaryaddress={address1} secondaryaddress={address2} empid={empid} empname={empname} empdept={empdept} empmailid={empmailid} imgFile={img} empdoj={empdoj}/>
                                </ButtonToolbar>
                                </td>
                                <td>
                                    <ButtonToolbar>
                                        <Button variant="danger" onClick={()=>{ if (window.confirm('Are you sure you wish to delete this item?')) deleteEmp(emp.EmployeeID)}}>
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
                        Add Employee
                    </Button>
                    <AddEmployee updatelist={updateList} show={addModalShow} onHide={addModalClose}/>
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

export default Employee



