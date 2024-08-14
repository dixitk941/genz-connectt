import React, { useEffect } from 'react';
import axios from 'axios';

const GitHubOAuth = () => {
  const handleLogin = () => {
    const clientId = process.env.REACT_APP_GITHUB_CLIENT_ID;
    if (!clientId) {
      console.error('GitHub Client ID is missing. Please set it in the .env file.');
      return;
    }

    const redirectUri = 'http://localhost:3000/callback'; // Replace with your redirect URI
    window.location.href = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=repo,user`;
  };

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('github_token');
      if (!token) {
        console.error('GitHub token is missing. Please log in.');
        return;
      }

      try {
        const response = await axios.get('https://api.github.com/user', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response.data);
      } catch (error) {
        if (error.response) {
          // Server responded with a status other than 200 range
          console.error('Error response:', error.response.data);
        } else if (error.request) {
          // Request was made but no response received
          console.error('Error request:', error.request);
        } else {
          // Something else happened while setting up the request
          console.error('Error message:', error.message);
        }
      }
    };

    fetchData();
  }, []);

  return (
    <button onClick={handleLogin} className="btn btn-primary">
      Login with GitHub
    </button>
  );
};

export default GitHubOAuth;