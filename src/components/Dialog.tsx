import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';

const Dialog: React.FC = () => {
  useEffect(() => {
    const body = document.body;
  });
  return createPortal(document.body, <div>hello</div>);
};
