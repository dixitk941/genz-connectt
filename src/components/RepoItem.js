import React from 'react';
import { Link } from 'react-router-dom';

const RepoItem = ({ repo, username }) => (
  <li className="flex justify-between items-center p-6 border-b border-green-600 bg-black hover:bg-green-600 transition-colors duration-300 rounded-lg shadow-md">
    <span className="text-green-500 hover:text-white text-lg font-semibold">
      {repo.name}
    </span>
    <Link
      to={`/repo/${username}/${repo.name}`}
      className="bg-green-500 text-black py-2 px-4 rounded-lg font-semibold hover:bg-green-600 hover:text-white transition-colors duration-300"
    >
      Open
    </Link>
  </li>
);

export default RepoItem;
