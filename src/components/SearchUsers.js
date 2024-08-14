// src/components/SearchUsers.js
import React, { useState } from 'react';
import axios from 'axios';

const SearchUsers = () => {
  const [query, setQuery] = useState('');
  const [users, setUsers] = useState([]);

  const handleSearch = async () => {
    const token = localStorage.getItem('github_token');
    const response = await axios.get(`https://api.github.com/search/users?q=${query}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setUsers(response.data.items);
  };

  return (
    <div>
      <h2>Search GitHub Users</h2>
      <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Enter username" />
      <button onClick={handleSearch} className="btn btn-secondary">Search</button>

      {users.length > 0 && (
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              <a href={user.html_url} target="_blank" rel="noopener noreferrer">
                {user.login}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchUsers;
