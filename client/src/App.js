import {BrowserRouter, Routes, Route} from "react-router-dom"
import Home from './pages/home/Home'
import List from './pages/list/List'
import Hotel from './pages/hotel/Hotel'
import Login from "./pages/login/Login";
import { AuthContext } from "./context/AuthContext";
import React, { useContext } from "react";

function App() {
 const {user} = useContext(AuthContext);

  return (
    <BrowserRouter>
     <Routes>
       <Route path='/' element={<Home />}></Route>
       <Route path='/hotels' element={<List />}></Route>
       <Route path='/hotels/:id' element={<Hotel />}></Route>
       <Route path='/login' element={!user ? <Login /> : <Home />} >
         
       </Route>
     </Routes>
    </BrowserRouter>
  );
}

export default App;
