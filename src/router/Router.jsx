import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from '../components/Header';
import { Register } from '../pages/Register';
import { useCookies } from 'react-cookie';
import { Search } from '../pages/Search';
import { Login } from '../pages/Login';
import { Posts } from '../pages/Posts';
import { Write } from '../pages/Write';
import { Main } from '../pages/Main';
import { Find } from '../pages/Find';

const Router = () => {
  const [cookies,] = useCookies();

  return <BrowserRouter>
    <Header />
    <Routes>
      <Route path="*" element={<>404 Not Found</>} />
      <Route path="/" element={<Main />} />
      <Route path="/search/:search" element={<Search />} />
      <Route path="/posts/:id" element={<Posts />} />
      {
        !cookies.accessToken
        ? <>
          <Route path="/Register" element={<Register />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/write" element={<Login />} />
          <Route path="/find" element={<Find />} />
        </>
        : <>
        <Route path="/Register" element={<Main />} />
        <Route path="/Login" element={<Main />} />
        <Route path="/write" element={<Write />} />
        <Route path="/find" element={<Main />} />
        </>
      }
    </Routes>
  </BrowserRouter>
};

export default Router;
