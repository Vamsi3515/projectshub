import React, { useState } from 'react'
import { Button } from '@mui/material'
import {API_URL} from '../../ApiRoutes/ApiRoute'

const VendorRegister = () => {

  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(true);

  const handleSubmit = async(event) => {
    event.preventDefault();
    try {
      const response = await fetch(`${API_URL}/vendor/register`, {
        method:'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({username, email, password})
      });
      const data = await response.json();
      console.log(data);
      if(response.ok){
        alert("Registered Successfully");
        setUserName("")
        setEmail("")
        setPassword("")
      }else{
        alert("Registration unsuccesful")
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong")
    }
  };

  return (
    <div className="vendorRegisterForm">
        <h3>REGISTER</h3>
        <form onSubmit={handleSubmit}>
        <div>
            <input type='text' value={username} onChange={(e) => setUserName(e.target.value)} name='username' placeholder='username' required />
            <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} name='email' placeholder='email' required />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} name='password' placeholder='password' required />
        </div>
        <Button type='submit' variant="contained" size="medium" style={{ backgroundColor: "red" }}>
        Register
        </Button>
        </form>
    </div>
  )
}

export default VendorRegister