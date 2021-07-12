import { FunctionComponent, useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { checkLogin } from "../../Services/checkLogin"
import Navigation from "../Navigation/Navigation"
import { get} from "../../Services/GetData"
import { getUserDetails } from '../../Services/user.services'

type experiencedetail = {
    technology:string,
    startdate:Date|null,
    enddate:Date|null
}

type empObj = {
    EmployeeID:number,
    EmployeeName:string,
    Department:string,
    MailID:string,
    DOJ:Date,
    gender:string,
    hobby:[],
    primaryaddress:string,
    secondaryaddress: string,
    imgFile:string,
    experience:experiencedetail[]
}

const MyProfile: FunctionComponent = (() => {

    const history = useHistory()
    const [emp, setEmp] = useState<empObj>()

    useEffect(() => {
        if(checkLogin()){
            history.push("/")
        }
        else{
            Employee(JSON.parse(localStorage.getItem("data")||'{}').email)
        }
    }, [])
    
    const Employee = async (email:string) => {
        setEmp(await getUserDetails(email))
    }
    
    const getDifferenceInMonths = (sd:any, ed:any) => {
        const date1 = new Date(Date.parse(sd.toString()))
        const date2 = new Date(Date.parse(ed.toString()))
        const diffInMs = Math.abs(date2.getTime() - date1.getTime());
        return Math.round((diffInMs / (1000 * 60 * 60 * 24 * 30.5))*10)/10
    }

    const totalExperience = () => {
        let count = 0
        if(emp?.experience!==null)
        {
            emp?.experience.map((ex)=>{
                count += getDifferenceInMonths(ex.startdate,ex.enddate)
            })
        }
        return count
    }
    
    return (
        <div className="container">
            <Navigation/>
            <div className="row">
                <div className="col-md-12">
                    <img style={{width:"70px",height:"70px"}} src={emp?.imgFile}/>
                </div>
                <div className="col-md-12">
                    <strong>Name : </strong>
                    {emp?.EmployeeName}
                </div>
                <div className="col-md-12">
                    <strong>Mail : </strong>
                    {emp?.MailID}
                </div>
                <div className="col-md-12">
                    <strong>Date OF Joining : </strong>
                    {emp?.DOJ.toString().slice(0,10)}
                </div>
                <div className="col-md-12">
                    <strong>Gender : </strong>
                    {emp?.gender}
                </div>
                <div className="col-md-12">
                    <strong>Department : </strong>
                    {emp?.Department}
                </div>
                <div className="col-md-12">
                    <strong>Primary address : </strong>
                    {emp?.primaryaddress}
                </div>
                <div className="col-md-12">
                    <strong>Secondary address : </strong>
                    {emp?.secondaryaddress!==null?emp?.secondaryaddress:"N/A"}
                </div>
                <div className="col-md-12">
                    <strong>Hobby : </strong>
                    {emp?.hobby!==null?emp?.hobby:"N?A"}
                </div>
                <div className="col-md-12">
                    <strong>Experience : </strong>
                    {
                        <span>{totalExperience()!==0?`${totalExperience()}M`:"Fresher"}</span>
                    }
                    
                </div>
                <div className="col-md-12">
                    <button className="btn btn-primary" onClick={()=>{if(!localStorage.getItem("user-info"))
                        {
                            history.push("/")
                        }
                        else
                        {
                            history.push("/dashboard")
                        }
                    }}>Dashboard</button>
                </div>
            </div>
        </div>
    )
})

export default MyProfile
