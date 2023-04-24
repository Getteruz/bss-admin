import React, { useEffect, useRef, useState } from 'react'
import img from "../../assets/images/Rectangle393.png"
import clcik from "../../assets/images/Groupclick.svg"
import { Link, useNavigate } from 'react-router-dom'
import routes from '../../shared/constants/routes'
import { deleteObjects, GetObjects } from '../../shared/api/object'
import Loader from '../ul/loader/Loader'

const data = [
    {
        id: "32e8d9yw8dyw78",
        img: img,
        name: "Abdullo Xolmurodov",
        job: "Joomla Developer",
        createAt: "23 августа, 17:30"
    },
    {
        id: "32dsdsdsd",
        img: img,
        name: "Theresa Webb",
        job: "Human Resource",
        createAt: "28 августа, 22:30"
    }
]

export default function Partnorslist() {
    const navigate = useNavigate()



    const [data1, setData1] = useState<any>()
    const x: any = useRef()
    const ul: any = useRef()
    const [isDalete, setIsDalete] = useState<boolean>(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchWebSite = async () => {
            const data = await GetObjects();
            setData1(data?.service)
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
            {loading ? <Loader /> : ""}
            <div className='Filter'>
                <button className='Filter-add' onClick={() => navigate(routes.ADDPARTNORS)}>+ Добавить товар</button>
            </div>
            <ul className="list">
                <li className='list-itemtop'>
                    <input type="checkbox" />
                    <p className='list-itemtop-text2'>ID</p>
                    <p className='list-itemtop-text2'>Фото</p>
                    <p className='list-itemtop-text2'>Заголовок</p>
                    <p className='list-itemtop-text2'>Должность</p>
                    <p className='list-itemtop-text2'>Дата создание</p>

                </li>
                {
                    data && data.map((e) => (
                        <li key={e.id} className='list-item'>
                            <input type="checkbox" />
                            <p className='list-item-text2'>ID: 0068</p>
                            <div className='list-item-text2  list-item-div2'><img src={img} alt="" /> </div>
                            <p className='list-item-text2'>{e.name}</p>
                            <p className='list-item-text2'>{e.job}</p>
                            <p className='list-item-text2'>{e.createAt}</p>
                            <img className='list-item-textimg' src={clcik} alt="" width={4} onClick={() => settr(state => state === e.id ? false : e.id)} />

                            <ul className='list-item-drop' style={tr == e.id ? { display: "inline-block", zIndex: 10 } : { display: "none", zIndex: 0 }} >
                                <li className='list-item-drop-text'><Link to={routes.UPDATEPARTNORS + '/' + e.id}>Изменить</Link></li>
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

