import React, { useState } from 'react';
import axios from 'axios';

const SearchUser = ({ onSelectUser }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`https://api.github.com/search/users?q=${searchQuery}`);
      setUsers(response.data.items);
    } catch (error) {
      console.error('Error searching users:', error);
      setError('Failed to fetch users. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div className="search-user p-4 bg-black min-h-screen flex flex-col items-center text-center">
      <h1 className="text-3xl font-bold text-green-500 mb-6">Search GitHub Users</h1>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Type a GitHub username..."
        className="w-full max-w-md p-3 border border-green-500 rounded-lg text-green-500 bg-black placeholder-green-500 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300 mb-4"
      />
      <button
        onClick={handleSearch}
        disabled={!searchQuery}
        className={`bg-green-500 text-black py-2 px-6 rounded-lg font-bold transition-transform duration-300 ${
          !searchQuery ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-700 hover:scale-105'
        }`}
      >
        {loading ? 'Searching...' : 'Search'}
      </button>
      
      {error && <p className="text-red-500 mt-4">{error}</p>}
      
      {users.length > 0 && (
        <ul className="w-full max-w-md mt-6 bg-gray-800 p-4 rounded-lg shadow-lg space-y-3 overflow-y-auto max-h-96">
          {users.map((user) => (
            <li
              key={user.id}
              onClick={() => onSelectUser(user.login)}
              className="cursor-pointer p-3 rounded-lg bg-gray-700 hover:bg-green-500 hover:text-black transition-colors duration-300 text-green-500 font-semibold flex justify-between items-center"
            >
              <span>{user.login}</span>
              <img src={user.avatar_url} alt={user.login} className="w-8 h-8 rounded-full" />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchUser;
