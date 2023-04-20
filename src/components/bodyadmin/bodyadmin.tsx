import React from 'react'
import { Route, Routes } from 'react-router-dom'
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
                    <Routes>
                        {/* <Route path={routes.HOME} element={<Home />} /> */}
                        <Route path={routes.SERVICES} element={<ServicesList />} />
                        <Route path={routes.ADDSERVICES} element={<ServicesAddFrom />} />
                        <Route path={routes.UPDATESERVICES + "/:id"} element={<ServicesFrom />} />
                        <Route path={routes.PROJECTS} element={<ProjectList />} />
                        <Route path={routes.ADDPROJECT} element={<ProjectAddFrom />} />
                        <Route path={routes.UPDATEOBJECT + "/:id"} element={<ProjectFrom />} />
                        <Route path={routes.NEWS} element={<Newslist />} />
                        <Route path={routes.ADDNEWS} element={<NewsAddFrom />} />
                        <Route path={routes.UPDATENEWS + "/:id"} element={<NewsFrom />} />
                        <Route path={routes.PARTNORS} element={<Partnorslist />} />
                        <Route path={routes.ADDPARTNORS} element={<PratnorsAddFrom />} />
                        <Route path={routes.UPDATEPARTNORS + "/:id"} element={<PratnorsFrom />} />
                        <Route path={routes.ABOUTUS} element={<AboutUs />} />
                        <Route path={routes.CONTACTS} element={<Contact />} />
                    </Routes>
                </div>
            </div>
        </div>
    )
}
