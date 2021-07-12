import './App.css';
import {Route, Router, Switch} from 'react-router-dom'
import {Provider} from 'react-redux'
import {store} from './redux/store'
import history from "./redux/history" 
import MyProfile from './components/UserSection/MyProfile';
import Dashboard from './components/UserSection/Dashboard';
import TimeSheet from './components/UserSection/TimeSheet';
import Employee from './components/AdminSection/Empapi';
import Department from './components/AdminSection/Depapi';
import ShowDetail from './components/AdminSection/ShowDetail';
import Login from './components/Authentication/Login';
import Register from './components/Authentication/Register';
import LookUp from './components/Mercy/LookUp/LookUp';
import FormControls from './components/Mercy/FormBuilder/FormControls';
import PreviewForm from './components/Mercy/FormBuilder/PreviewForm';


function App() {

  return (
    <Provider store = {store}>
      <Router history={history}>
        <div className="">
          <h3 className="m-3 d-flex justify-content-center"></h3>
          <Switch>
            <Route path="/" component={Login} exact/>
            <Route path="/signup" component={Register}/>
            <Route path="/employee" component={Employee} exact/>
            <Route path="/department" component={Department}/>
            <Route path="/showdetail/:id" component={ShowDetail}/>
            <Route path="/dashboard" component={Dashboard}/>
            <Route path="/myprofile" component={MyProfile}/>
            <Route path="/timesheet" component={TimeSheet}/>
            <Route path="/lookup" component={LookUp}/>
            <Route path="/formcontrol" component={FormControls}/>
            <Route path="/preview" component={PreviewForm}/>
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;

