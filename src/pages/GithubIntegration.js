import React, { useState } from 'react';
import axios from 'axios';
import SearchUser from '../components/SearchUser';
import RepoItem from '../components/RepoItem';

const GithubIntegration = () => {
  const [userData, setUserData] = useState(null);
  const [repos, setRepos] = useState([]);
  const [error, setError] = useState(null); // Added error state

  const handleUserSelect = async (username) => {
    try {
      const token = process.env.REACT_APP_GITHUB_TOKEN; // Ensure this is set in your .env file

      const userResponse = await axios.get(`https://api.github.com/users/${username}`, {
        headers: {
          Authorization: `token ${token}`,
        },
      });
      console.log("User data fetched:", userResponse.data); // Log fetched data
      setUserData(userResponse.data);

      const reposResponse = await axios.get(userResponse.data.repos_url, {
        headers: {
          Authorization: `token ${token}`,
        },
      });
      console.log("Repositories fetched:", reposResponse.data); // Log fetched data
      setRepos(reposResponse.data);
    } catch (error) {
      console.error('Error fetching user or repos:', error);
      setError("Failed to fetch user or repositories. Please try again."); // Set error state
    }
  };

  return (
    <div className="github-integration">
      <SearchUser onSelectUser={handleUserSelect} />
      {error && <p className="text-red-500">{error}</p>} {/* Display error message */}
      {userData && (
        <div className="user-info text-center mt-6">
          <h2 className="text-xl font-semibold">{userData.name}</h2>
          <p className="text-gray-700">{userData.bio}</p>
          <img src={userData.avatar_url} alt={userData.name} className="w-24 h-24 rounded-full mx-auto mt-4" />
        </div>
      )}
      {repos.length > 0 && (
        <div className="repos mt-6">
          <h2 className="text-xl font-semibold mb-4">Repositories</h2>
          <ul className="list-none p-0">
            {repos.map((repo) => (
              <RepoItem key={repo.id} repo={repo} username={userData.login} />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default GithubIntegration;
