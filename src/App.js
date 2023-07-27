import React from 'react';
import Router from './router/Router';
import GlobalStyle from './css/GlobalStyle';
import { RecoilRoot } from 'recoil';

function App() {
  return <RecoilRoot>
    <GlobalStyle />
    <Router />
  </RecoilRoot>
}

export default App;
