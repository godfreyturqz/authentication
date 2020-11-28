import './App.css';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from './pages/Home';
import Authentication from './pages/Authentication';
import Navbar from './components/Navbar';
import Profile from './pages/Profile';
// state management
import React, {useContext, useEffect} from 'react'
import { SessionContext } from "./context";
import axios from "axios";

function App() {
  const [isUser, setIsUser] = useContext(SessionContext)

  useEffect( ()=> {
    axios.get('/requireAuth')
    .then(({data}) => {
        // data returns decodedtoken
        if(data.userId) setIsUser(true) 
    })
    .catch(error => console.log(error))
  }, [setIsUser])

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
            <Route path="/register" component={Authentication}/>
            <Route path="/login" component={Authentication}/>
          </>
        }
      </Switch>
    </BrowserRouter>
  );
}

export default App;
