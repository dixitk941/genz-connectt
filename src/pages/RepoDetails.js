import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const RepoDetails = () => {
  const { username, repoName } = useParams();
  const [repoContent, setRepoContent] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileContent, setFileContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRepoContent = async () => {
      try {
        // Fetch the token from the environment variable
        const token = process.env.REACT_APP_GITHUB_TOKEN;

        if (!token) {
          throw new Error('GitHub token is not set in environment variables.');
        }

        const response = await fetch(`https://api.github.com/repos/${username}/${repoName}/contents`, {
          headers: {
            Authorization: `token ${token}`
          }
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        setRepoContent(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRepoContent();
  }, [username, repoName]);

  const handleFileClick = async (file) => {
    setSelectedFile(file);
    setLoading(true);
    setError(null); // Reset error state before new request
    try {
      const response = await fetch(file.download_url);
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      const content = await response.text();
      setFileContent(content);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 bg-black min-h-screen">
      {loading && <div className="text-green-500 text-xl animate-pulse">Loading...</div>}
      {error && <div className="text-red-500 text-xl">Error: {error}</div>}
      {!loading && !error && (
        <>
          <h1 className="text-green-500 text-2xl font-bold mb-4">Repository Content</h1>
          <ul className="list-none p-0">
            {repoContent.map((file) => (
              <li
                key={file.sha}
                className="cursor-pointer p-3 border-b border-green-500 hover:bg-green-500 hover:text-black transition-colors duration-300 ease-in-out transform hover:scale-105"
                onClick={() => handleFileClick(file)}
              >
                <span className="text-green-500">{file.name}</span>
              </li>
            ))}
          </ul>
          {selectedFile && (
            <div className="mt-6">
              <h2 className="text-green-500 text-xl font-bold">Selected File</h2>
              <pre className="text-green-500 bg-gray-800 p-4 rounded overflow-x-auto whitespace-pre-wrap">{fileContent}</pre>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default RepoDetails;
