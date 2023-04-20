import React, { useState } from 'react'
import eye from "../../assets/images/Iconseye.svg"
import img from "../../assets/images/Rectangle 23390.svg"
import clcik from "../../assets/images/Groupclick.svg"
import { Link, useNavigate } from 'react-router-dom'
import routes from '../../shared/constants/routes'

const data = [
    {
        id: "0069",
        img: img,
        img2: img,
        img3: img,
        title: "Здоровье и безопасность",
        location: "Узбекистан",
        text: "Обеспечение безопасности ваших сотрудников и бесперебойной работы вашего бизнеса — наша главная задача",
        data: "13.03.2021",
        view: "1,5k"
    },
    {
        id: "0070",
        img: img,
        img2: img,
        img3: img,
        title: "Здоровье и безопасность",
        location: "Узбекистан",
        text: "Обеспечение безопасности ваших сотрудников и бесперебойной работы вашего бизнеса — наша главная задача",
        data: "13.03.2021",
        view: "1,5k"
    },
    {
        id: "0071",
        img: img,
        img2: img,
        img3: img,
        title: "Здоровье и безопасность",
        location: "Узбекистан",
        text: "Обеспечение безопасности ваших сотрудников и бесперебойной работы вашего бизнеса — наша главная задача",
        data: "13.03.2021",
        view: "1,5k"
    }
]

export default function ProjectList() {
    const [tr, settr] = useState<string | boolean>("")
    const navigate = useNavigate()
    return (
        <div>
            <div className='Filter'>
                <button className='Filter-add' onClick={() => navigate(routes.ADDPROJECT)}>+ Добавить товар</button>
            </div>
            <ul className="list">
                <li className='list-itemtop'>
                    <input type="checkbox" />
                    <p className='list-itemtop-text2'>ID</p>
                    <p className='list-itemtop-text2'>Picture</p>
                    <p className='list-itemtop-text2'>Название</p>
                    <p className='list-itemtop-text2'>Местоположение</p>
                    <p className='list-itemtop-text2'>Description</p>
                    <p className='list-itemtop-text2'>Data</p>
                    <img className='list-itemtop-text2' src={eye} alt="" />
                    <p className='list-itemtop-text2'>Action</p>
                </li>
                {
                    data && data.map((e: any) => (
                        <li className='list-item'>
                            <input type="checkbox" />
                            <p className='list-item-text2'>ID: {e.id}</p>
                            <div className='list-item-text2  list-item-div2'><img src={img} alt="" /> <img src={img} alt="" /> <img src={img} alt="" /></div>
                            <p className='list-item-text2'>{e?.title}</p>
                            <p className='list-item-text2'>{e?.location}</p>
                            <p className='list-item-text2'>{e?.text.slice(0, 50)}...</p>
                            <p className='list-item-text2'>{e?.data}</p>
                            <p className='list-item-text2'>{e?.view}</p>
                            <p className='list-item-text2'><Link className='list-item-update' to={routes.UPDATEOBJECT + `/${e.id}`}>Изменить</Link></p>
                            <img src={clcik} alt="" width={4} onClick={() => settr(state => state === e.id ? false : e.id)} />
                            <ul className='list-item-drop' style={tr == e.id ? { display: "inline-block", zIndex: 10 } : { display: "none", zIndex: 0 }} >
                                <li className='list-item-drop-text'>Копировать</li>
                                <li className='list-item-drop-text'>Удалить</li>
                            </ul>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}
