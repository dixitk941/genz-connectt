import React from 'react';
import { Link } from 'react-router-dom';

const RepoItem = ({ repo, username }) => (
  <li className="p-4 border-b border-green-500 flex justify-between items-center bg-black hover:bg-green-500 transition-colors duration-300">
    <span className="text-green-500 hover:text-black">{repo.name}</span>
    <Link
      to={`/repo/${username}/${repo.name}`}
      className="bg-green-500 text-black py-1 px-3 rounded hover:bg-green-600 hover:text-white transition-colors duration-300"
    >
      Open
    </Link>
  </li>
);

export default RepoItem;
