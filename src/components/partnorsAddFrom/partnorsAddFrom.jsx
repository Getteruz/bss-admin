import React, { useState } from 'react'
import img from "../../assets/images/Group48098387.png";


import { Link, useParams } from 'react-router-dom';
import routes from '../../shared/constants/routes';


export default function PratnorsAddFrom() {
    const params = useParams()
    const [tag, setTags] = useState('')

    return (
        <div className='ServicesFrom'>
            <div className="ServicesFrom_top">
                <button className='ServicesFrom_top-back'><Link className='ServicesFrom_top-back2' to={routes.PARTNORS}>Добавление сотрудники</Link></button>
                <button className='ServicesFrom_top-Edit btnopacity'>Изменить</button>
                <button className='ServicesFrom_top-delete btnopacity'>Удалить</button>
                <button className='ServicesFrom_top-Cancel '>Отменить</button>
                <button className='ServicesFrom_top-Publish'>Сохранить</button>
            </div>
            <form className="ServicesFrom_from">
                <div className='ServicesFrom_from-mid mid2'>
                    <div className='mid2-div'>
                        <label className='ServicesFrom_from-img img2' >
                            <input className='img2-img' type={"file"} />
                            <img className='ServicesFrom_from-imgvie' src={img} alt="" width={105} />
                        </label>
                        <label className='ServicesFrom_from-img img2' >
                            <input className='img2-img' type={"file"} />
                            <img className='ServicesFrom_from-imgvie' src={img} alt="" width={105} />
                        </label>
                    </div>
                    <div className='ServicesFrom_from-mid-left'>
                        <input className='ServicesFrom_from-mid-inputtitle inputtitle2' type="text" placeholder='Имя фамилия' onClick={(e) => e.target.classList.add("inputtagcolor")} onChange={(e) => {
                            e.target.classList.add("inputtagcolor")
                        }} />
                        <div className='ServicesFrom_from-mid-tags'>
                            <input className='ServicesFrom_from-mid-inputtag' type="text" value={tag} placeholder='#Должность' onClick={(e) => e.target.classList.add("inputtagcolor")} onChange={e => {
                                if (e.target.value !== "#" && e.target.value.length == 1) {
                                    setTags("#" + e.target.value)
                                } else {
                                    setTags(e.target.value)
                                }
                                e.target.classList.add("inputtagcolor")
                            }} />
                        </div>


                    </div>
                </div>
                <p className='ServicesFrom_from-add'> Как добавить новости?</p>
            </form>
        </div>
    )
}
