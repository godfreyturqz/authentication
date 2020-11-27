import './App.css';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import Profile from './pages/Profile';
// state management
import React, {useContext, useEffect} from 'react'
import { SessionContext } from "./context";
import axios from 'axios';

function App() {
  const [isUser, setIsUser] = useContext(SessionContext)

  useEffect( ()=> {
    axios.get('/requireAuth')
    .then(({data}) => {
        // data returns decodedtoken
        if(data.userId) setIsUser(true) 
    })
    .catch(error => console.log(error))
  }, [])

  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route path="/" component={Home} exact/>
        {
          isUser ? 
            <Route path="/profile" component={Profile}/>
          :
          <>
            <Route path="/register" component={Register}/>
            <Route path="/login" component={Login}/>
          </>
        }
      </Switch>
    </BrowserRouter>
  );
}

export default App;
