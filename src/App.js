
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from './components/NavBar';
import About from './components/About';
import Home from './components/Home';
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';
import Login from './components/Login';
import React, { useState } from 'react'
import SignUp from './components/SignUp';


function App() {
  const [alert, setAlert] = useState(null)
  function showAlert(message, type) {
    setAlert({
      msg: message,
      ty: type
    })

    setTimeout(() => {
      setAlert(null)
    }, 2000);
  }
  return (
    <>
      <NoteState>
        <BrowserRouter>
          <NavBar />
          <div className="container my-3" >
          <Alert alert={alert} />
        </div>
          <div className="container">
            <Routes>
              <Route exact path="/" element={<Home showAlert={showAlert}/>} />
              <Route exact path="/about" element={<About />} />
              <Route exact path="/login" element={<Login showAlert={showAlert}/>} />
              <Route exact path="/signup" element={<SignUp showAlert={showAlert}/>} />
            </Routes>
          </div>
        </BrowserRouter>
      </NoteState>

    </>
  );
}

export default App;
