import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchRepos } from '../utils/githubApi';

const GithubRepoList = () => {
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    const loadRepos = async () => {
      const reposData = await fetchRepos();
      setRepos(reposData);
    };
    loadRepos();
  }, []);

  return (
    <div className="bg-black p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-extrabold text-green-500 mb-6">Repositories</h2>
      <ul className="list-none space-y-4">
        {repos.map(repo => (
          <li key={repo.id} className="flex justify-between items-center p-4 border border-green-600 rounded-lg bg-gray-800 hover:bg-green-600 transition-colors duration-300">
            <Link 
              to={`/repo/${repo.owner.login}/${repo.name}`} 
              className="text-green-500 hover:text-white text-lg font-semibold"
            >
              {repo.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GithubRepoList;
