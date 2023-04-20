import React, { useState } from 'react'
import img from "../../assets/images/Rectangldskdjsk.svg";

import { Link, useParams } from 'react-router-dom';
import routes from '../../shared/constants/routes';
import RichText from '../richText/RichText';
const data = {
    id: "0083",
    title: "Success usually comes to those who are too busy to be looking for it.",
    text: "Обеспечение безопасности ваших сотрудников и бесперебойной работы вашего бизнеса — наша главная задача!",
    data: "13.03.2021",
    sosaid: "177",
    view: "274"
}

export default function NewsFrom() {
    const params = useParams()
    const [title, setTitle] = useState(data?.title)
    const [text, setText] = useState(data?.text)
    const [tag, setTags] = useState('Тег')

    return (

        <div className='ServicesFrom'>
            <div className="ServicesFrom_top">
                <button className='ServicesFrom_top-back'><Link className='ServicesFrom_top-back2' to={routes.NEWS}>Добавление новости</Link></button>
                <button className='ServicesFrom_top-Edit btnopacity'>Изменить</button>
                <button className='ServicesFrom_top-delete btnopacity'>Удалить</button>
                <button className='ServicesFrom_top-Cancel'>Отменить</button>
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
                        <input className='ServicesFrom_from-mid-inputtitle inputtitle2' type="text" placeholder='Загаловок новости' value={title} onChange={(e) => {
                            setTitle(e.target.value)
                            e.target.classList.add("inputtagcolor")
                        }} />
                        <div className='ServicesFrom_from-mid-tags'>
                            <input className='ServicesFrom_from-mid-inputtag' type="text" value={tag} placeholder='#Узбекистан' onClick={(e) => e.target.classList.add("inputtagcolor")} onChange={e => {
                                if (e.target.value !== "#" && e.target.value.length == 1) {
                                    setTags("#" + e.target.value)
                                } else {
                                    setTags(e.target.value)
                                }
                                e.target.classList.add("inputtagcolor")
                            }} />
                            <ul className='ServicesFrom_from-mid-tagslist'>
                                <li value={"#Узбекистан"} className='ServicesFrom_from-mid-tagsitem'>#Узбекистан</li>
                            </ul>
                        </div>
                        <input className='ServicesFrom_from-mid-date' type="date" />

                    </div>
                </div>

                <RichText onModelChange={(e) => console.log(e)} />
                <p className='ServicesFrom_from-add'> Как добавить новости?</p>
            </form>
        </div>
    )
}
