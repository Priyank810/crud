import {NavLink} from 'react-router-dom'
import {Navbar, Nav} from 'react-bootstrap'
import { FunctionComponent } from 'react'
import {connect} from 'react-redux'
import {useHistory} from 'react-router-dom'
import { logOutUser } from '../../redux/userlogin/userAction'

const Navigation:FunctionComponent = () => {
    
    const history = useHistory()

    const isadmin = JSON.parse(localStorage.getItem("data")||'{}').isadmin
    
    return (
        <Navbar bg="dark" expand="lg" style={{marginTop:'-30px'}}>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav>
                        {
                            isadmin?<NavLink className="d-inline p-2 bg-dark text-white" to="/employee">Employee</NavLink>:null
                        }  
                        {
                            isadmin?<NavLink className="d-inline p-2 bg-dark text-white" to="/department">Department</NavLink>:null
                        }
                        {
                            !isadmin?<NavLink className="d-inline p-2 bg-dark text-white" to="/dashboard">Dashboard</NavLink>:null
                        } 
                        {
                            !isadmin?<NavLink className="d-inline p-2 bg-dark text-white" to="/timesheet">TimeSheet</NavLink>:null
                        }  
                        {
                            !isadmin?<NavLink className="d-inline p-2 bg-dark text-white" to="/lookup">LookUp</NavLink>:null
                        }  
                        {/* {
                            !isadmin?<NavLink className="d-inline p-2 bg-dark text-white" to="/formbuilder">FormBuilder</NavLink>:null
                        } */}
                        {
                            !isadmin?<NavLink className="d-inline p-2 bg-dark text-white" to="/formcontrol">FormControl</NavLink>:null
                        }
                    </Nav>
                </Navbar.Collapse>
                {
                    !isadmin?<NavLink className="d-inline p-2 bg-dark text-white" to="/myprofile">MyProfile</NavLink>:null
                }
                <button className="d-inline p-2 bg-dark text-white" style={{alignContent:'right'}} onClick={logOutUser()}>Logout</button>
        </Navbar>
    )
}

const mapDispatchToProps = (dispatch:any) => {
    return {
        logOutUser : () => dispatch(logOutUser())
    }
}

export default connect(mapDispatchToProps)(Navigation)
