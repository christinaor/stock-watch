import { toast } from 'react-toastify';
import { redirect } from 'react-router-dom';

export default function Logout({ setIsLoggedIn }) {
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
        setIsLoggedIn(false);

        toast.success('Logged out successfully');
        // Add any additional logic or redirection after logout if needed
      } else {
        // Handle the logout failure case
        toast.error('Logout failed');
      }
    } catch (error) {
      // Handle the logout error case
      toast.error('Logout error:', error.message);
    }
  };

  return (
    <button onClick={handleLogout} className="hero__text">Logout</button>
  )
}
