import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { styleNames } from 'libs/style-names';
import styles from './MarkdownEditor.module.scss';
import PropTypes from 'prop-types';

const sn = styleNames(styles);

const MarkdownEditor = ({ value, onChange, name }) => {
  const [markdown, setMarkdown] = useState(value || '');

  useEffect(() => {
    setMarkdown(value || '');
  }, [value]);

  const handleMarkdownChange = (event) => {
    const newValue = event.target.value;
    setMarkdown(newValue);
    if (onChange) {
      onChange(name, newValue); // Pass the name and value back to the parent component
    }
  };

  return (
    <div className={sn('editor')}>
      <div className={sn('editor__textarea')}>
        <textarea
          name={name}
          value={markdown}
          onChange={handleMarkdownChange}
          placeholder="Enter Markdown here..."
          className={sn('editor__textarea-content')}
        />
      </div>
      <div className={sn('editor__preview')}>
        <div className={sn('editor__preview-content')}>
          <ReactMarkdown>{markdown}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

MarkdownEditor.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  name: PropTypes.string
};

export default MarkdownEditor;
