import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import './MarkdownEditor.css';
import data from '../../constants/markdown-data';

const MarkdownEditor = () => {
  const [markdown, setMarkdown] = useState(data);

  const handleMarkdownChange = (event) => {
    setMarkdown(event.target.value);
  };

  return (
    <div className="markdown-editor">
      <div className="textarea-container">
        <textarea
          value={markdown}
          onChange={handleMarkdownChange}
          placeholder="Enter Markdown here..."
        />
      </div>
      <div className="preview">
        <div className="preview-content">
          <ReactMarkdown>{markdown}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default MarkdownEditor;
