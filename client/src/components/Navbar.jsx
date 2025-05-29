import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../App';

function Navbar() {
  const { user, setUser } = useContext(AuthContext);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

  return (
    <nav className="bg-blue-600 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-2xl font-bold">SkillSwap</Link>
        <div className="space-x-4">
          <Link to="/" className="text-white hover:text-gray-200">Home</Link>
          <Link to="/skills" className="text-white hover:text-gray-200">Skills</Link>
          {user ? (
            <>
              <Link to="/add-skill" className="text-white hover:text-gray-200">Add Skill</Link>
              <Link to="/profile" className="text-white hover:text-gray-200">Profile</Link>
              <button onClick={handleLogout} className="text-white hover:text-gray-200">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-white hover:text-gray-200">Login</Link>
              <Link to="/signup" className="text-white hover:text-gray-200">Signup</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;