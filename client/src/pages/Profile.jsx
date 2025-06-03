import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../App';
import { useNavigate } from 'react-router-dom';

function Profile() {
  const { user, setUser } = useContext(AuthContext);
  const [skills, setSkills] = useState([]);
  const [username, setUsername] = useState(user?.username || '');
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetch('http://localhost:5000/api/skills', {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
    })
      .then(res => res.json())
      .then(data => setSkills(data.filter(skill => skill.user._id === user.id)))
      .catch(err => console.error(err));
  }, [user, navigate]);

  const handleDelete = (id) => {
    fetch(`http://localhost:5000/api/skills/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
    })
      .then(() => setSkills(skills.filter(skill => skill._id !== id)))
      .catch(err => console.error(err));
  };

  const handleUpdateUsername = () => {
  fetch('http://localhost:5000/api/auth/update-username', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify({ username }),
  })
    .then(res => res.json())
    .then(data => {
      if (data.username) {
        setUser({ ...user, username: data.username });
        alert('Username updated!');
      } else {
        alert('Failed to update username.');
      }
    })
    .catch(err => {
      alert('Error updating username.');
      console.error(err);
    });
};
  if (!user) return null;

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-blue-600">Your Profile</h2>
      <div className="bg-white p-8 rounded-lg shadow-md max-w-2xl mx-auto">
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">User Details</h3>
          <p className="text-gray-700">Email: {user.email}</p>
          <div className="mt-2">
            <label htmlFor="username" className="block text-gray-700 font-medium">
              Username
            </label>
            <div className="flex items-center space-x-2">
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleUpdateUsername}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Update
              </button>
            </div>
          </div>
        </div>

        <h3 className="text-xl font-semibold mb-4">Your Skills</h3>
        {skills.length === 0 ? (
          <p className="text-gray-600">You haven't posted any skills yet.</p>
        ) : (
          <div className="space-y-4">
            {skills.map((skill) => (
              <div key={skill._id} className="bg-gray-50 p-4 rounded-lg shadow-sm">
                <h4 className="text-lg font-semibold text-blue-800">{skill.title}</h4>
                <p className="text-gray-600">{skill.description}</p>
                <button
                  onClick={() => handleDelete(skill._id)}
                  className="mt-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;