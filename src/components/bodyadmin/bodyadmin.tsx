import React from 'react'
import { Outlet, Route, Routes } from 'react-router-dom'
import routes from '../../shared/constants/routes'
import AboutusFrom from '../PartnorsFrom/PratnorsFrom'
import Aboutuslist from '../Partnorslist/partnorslist'

import Navbar from '../navbar/navbar'
import NewsFrom from '../newsFrom/NewsFrom'
import Newslist from '../Newslist/Newslist'
import ProjectFrom from '../ProjectFrom/ProjectFrom'
import ProjectList from '../ProjectList/ProjectList'
import ServicesFrom from '../Servicesfrom/ServicesFrom'
import ServicesList from '../ServicesList/ServicesList'
import PratnorsFrom from '../PartnorsFrom/PratnorsFrom'
import Partnorslist from '../Partnorslist/partnorslist'
import AboutUs from '../aboutUs/AboutUs'
import Contact from '../contact/Contact'
import ServicesAddFrom from '../Serviceaddfrom/Serviceaddfrom'
import ProjectAddFrom from '../ProjectAddFrom/ProjectAddFrom'
import NewsAddFrom from '../NewsAddFrom/NewsAddFrom'
import PratnorsAddFrom from '../partnorsAddFrom/partnorsAddFrom'


export default function Bodyadmin() {
    return (
        <div className='Bodyadmin'>
            <div className="container">
                <Navbar />
                <div className='Bodyadmin-left'>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}
