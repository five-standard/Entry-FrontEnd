import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from '../components/Header';
import Main from '../pages/Main';
import Search from '../pages/Search';
import Posts from '../pages/Posts';

import Test from '../pages/Test';

const Router = () => {
  return <BrowserRouter>
    <Header />
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/search" element={<Search />} />
      <Route path="/posts/:id" element={<Posts />} />
      <Route path="/test" element={<Test />} />
      <Route path="*" element={<>404 Not Found</>} />
    </Routes>
  </BrowserRouter>
};

export default Router;
