import React from 'react';
import ConcurrentModeDemo from '@/components/ConcurrentModeDemo';
import Demo1 from './components/Demo1'
import './style.global.less'

const Mine: React.FC = () =>
  <div className='optimize'>
    <Demo1 />
    <ConcurrentModeDemo />
  </div>

export default Mine;
