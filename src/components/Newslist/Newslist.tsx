import React, { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import eye from "../../assets/images/Iconseye.svg"
import img from "../../assets/images/Rectangle 23390.svg"
import icons from "../../assets/images/Vector3.svg"
import clcik from "../../assets/images/Groupclick.svg"
import routes from '../../shared/constants/routes'

const data = [
    {
        id: "0083",
        title: "Success usually comes to those who are too busy to be looking for it.",
        text: "Обеспечение безопасности ваших сотрудников и бесперебойной работы вашего бизнеса — наша главная задача!",
        data: "13.03.2021",
        sosaid: "177",
        view: "274"
    },
    {
        id: "0084",
        title: "Success usually comes to those who are too busy to be looking for it.",
        text: "Обеспечение безопасности ваших сотрудников и бесперебойной работы вашего бизнеса — наша главная задача!",
        data: "13.03.2021",
        sosaid: "177",
        view: "274"
    },
    {
        id: "0085",
        title: "Success usually comes to those who are too busy to be looking for it.",
        text: "Обеспечение безопасности ваших сотрудников и бесперебойной работы вашего бизнеса — наша главная задача!",
        data: "13.03.2021",
        sosaid: "177",
        view: "274"
    }
]


export default function Newslist() {
    const [tr, settr] = useState<string | boolean>("")
    const navigate = useNavigate()
    const x: any = useRef()
    return (
        <div>
            <div className='Filter'>
                <button className='Filter-add' onClick={() => navigate(routes.ADDNEWS)}>+ Добавить товар</button>
            </div>
            <ul className="list">
                <li className='list-itemtop'>
                    <input type="checkbox" />
                    <p className='list-itemtop-text3'>ID</p>
                    <p className='list-itemtop-text3'>Picture</p>
                    <p className='list-itemtop-text3'>Заголовок</p>
                    <p className='list-itemtop-text3'>Описание</p>
                    <p className='list-itemtop-text3'>Дата</p>
                    <img className='list-itemtop-text3' src={icons} alt="" />
                    <img className='list-itemtop-text3' src={eye} alt="" />
                </li>
                {data && data.map((e) => (
                    <li className='list-item'>
                        <input type="checkbox" />
                        <p className='list-item-text3'>ID:{e?.id} { }</p>
                        <div className='list-item-text3  list-item-div2'><img src={img} alt="" /> <img src={img} alt="" /> <img src={img} alt="" /></div>
                        <p className='list-item-text3'>{e?.title.slice(0, 40)}...</p>
                        <p className='list-item-text3'>{e?.text.slice(0, 40)}...</p>
                        <p className='list-item-text3'>{e?.data}</p>
                        <p className='list-item-text3'>{e?.sosaid}</p>
                        <p className='list-item-text3'>{e?.view}</p>
                        <img className='list-item-textimg' src={clcik} alt="" width={4} onClick={() => settr(state => state === e.id ? false : e.id)} />

                        <ul ref={x} className='list-item-drop ' style={tr == e.id ? { display: "inline-block", zIndex: 10 } : { display: "none", zIndex: 0 }} >
                            <li className='list-item-drop-text'><Link to={routes.UPDATENEWS + `/${e?.id}`}>Изменить</Link></li>
                            <li className='list-item-drop-text'>Копировать</li>
                            <li className='list-item-drop-text'>Удалить</li>
                        </ul>
                    </li>
                ))}
            </ul>
        </div>
    )
}
