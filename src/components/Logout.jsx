import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { redirect } from 'react-router-dom';

function Logout() {
    
    const[username,setUsername] = useState()
    const user = JSON.parse(localStorage.getItem('user'))
    

 
  
    const handleLogout = async () => {
        const url = import.meta.env.VITE_API_URL;
        try {
          // Make a fetch request to the logout route
          const response = await fetch(`${url}/logout/`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
          });
      
          if (response.ok) {
            // Remove the user from local storage
            localStorage.removeItem('user');
            console.log('Logged out'); 
            toast.success('Logged out successfully');
            redirect('/')
          } else {
            console.log('Logout failed');
            toast.error('Logout failed');
            // Handle the logout failure case
          }
        } catch (error) {
          console.error('Logout error:', error.message);
          toast.error('Logout error:', error.message);
          // Handle the logout error case
        }
      };
  return (
    <div>
        { user ?
        (<button onClick={handleLogout} className="hero__text">Logout</button>)
        : ''
}
    </div>
  )
}

export default Logout