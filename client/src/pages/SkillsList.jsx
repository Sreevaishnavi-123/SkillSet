import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../App';

function SkillsList() {
  const [skills, setSkills] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetch('http://localhost:5000/api/skills', {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
    })
      .then(res => res.json())
      .then(data => setSkills(data))
      .catch(err => console.error(err));
  }, []);

  const handleDelete = (id) => {
    fetch(`http://localhost:5000/api/skills/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
    })
      .then(() => setSkills(skills.filter(skill => skill._id !== id)))
      .catch(err => console.error(err));
  };

return (
  <div className="container mx-auto p-6">
    <h2 className="text-3xl font-bold mb-6 text-blue-600">Available Skills</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.isArray(skills) && skills.length > 0 ? (
        skills.map(skill => (
          <div key={skill._id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-blue-800">{skill.title}</h3>
            <p className="text-gray-600 mt-2">{skill.description}</p>
            <p className="text-sm text-gray-500 mt-1">
              Posted by: {skill.user?.username || "Unknown User"}
            </p>
            {user && skill.user?._id === user.id && (
              <button
                onClick={() => handleDelete(skill._id)}
                className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Delete
              </button>
            )}
          </div>
        ))
      ) : (
        <p className="col-span-3 text-center text-gray-500">No skills found or you are not authorized.</p>
      )}
    </div>
  </div>
);

}

export default SkillsList;