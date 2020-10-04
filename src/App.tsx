import React from 'react';
import GlobalStateProvider from '@/components/GlobalStateProvider';
import Home from './pages/home';
import './global.less';

const App: React.FC = () => (
  <GlobalStateProvider>
    <Home />
  </GlobalStateProvider>
);

export default App;
