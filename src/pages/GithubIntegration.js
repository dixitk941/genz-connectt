import React, { useState } from 'react';
import axios from 'axios';
import SearchUser from '../components/SearchUser';
import RepoItem from '../components/RepoItem';

const GithubIntegration = () => {
  const [userData, setUserData] = useState(null);
  const [repos, setRepos] = useState([]);
  const [error, setError] = useState(null);

  const handleUserSelect = async (username) => {
    try {
      const token = process.env.REACT_APP_GITHUB_TOKEN;

      if (!token) {
        throw new Error("GitHub token is missing. Ensure it's set in the environment variables.");
      }

      const userResponse = await axios.get(`https://api.github.com/users/${username}`, {
        headers: {
          Authorization: `token ${token}`,
        },
      });
      setUserData(userResponse.data);

      const reposResponse = await axios.get(userResponse.data.repos_url, {
        headers: {
          Authorization: `token ${token}`,
        },
      });
      setRepos(reposResponse.data);
    } catch (error) {
      setError("Failed to fetch user or repositories. Please try again.");
    }
  };

  return (
    <div className="relative p-10 bg-gradient-to-r from-black via-gray-800 to-gray-900 text-white rounded-lg shadow-xl overflow-hidden transition-transform duration-500 hover:scale-105">
      {/* Glowing gradient behind the section */}
      <div className="absolute inset-0 bg-gradient-to-r from-green-400 via-purple-500 to-pink-500 opacity-20 blur-2xl z-0"></div>

      {/* Content starts */}
      <div className="relative z-10">
        <SearchUser onSelectUser={handleUserSelect} />
        {error && <p className="text-red-500 mt-4">{error}</p>}

        {userData && (
          <div className="user-info text-center mt-10">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 text-transparent bg-clip-text">
              {userData.name}
            </h2>
            <p className="text-gray-400 mt-2">{userData.bio}</p>
            <img
              src={userData.avatar_url}
              alt={userData.name}
              className="w-32 h-32 rounded-full mx-auto mt-6 border-4 border-green-400 shadow-lg transform transition-all hover:scale-110"
            />
          </div>
        )}

        {repos.length > 0 && (
          <div className="repos mt-12 text-center">
            <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 text-transparent bg-clip-text">
              Repositories
            </h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {repos.map((repo) => (
                <RepoItem key={repo.id} repo={repo} username={userData.login} />
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Abstract floating shapes */}
      <div className="absolute top-16 left-8 w-24 h-24 bg-purple-500 rounded-full opacity-30 blur-xl animate-pulse"></div>
      <div className="absolute bottom-10 right-16 w-32 h-32 bg-blue-500 rounded-full opacity-30 blur-2xl animate-pulse"></div>
    </div>
  );
};

export default GithubIntegration;
