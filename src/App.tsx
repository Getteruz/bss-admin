import { useEffect, useState } from 'react';
import './App.css';
import Home from './app/home/home';
import GlobalContext from './shared/contexts/GlobalContext';

import '../node_modules/@syncfusion/ej2-base/styles/material.css';
import '../node_modules/@syncfusion/ej2-buttons/styles/material.css';
import '../node_modules/@syncfusion/ej2-popups/styles/material.css';
import '../node_modules/@syncfusion/ej2-react-navigations/styles/material.css';
import Login from './components/login/login';
import { setCookie, getCookie } from 'typescript-cookie'
import { Route, Routes, useNavigate } from 'react-router-dom';
import routes from './shared/constants/routes';
import ServicesList from './components/ServicesList/ServicesList';
import ServicesAddFrom from './components/Serviceaddfrom/Serviceaddfrom';
import ServicesFrom from './components/Servicesfrom/ServicesFrom';
import ProjectList from './components/ProjectList/ProjectList';
import ProjectAddFrom from './components/ProjectAddFrom/ProjectAddFrom';
import ProjectFrom from './components/ProjectFrom/ProjectFrom';
import Newslist from './components/Newslist/Newslist';
import NewsAddFrom from './components/NewsAddFrom/NewsAddFrom';
import NewsFrom from './components/newsFrom/NewsFrom';

import AboutUs from './components/aboutUs/AboutUs';
import Contact from './components/contact/Contact';

function App() {
  const [page, setPage] = useState<any>('Главная')
  const [token, setToken] = useState(getCookie("accesToken") || false)
  const navigate = useNavigate()
  const hendleSetPage = (value: any): any => {
    setPage(value);
  };

  useEffect(() => {
    if (!token) {
      navigate('/login')
    }
  }, [token])

  return (
    <>
      <GlobalContext.Provider value={{ page, setPage: hendleSetPage }}>
        <Routes>
          <Route path='/' element={<Home />} >
            <Route path={'index'} element={<></>} />
            <Route path={'Services'} element={<ServicesList />} />
            <Route path={routes.ADDSERVICES} element={<ServicesAddFrom />} />
            <Route path={routes.UPDATESERVICES + "/:id"} element={<ServicesFrom />} />
            <Route path={'Objects'} element={<ProjectList />} />
            <Route path={routes.ADDPROJECT} element={<ProjectAddFrom />} />
            <Route path={routes.UPDATEOBJECT + "/:id"} element={<ProjectFrom />} />
            <Route path={'News'} element={<Newslist />} />
            <Route path={routes.ADDNEWS} element={<NewsAddFrom />} />
            <Route path={routes.UPDATENEWS + "/:id"} element={<NewsFrom />} />
            <Route path={routes.ABOUTUS} element={<AboutUs />} />
            <Route path={routes.CONTACTS} element={<Contact />} />
          </Route>
          <Route path='/login' element={<Login />} />
        </Routes>

      </GlobalContext.Provider>
    </>
  );
}

export default App;
