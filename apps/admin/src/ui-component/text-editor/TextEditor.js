import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import data from '../../constants/markdown-data';
import { styleNames } from 'libs/style-names';
import { withErrorBoundary } from 'libs/error-boundary';

import styles from './MarkdownEditor.module.scss';

const sn = styleNames(styles);

const MarkdownEditor = () => {
  const [markdown, setMarkdown] = useState(data);

  const handleMarkdownChange = (event) => {
    setMarkdown(event.target.value);
  };

  return (
    <div className={sn('editor')}>
      <div className={sn('editor__textarea')}>
        <textarea
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

export default withErrorBoundary(MarkdownEditor);
