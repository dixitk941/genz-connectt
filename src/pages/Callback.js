// src/pages/Callback.js
import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Callback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchToken = async () => {
      const code = new URLSearchParams(window.location.search).get('code');
      const response = await axios.post(`https://github.com/login/oauth/access_token`, {
        client_id: process.env.REACT_APP_GITHUB_CLIENT_ID,
        client_secret: process.env.REACT_APP_GITHUB_CLIENT_SECRET,
        code,
      }, {
        headers: {
          Accept: 'application/json',
        },
      });

      const { access_token } = response.data;
      localStorage.setItem('github_token', access_token);
      navigate('/');
    };

    fetchToken();
  }, [navigate]);

  return <div>Loading...</div>;
};

export default Callback;
