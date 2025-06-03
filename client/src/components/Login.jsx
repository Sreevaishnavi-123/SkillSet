import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../App';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
      .then(res => res.json())
      .then(data => {
        if (data.token) {
          localStorage.setItem('token', data.token);
          setUser(data.user);
          navigate('/profile');
        } else {
          alert(data.message);
        }
      })
      .catch(err => console.error(err));
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-blue-600">Login</h2>
      <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
        <div className="space-y-6">
        <div>
  <label htmlFor="email" className="block text-gray-700 font-medium">
    Email
  </label>
  <input
    id="email"  
    type="email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    required
  />
</div>

          <div>
  <label htmlFor="password" className="block text-gray-700 font-medium">
    Password
  </label>
  <input
    id="password"
    type="password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    required
  />
</div>

          <button
            onClick={handleSubmit}
            className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;