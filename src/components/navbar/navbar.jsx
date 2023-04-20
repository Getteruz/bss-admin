import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'

import routes from '../../shared/constants/routes'
import GlobalContext from '../../shared/contexts/GlobalContext'

export default function Navbar() {
    const { page, setPage } = useContext(GlobalContext)


    return (
        <div className='navbar'>
            <ul className='navbar-list' >
                <li className='navbar-item' onClick={() => setPage(`Главная`)}>  <NavLink activeClassName className='navbar-link' to={routes.HOME}  >Главная   </NavLink> </li>
                <li className='navbar-item' onClick={() => setPage('Услуги')}>  <NavLink activeClassName className='navbar-link' to={routes.SERVICES} >Услуги   </NavLink> </li>
                <li className='navbar-item' onClick={() => setPage('Объекты')}>  <NavLink activeClassName className='navbar-link' to={routes.PROJECTS} >Объекты   </NavLink> </li>
                <li className='navbar-item' onClick={() => setPage('Новости')}>  <NavLink activeClassName className='navbar-link' to={routes.NEWS} >Новости  </NavLink> </li>
                <li className='navbar-item' onClick={() => setPage('О нас')}>  <NavLink activeClassName className='navbar-link' to={routes.ABOUTUS} >О нас  </NavLink> </li>
                {/* <li className='navbar-item' onClick={() => setPage('Сотрудники')}>  <NavLink activeClassName className='navbar-link' to={routes.PARTNORS} >Сотрудники   </NavLink> </li>
                <li className='navbar-item' onClick={() => setPage('Контакты')}>  <NavLink activeClassName className='navbar-link' to={routes.CONTACTS} >Контакты   </NavLink> </li> */}
            </ul>
            <p className='navbar-settings'> <NavLink className='navbar-link' to={routes.SETTINGS}>Настройки</NavLink></p>
        </div>
    )
}
