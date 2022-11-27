import React, {useEffect} from 'react'
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import TopComponent from "./components/TopComponent";
import Landing from './views/Landing';
import Login from './views/Login';
import Register from './views/Register';
import AddProperty from './views/AddProperty';
import AllProperties from './views/AllProperties';
import MyProperties from './views/MyProperties';
import EditListing from './views/EditListing';
import BookProp from './views/BookProp';
import {useStateValue} from './StateProvider';
import MyBooking from './views/MyBooking';

function App() {
  const [{user}, dispatch] = useStateValue();

  return (
    <Router>
      
      <TopComponent user={user} dispatch={dispatch}/>
      <Routes>
        <Route path="/" element={<Landing user={user} dispatch={dispatch} />}>
        </Route>
        <Route path="/login" element={<Login />}>
        </Route>
        <Route path="/register" element={<Register dispatch={dispatch} />}>
        </Route>
        <Route path="/book" element={<BookProp />}>
        </Route>
        <Route path="/addListing" element={<AddProperty />}>
        </Route>
        <Route path="/properties" element={<AllProperties />}>
        </Route>
        <Route path="/myProperties" element={<MyProperties />}>
        </Route>
        <Route path="/myBooking" element={<MyBooking />}>
        </Route>
        <Route path="/editListing" element={<EditListing />}>
        </Route>
        
        
      </Routes>
    </Router>
  );
}

export default App;
