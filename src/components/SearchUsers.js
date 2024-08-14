import React, { useState } from 'react';
import axios from 'axios';

const SearchUsers = () => {
  const [query, setQuery] = useState('');
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null); // Added error state

  const handleSearch = async () => {
    try {
      const token = process.env.REACT_APP_GITHUB_TOKEN;

      if (!token) {
        throw new Error("GitHub token is missing. Ensure it's set in the environment variables.");
      }

      const response = await axios.get(`https://api.github.com/search/users?q=${query}`, {
        headers: {
          Authorization: `token ${token}`,
        },
      });

      setUsers(response.data.items);
      setError(null); // Clear error if the request is successful
    } catch (error) {
      console.error('Error searching users:', error);
      setError("Failed to search users. Please try again."); // Set error state
    }
  };

  return (
    <div>
      <h2>Search GitHub Users</h2>
      <input 
        type="text" 
        value={query} 
        onChange={(e) => setQuery(e.target.value)} 
        placeholder="Enter username" 
        className="input" // Add any necessary classes here
      />
      <button onClick={handleSearch} className="btn btn-secondary">Search</button>

      {error && <p className="text-red-500">{error}</p>} {/* Display error message */}

      {users.length > 0 && (
        <ul className="list-none p-0 mt-4">
          {users.map((user) => (
            <li key={user.id} className="mb-2">
              <a href={user.html_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
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
