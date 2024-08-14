// src/components/CreateRepo.js
import React, { useState } from 'react';
import axios from 'axios';

const CreateRepo = () => {
  const [repoName, setRepoName] = useState('');
  const [repoDesc, setRepoDesc] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);

  const handleCreateRepo = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    const token = localStorage.getItem('github_token');
    if (!token) {
      alert('GitHub token is missing. Please log in.');
      return;
    }

    try {
      const response = await axios.post('https://api.github.com/user/repos', {
        name: repoName,
        description: repoDesc,
        private: isPrivate,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 201) {
        alert('Repository created successfully!');
      } else {
        alert('Failed to create repository.');
      }
    } catch (error) {
      console.error('Error creating repository:', error);
      alert('An error occurred while creating the repository.');
    }
  };

  return (
    <form onSubmit={handleCreateRepo}>
      <div>
        <label>Repository Name:</label>
        <input
          type="text"
          value={repoName}
          onChange={(e) => setRepoName(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Description:</label>
        <input
          type="text"
          value={repoDesc}
          onChange={(e) => setRepoDesc(e.target.value)}
        />
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            checked={isPrivate}
            onChange={(e) => setIsPrivate(e.target.checked)}
          />
          Private
        </label>
      </div>
      <button type="submit">Create Repository</button>
    </form>
  );
};

export default CreateRepo;