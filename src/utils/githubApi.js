import axios from 'axios';

const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;
const config = {
  headers: {
    Authorization: `token ${GITHUB_TOKEN}`,
  },
};

export const fetchRepos = async () => {
  const response = await axios.get('https://api.github.com/user/repos', config);
  return response.data;
};

export const fetchRepoContents = async (username, repoName) => {
  const response = await axios.get(`https://api.github.com/repos/${username}/${repoName}/contents`, config);
  return response.data;
};

export const fetchFileContent = async (username, repoName, filePath) => {
  const response = await axios.get(`https://api.github.com/repos/${username}/${repoName}/contents/${filePath}`, config);
  const content = response.data.content;
  return atob(content);  // Decode from base64
};
