import React from 'react';
import { BrowserRouter ,Routes,Route} from 'react-router-dom'
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import  Login  from './components/Login/Login';
import Register from './components/Register/Register';
import Appointment from './components/Appointments/appointment'
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes >
            <Route path="/" element={<App />}/>
            <Route path="/loginpatient" element={<Login/>}/>
            <Route  path="/register" element={<Register/>}/>
            <Route  path="/appointment" element={<Appointment/>}/>
			</Routes>
      
    </BrowserRouter>
  </React.StrictMode>
);
