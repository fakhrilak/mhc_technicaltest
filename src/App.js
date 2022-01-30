import React,{useEffect, useState} from "react"
import Wrapper from "./components/wrapper/Wrapper";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import { API, config, setAuthToken } from "./config/API"
import CreateEvent from "./pages/CreateEvent/CreateEvent";
import Documentasion from "./pages/Documentasions/Documentasion.js";
function App() {
  const [auth,setAuth] = useState(false)
  const [user,SetUser] = useState({})
  useEffect(()=>{
    if (localStorage.token) {
      setAuthToken(localStorage.getItem('token'));
      API.get("/auth",config)
      .then((res)=>{
        if(res.data.auth == false){
          localStorage.removeItem("token")
          window.location.reload()
        }else{
          console.log(auth)
          setAuth(res.data.auth)
          SetUser(res.data.data)
        }
      })
      .catch((err)=>{
        alert(err.response.data.message)
      })
    }
  },[])
  return (
    <div>
      <Router>
          <div>
            <Navbar auth={auth} setAuth={setAuth} user={user}/>
          </div>
            <Switch>
                <Route exact path="/">
                    <Home auth={auth} user={user}/>
                </Route>
                <Route exact path="/login">
                    <Login/>
                </Route>
                <Route exact path="/create-event">
                    <CreateEvent/>
                </Route>
                <Route exact path="/doc" component={Documentasion}/>
            </Switch>
      </Router>
    </div>
      
  );
}

export default App;
