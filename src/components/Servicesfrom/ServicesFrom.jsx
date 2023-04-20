import React, { useState } from 'react'
import img from "../../assets/images/Rectangldskdjsk.svg";

import { Link } from 'react-router-dom';
import routes from '../../shared/constants/routes';

const data = {
    id: "0068",
    img: img,
    title: "Здоровье и безопасность",
    text: "Обеспечение безопасности ваших сотрудников и бесперебойной работы вашего бизнеса — наша главная задача",
    data: "13.03.2021",
    view: "1,5k"
}


export default function ServicesFrom() {
    const [tag, setTags] = useState('')
    const [title, setTitle] = useState(data?.title)
    const [text, setText] = useState(data?.text)
    return (
        <form className='ServicesFrom' onSubmit={(e) => {
            e.preventDefault()
            console.log(title, text)
        }}>
            <div className="ServicesFrom_top">
                <button className='ServicesFrom_top-back'><Link className='ServicesFrom_top-back2' to={routes.SERVICES}>Добавление услуга</Link></button>
                <button className='ServicesFrom_top-Edit btnopacity'>Edit</button>
                <button className='ServicesFrom_top-delete btnopacity'>Delete</button>
                <button className='ServicesFrom_top-Cancel'>Cancel</button>
                <button className='ServicesFrom_top-Publish'>Publish</button>
            </div>
            <div className="ServicesFrom_from" >
                <div className='ServicesFrom_from-mid mid2'>
                    <div className='mid2-div'>
                        <label className='ServicesFrom_from-img img2' >
                            <input className='img2-img' type={"file"} />
                            <img className='ServicesFrom_from-imgvie' src={data?.img} alt="" width={105} name="img" />
                        </label>
                    </div>
                    <div className='ServicesFrom_from-mid-left'>
                        <input className='ServicesFrom_from-mid-inputtitle inputtitle2' name="title" type="text" placeholder='Название услуги' value={title} onClick={(e) => e.target.classList.add("inputtagcolor")} onChange={(e) => setTitle(e.target.value)} />
                    </div>
                </div>

                <p className='ServicesFrom_from-add'> Как добавить новости?</p>
            </div>
        </form>
    )
}
