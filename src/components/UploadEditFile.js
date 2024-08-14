// src/components/UploadEditFile.js
import React, { useState } from 'react';
import axios from 'axios';

const UploadEditFile = ({ repoName, filePath }) => {
  const [fileContent, setFileContent] = useState('');

  const handleFileChange = (e) => {
    const reader = new FileReader();
    reader.onload = () => setFileContent(reader.result);
    reader.readAsText(e.target.files[0]);
  };

  const handleSaveFile = async () => {
    const token = localStorage.getItem('github_token');
    const encodedContent = btoa(fileContent);

    const response = await axios.put(`https://api.github.com/repos/your-username/${repoName}/contents/${filePath}`, {
      message: `Add/Edit ${filePath}`,
      content: encodedContent,
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 201 || response.status === 200) {
      alert('File uploaded/edited successfully!');
    } else {
      alert('Failed to upload/edit file.');
    }
  };

  return (
    <div>
      <h2>Upload/Edit File</h2>
      <input type="file" onChange={handleFileChange} />
      <textarea value={fileContent} onChange={(e) => setFileContent(e.target.value)} placeholder="Edit file content here" />
      <button onClick={handleSaveFile} className="btn btn-primary">Save File</button>
    </div>
  );
};

export default UploadEditFile;
