import React, { useEffect, useRef, useState } from 'react'

import eye from "../../assets/images/Iconseye.svg"
import img from "../../assets/images/Iconsimg.svg"
import clcik from "../../assets/images/Groupclick.svg"
import routes from '../../shared/constants/routes'
import { Link, useNavigate } from 'react-router-dom'
import { GetService } from '../../shared/api/service'



// const data = [
//     {
//         id: "0068",
//         img: img,
//         title: "Здоровье и безопасность",
//         text: "Обеспечение безопасности ваших сотрудников и бесперебойной работы вашего бизнеса — наша главная задача",
//         data: "13.03.2021",
//         view: "1,5k"
//     },
//     {
//         id: "0069",
//         img: img,
//         title: "Здоровье и безопасность",
//         text: "Обеспечение безопасности ваших сотрудников и бесперебойной работы вашего бизнеса — наша главная задача",
//         data: "13.03.2021",
//         view: "1,5k"
//     },
//     {
//         id: "0070",
//         img: img,
//         title: "Здоровье и безопасность",
//         text: "Обеспечение безопасности ваших сотрудников и бесперебойной работы вашего бизнеса — наша главная задача",
//         data: "13.03.2021",
//         view: "1,5k"
//     }
// ]


export default function ServicesList() {
    const [tr, settr] = useState<string | boolean>("")
    const [data, setData] = useState<any>()
    const x: any = useRef()

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchWebSite = async () => {
            const data = await GetService();
            setData(data?.service)
            setLoading(false)
        }
        fetchWebSite()
            .then((err) => {
                console.log("err");
            })

    }, []);
    console.log(loading)

    // const handleDelete = (id: any) => {
    //     setLoading(true)
    //     deletePosition(id)
    //         .then((response: any) => {
    //             setLoading(false)
    //             if (response?.status === 204) {
    //                 alert("deleted")
    //             }
    //         })
    //         .catch(error => {
    //             alert(error.message)
    //             setLoading(false)
    //         })
    // }
    const navigate = useNavigate()
    return (
        <div>
            <div className='Filter'>
                <button className='Filter-add' onClick={() => navigate(routes.ADDSERVICES)}>+ Добавить товар</button>
            </div>
            {
                loading ? <h1>loading</h1> :
                    <ul className="list">
                        <li className='list-itemtop'>
                            <input type="checkbox" />
                            <p className='list-itemtop-text'>ID</p>
                            <p className='list-itemtop-text'>Picture</p>
                            <p className='list-itemtop-text'>Title</p>
                            <p className='list-itemtop-text'>Description</p>
                            <p className='list-itemtop-text'>Data</p>
                            <img className='list-itemtop-text' src={eye} alt="" />
                            <p className='list-itemtop-text'>Action</p>
                        </li>

                        {
                            data && data.map((e: any) => (
                                <li className='list-item'>
                                    <input type="checkbox" />
                                    <p className='list-item-text'>ID: {e?.id}</p>
                                    <div className='list-item-text list-item-div'><img src={e?.img} alt="" /></div>
                                    <p className='list-item-text'>{e.title}</p>
                                    <p className='list-item-text'>{e?.text.slice(0, 50)}...</p>
                                    <p className='list-item-text'>{e?.data}</p>
                                    <p className='list-item-text'>{e?.view}</p>
                                    <p className='list-item-text'><Link className='list-item-update' to={routes.UPDATESERVICES + `/${e?.id}`}>Изменить</Link></p>
                                    <img src={clcik} alt="" width={4} onClick={() => settr(state => state === e.id ? false : e.id)} />
                                    <ul className='list-item-drop' style={tr == e.id ? { display: "inline-block", zIndex: 10 } : { display: "none", zIndex: 0 }} >
                                        <li className='list-item-drop-text'>Копировать</li>
                                        <li className='list-item-drop-text'>Удалить</li>
                                    </ul>
                                </li>
                            ))

                        }
                    </ul>

            }

        </div>
    )
}
