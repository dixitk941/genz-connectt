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
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Repositories</h2>
      <ul className="list-none">
        {repos.map(repo => (
          <li key={repo.id} className="border-b p-4">
            <Link to={`/repo/${repo.owner.login}/${repo.name}`}>
              {repo.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GithubRepoList;
