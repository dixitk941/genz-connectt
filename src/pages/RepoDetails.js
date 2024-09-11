import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const RepoDetails = () => {
  const { username, repoName } = useParams();
  const [repoContent, setRepoContent] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileContent, setFileContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openFolders, setOpenFolders] = useState(new Set());

  useEffect(() => {
    const fetchRepoContent = async () => {
      try {
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
    if (file.type === 'file') {
      setSelectedFile(file);
      setLoading(true);
      setError(null);
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
    } else if (file.type === 'dir') {
      if (openFolders.has(file.path)) {
        openFolders.delete(file.path);
      } else {
        openFolders.add(file.path);
        try {
          const response = await fetch(file.url, {
            headers: {
              Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`
            }
          });
          if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
          }
          const data = await response.json();
          setRepoContent(prevContent => [...prevContent, ...data]);
        } catch (error) {
          setError(error.message);
        }
      }
      setOpenFolders(new Set(openFolders));
    }
  };

  const renderFileList = (files) => (
    <ul className="list-none p-0 space-y-2">
      {files.map(file => (
        <li
          key={file.sha}
          className={`cursor-pointer p-4 rounded-lg border border-green-500 bg-gray-800 ${
            file.type === 'dir' ? 'text-blue-400' : 'text-green-300'
          } hover:bg-green-600 hover:text-black transition-all duration-300 ease-in-out`}
          onClick={() => handleFileClick(file)}
        >
          <span className={`flex items-center ${file.type === 'dir' ? 'font-semibold' : ''}`}>
            {file.type === 'dir' ? '📁' : '📄'} {file.name}
          </span>
        </li>
      ))}
    </ul>
  );

  return (
    <div className="p-6 bg-black min-h-screen">
      {loading && <div className="text-green-500 text-xl animate-pulse">Loading...</div>}
      {error && <div className="text-red-500 text-xl">Error: {error}</div>}

      {!loading && !error && (
        <>
          <h1 className="text-green-500 text-3xl font-bold mb-6">Repository: {repoName}</h1>
          {renderFileList(repoContent)}
          {selectedFile && (
            <div className="mt-6 bg-gray-900 p-4 rounded-lg shadow-lg">
              <h2 className="text-green-500 text-xl font-semibold mb-4">Selected File</h2>
              <pre className="text-green-400 bg-gray-800 p-4 rounded overflow-x-auto whitespace-pre-wrap">{fileContent}</pre>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default RepoDetails;
