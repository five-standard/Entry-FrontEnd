import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from '../components/Header';
import Main from '../pages/Main';

const Router = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
