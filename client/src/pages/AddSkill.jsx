import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../App';

function AddSkill() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!user) {
    navigate('/login');
    return null;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:5000/api/skills', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({ title, description, user: user.id }),
    })
      .then(() => navigate('/skills'))
      .catch(err => console.error(err));
  };
 return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-blue-600">Add a New Skill</h2>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md space-y-6">
        <div>
          <label htmlFor="skillTitle" className="block text-gray-700 font-medium">Skill Title</label>
          <input
            id="skillTitle"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label htmlFor="skillDescription" className="block text-gray-700 font-medium">Description</label>
          <textarea
            id="skillDescription"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="4"
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition"
        >
          Add Skill
        </button>
      </form>
    </div>
  );
}

export default AddSkill;