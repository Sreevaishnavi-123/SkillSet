import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="bg-gradient-to-b from-blue-100 to-gray-100">
      {/* Hero Section */}
      <div className="relative bg-blue-600 text-white py-20">
        <div className="container mx-auto flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 p-6">
            <h1 className="text-5xl font-bold mb-4">Discover & Share Skills</h1>
            <p className="text-lg mb-6">Join SkillSwap to learn new skills or teach others what you know. Connect with a vibrant community!</p>
            <Link to="/signup" className="bg-yellow-400 text-blue-800 px-6 py-3 rounded-full font-semibold hover:bg-yellow-500">
              Get Started
            </Link>
          </div>
          
        </div>
      </div>
      {/* Features Section */}
      <div className="container mx-auto py-12">
        <h2 className="text-3xl font-bold text-center mb-8">Why SkillSwap?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h3 className="text-xl font-semibold mb-2">Learn New Skills</h3>
            <p className="text-gray-600">Explore a variety of skills from experts in our community.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h3 className="text-xl font-semibold mb-2">Teach Others</h3>
            <p className="text-gray-600">Share your expertise and help others grow.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h3 className="text-xl font-semibold mb-2">Connect</h3>
            <p className="text-gray-600">Build relationships with like-minded learners and teachers.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;