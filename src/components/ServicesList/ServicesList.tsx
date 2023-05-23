import React, { useEffect, useRef, useState } from 'react'

import eye from "../../assets/images/Iconseye.svg"
import img from "../../assets/images/Iconsimg.svg"
import clcik from "../../assets/images/Groupclick.svg"
import routes from '../../shared/constants/routes'
import { Link, useNavigate } from 'react-router-dom'
import { deleteService, GetService } from '../../shared/api/service'
import Loader from '../ul/loader/Loader'




export default function ServicesList() {
    const [tr, settr] = useState<string | boolean>("")


    const [data, setData] = useState<any>()
    const x: any = useRef()
    const ul: any = useRef()
    const [isDalete, setIsDalete] = useState<boolean>(false)
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

    }, [isDalete]);


    const handleDelete = (id: any) => {
        setLoading(true)
        setIsDalete(false)
        deleteService(id)
            .then((response: any) => {
                setLoading(false)
                if (response?.status === 204) {
                    alert("deleted")
                }
                setIsDalete(true)
            })
            .catch(error => {
                alert(error.message)
                setLoading(false)
            })

    }
    const navigate = useNavigate()
    // useEffect(() => {
    //     const handleClick = (e: any) => {
    //         if (!ul.current.contains(e.target)) {
    //             settr1(false)
    //         } else if (ul.current === e.target) {
    //             settr1(true)
    //         }

    //     }

    //     document.addEventListener('click', handleClick);

    //     return () => document.removeEventListener('click', handleClick)
    // }, [])
    return (
        <div>
            {loading ? <Loader /> : ''}
            <div className='Filter'>
                <button className='Filter-add' onClick={() => navigate(routes.ADDSERVICES)}>+ Добавить товар</button>
            </div>

            <ul className="list">
                <li className='list-itemtop'>
                    <input type="checkbox" />
                    <p className='list-itemtop-text'>ID</p>
                    <p className='list-itemtop-text'></p>
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
                            <div className='list-item-text  list-item-div2'></div>
                            <p className='list-item-text'>{e.uz_title}</p>
                            <p className='list-item-text'>{e?.uz_text.slice(0, 50)}...</p>
                            <p className='list-item-text'>{e?.createdAt.slice(0, 10)}</p>
                            <p className='list-item-text'>{e?.view}</p>
                            <p className='list-item-text'><Link className='list-item-update' to={routes.UPDATESERVICES + `/${e?._id}`}>Изменить</Link></p>
                            <img ref={ul} style={{ padding: " 0 5px", cursor: 'pointer' }} src={clcik} alt="" width={13} onClick={() => {
                                settr(state => state === e?._id ? false : e?._id)


                            }} />
                            <ul className='list-item-drop' style={tr == e?._id ? { display: "inline-block", zIndex: 10 } : { display: "none", zIndex: 0 }}>
                                <li className='list-item-drop-text'>Копировать</li>
                                <li className='list-item-drop-text' onClick={() => handleDelete(e?._id)}>Удалить</li>
                            </ul>
                        </li>
                    ))
                }
            </ul>


        </div>
    )
}
