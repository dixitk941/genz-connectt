import React, { useState, useEffect } from 'react';
import { fetchFileContent } from '../utils/githubApi';

const FileViewer = ({ username, repoName, filePath }) => {
  const [fileContent, setFileContent] = useState('');

  useEffect(() => {
    const loadFileContent = async () => {
      const content = await fetchFileContent(username, repoName, filePath);
      setFileContent(content);
    };
    loadFileContent();
  }, [username, repoName, filePath]);

  return (
    <div className="bg-gray-100 p-4 rounded mt-4">
      <h3 className="text-lg font-semibold">File: {filePath}</h3>
      <pre className="overflow-auto">{fileContent}</pre>
    </div>
  );
};

export default FileViewer;
