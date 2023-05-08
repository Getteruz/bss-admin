import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import eye from "../../assets/images/Iconseye.svg"
import img from "../../assets/images/Rectangle 23390.svg"
import icons from "../../assets/images/Vector3.svg"
import clcik from "../../assets/images/Groupclick.svg"
import routes from '../../shared/constants/routes'
import { deleteNews, GetNews } from '../../shared/api/news'
import Loader from '../ul/loader/Loader'



export default function Newslist() {
    const [tr, settr] = useState<string | boolean>("")
    const navigate = useNavigate()
    const [data1, setData1] = useState<any>()
    const x: any = useRef()
    const ul: any = useRef()
    const [isDalete, setIsDalete] = useState<boolean>(false)
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        const fetchWebSite = async () => {
            const data = await GetNews();
            setData1(data?.news)
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
        deleteNews(id)
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
    return (
        <div>
            {loading ? <Loader /> : ''}
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
                {data1 && data1.map((e: any, i: any) => (
                    <li key={e?._id} className='list-item'>
                        <input type="checkbox" />
                        <p className='list-item-text3'>ID:{i + 1} </p>
                        <div className='list-item-text3  list-item-div2'><img src={e?.img[0].url} alt="" />{e?.img[1] ? <img src={e?.img[1].url} alt="" /> : ""}  {e?.img[2] ? <img src={e?.img[2].url} alt="" /> : ''}</div>
                        <p className='list-item-text3'>{e?.title.slice(0, 40)}...</p>
                        <p className='list-item-text3'>{e?.text.slice(0, 40)}...</p>
                        <p className='list-item-text3'>{e?.data}</p>
                        <p className='list-item-text3'>0</p>
                        <p className='list-item-text3'>{e?.view}</p>
                        <img className='list-item-textimg' style={{ padding: " 0 5px", cursor: 'pointer' }} src={clcik} alt="img" width={3} onClick={() => settr(state => state === e._id ? false : e._id)} />

                        <ul ref={x} className='list-item-drop ' style={tr == e._id ? { display: "inline-block", zIndex: 10 } : { display: "none", zIndex: 0 }} >
                            <li className='list-item-drop-text'><Link to={routes.UPDATENEWS + `/${e?._id}`}>Изменить</Link></li>
                            <li className='list-item-drop-text'>Копировать</li>
                            <li className='list-item-drop-text' onClick={() => handleDelete(e._id)}>Удалить</li>
                        </ul>
                    </li>
                ))}
            </ul>
        </div>
    )
}
