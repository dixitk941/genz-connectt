import React, { useState } from 'react';
import axios from 'axios';

const SearchUser = ({ onSelectUser }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [users, setUsers] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`https://api.github.com/search/users?q=${searchQuery}`);
      setUsers(response.data.items);
    } catch (error) {
      console.error('Error searching users:', error);
    }
  };

  return (
    <div className="search-user p-4 bg-black min-h-screen flex flex-col items-center">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search GitHub users"
        className="border border-green-500 p-2 rounded text-green-500 bg-black placeholder-green-500 mb-4"
      />
      <button onClick={handleSearch} className="bg-green-500 text-black p-2 rounded mb-4">
        Search
      </button>
      <ul className="w-full max-w-md flex-grow overflow-y-auto">
        {users.map((user) => (
          <li
            key={user.id}
            onClick={() => onSelectUser(user.login)}
            className="cursor-pointer p-2 border-b border-green-500 hover:bg-green-500 hover:text-black text-green-500"
          >
            <span>{user.login}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchUser;