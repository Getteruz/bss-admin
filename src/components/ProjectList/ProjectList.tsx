import React, { useEffect, useRef, useState } from 'react'
import eye from "../../assets/images/Iconseye.svg"
import img from "../../assets/images/Rectangle 23390.svg"
import clcik from "../../assets/images/Groupclick.svg"
import { Link, useNavigate } from 'react-router-dom'
import routes from '../../shared/constants/routes'
import { deleteObjects, GetObjects } from '../../shared/api/object'
import Loader from '../ul/loader/Loader'


export default function ProjectList() {
    const navigate = useNavigate()



    const [data1, setData1] = useState<any>()
    const x: any = useRef()
    const ul: any = useRef()
    const [isDalete, setIsDalete] = useState<boolean>(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchWebSite = async () => {
            const data = await GetObjects();
            setData1(data?.object)
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
        deleteObjects(id)
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

    const [tr, settr] = useState<string | boolean>("")
    return (
        <div>
            {loading ? <Loader /> : ''}
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
                    data1 && data1.map((e: any, i: any) => (
                        <li key={e._id} className='list-item'>
                            <input type="checkbox" />
                            <p className='list-item-text2'>ID:{i + 1} </p>
                            <div className='list-item-text2  list-item-div2'><img src={e?.img[0]?.url} alt="" />{e?.img[1] ? <img src={e?.img[1].url} alt="" /> : ""}  {e?.img[2] ? <img src={e?.img[2]?.url} alt="" /> : ''}</div>
                            <p className='list-item-text2'>{e?.uz_title}</p>
                            <p className='list-item-text2'>{e?.uz_tag}</p>
                            <p className='list-item-text2'>{e?.uz_text.slice(0, 50)}...</p>
                            <p className='list-item-text2'>{e?.data}</p>
                            <p className='list-item-text2'>{e?.view}</p>
                            <p className='list-item-text2'><Link className='list-item-update' to={routes.UPDATEOBJECT + `/${e._id}`}>Изменить</Link></p>
                            <img src={clcik} style={{ padding: " 0 5px", cursor: 'pointer' }} alt="" width={13} onClick={() => settr(state => state === e._id ? false : e._id)} />
                            <ul className='list-item-drop' style={tr == e._id ? { display: "inline-block", zIndex: 10 } : { display: "none", zIndex: 0 }} >
                                <li className='list-item-drop-text'>Копировать</li>
                                <li className='list-item-drop-text' onClick={() => handleDelete(e._id)}>Удалить</li>
                            </ul>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}
