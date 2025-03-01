import React, { useState } from 'react'
import '../../../App.css'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { API_URL } from '../../ApiRoutes/ApiRoute';

const VendorLogin = ({handleAuthButtons}) => {

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/vendor/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({username, password})
      });
      const data = await response.json();
      console.log(data);
      if(response.ok){
        localStorage.setItem('loginToken', data.token);
        alert("Login Sucessful");
        handleAuthButtons();
      }else{
        alert("Invalid Creditinals");
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };

  return (
    <div className="vendorLoginForm">
        <h3>LOGIN</h3>
        <form onSubmit={handleSubmit}>
          <div>
              <input type='text' value={username} onChange={(e) => setUsername(e.target.value)} name='username' placeholder='username' required />
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} name='password' placeholder='password' required />
          </div>
          <Button type='submit' variant="contained" size="medium" style={{ backgroundColor: "red"}}>
          Login
          </Button>
        </form>
    </div>
  )
}

export default VendorLogin