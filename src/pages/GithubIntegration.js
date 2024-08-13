import React, { useState } from 'react';
import axios from 'axios';

const GithubIntegration = () => {
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState(null);
  const [repos, setRepos] = useState([]);
  const [error, setError] = useState(null);

  const fetchGithubUser = async () => {
    try {
      const response = await axios.get(`https://api.github.com/users/${username}`, {
        headers: {
          Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`
        }
      });
      setUserData(response.data);
      setError(null);
      fetchUserRepos();
    } catch (err) {
      console.error('Error fetching user:', err);
      setError('User not found');
      setUserData(null);
      setRepos([]);
    }
  };

  const fetchUserRepos = async () => {
    try {
      const response = await axios.get(`https://api.github.com/users/${username}/repos`, {
        headers: {
          Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`
        }
      });
      setRepos(response.data);
    } catch (err) {
      console.error('Error fetching repositories:', err);
      setError('Failed to fetch repositories');
      setRepos([]);
    }
  };

  const getFileSha = async (repoName, filePath) => {
    try {
      const response = await axios.get(`https://api.github.com/repos/${username}/${repoName}/contents/${filePath}`, {
        headers: {
          Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`
        }
      });
      return response.data.sha;
    } catch (err) {
      console.error('Failed to fetch file SHA:', err);
      return null;
    }
  };

  const editRepoFile = async (repoName, filePath, content) => {
    const fileSha = await getFileSha(repoName, filePath);
    if (!fileSha) {
      console.error('Cannot edit file without SHA');
      return;
    }

    try {
      const response = await axios.put(
        `https://api.github.com/repos/${username}/${repoName}/contents/${filePath}`,
        {
          message: 'Edit file via GitHub API',
          content: btoa(content),
          sha: fileSha
        },
        {
          headers: {
            Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`
          }
        }
      );
      console.log('File edited successfully:', response.data);
    } catch (err) {
      console.error('Failed to edit file:', err);
    }
  };

  const forkRepo = async (repoName) => {
    try {
      const response = await axios.post(
        `https://api.github.com/repos/${username}/${repoName}/forks`,
        {},
        {
          headers: {
            Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`
          }
        }
      );
      console.log('Repository forked successfully:', response.data);
    } catch (err) {
      console.error('Failed to fork repository:', err);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 font-sans">
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">GitHub User Lookup</h1>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter GitHub username"
        className="w-full p-2 border border-gray-300 rounded mb-4"
      />
      <button
        onClick={fetchGithubUser}
        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 mb-4"
      >
        Fetch User
      </button>
      {error && <p className="text-red-500">{error}</p>}
      {userData && (
        <div className="user-info text-center">
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
              <li key={repo.id} className="p-4 border-b border-gray-300 flex justify-between items-center">
                {repo.name}
                <div>
                  <button
                    onClick={() => forkRepo(repo.name)}
                    className="bg-green-500 text-white py-1 px-3 rounded hover:bg-green-600 mr-2"
                  >
                    Fork
                  </button>
                  <button
                    onClick={() => editRepoFile(repo.name, 'README.md', 'New content')}
                    className="bg-yellow-500 text-white py-1 px-3 rounded hover:bg-yellow-600"
                  >
                    Edit README
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default GithubIntegration;