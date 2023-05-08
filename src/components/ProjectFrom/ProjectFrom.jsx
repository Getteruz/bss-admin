import React, { useEffect, useState } from 'react'
import img from "../../assets/images/Group48098387.png";

import { Link, useNavigate, useParams } from 'react-router-dom';
import routes from '../../shared/constants/routes';
import { GetObjectsbyid, UpdateObjects } from '../../shared/api/object';
import toast, { Toaster } from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import Loader from '../ul/loader/Loader';
import { UploadImg } from '../../shared/api/multer';

export default function ProjectFrom() {
    const navgate = useNavigate()
    const [data, setData] = useState()
    const [tag, setTags] = useState('')
    const [title, setTitle] = useState("")
    const [text, setText] = useState("")
    const [calendar, setCalendar] = useState('')
    const [img1, setImg1] = useState([])
    const [loading, setLoading] = useState(true)
    const param = useParams()

    useEffect(() => {
        const fetchObject = async () => {
            const data = await GetObjectsbyid(param?.id);
            setData(data)
            setTitle(data?.title)
            setTags(data?.tag)
            setText(data?.text)
            setCalendar(data?.data)
            setImg1(data?.img)

            setLoading(false)
        }
        fetchObject()
            .then((err) => {
                console.log("err");
            })

    }, []);
    const { register, handleSubmit, control, formState: { errors } } = useForm();

    const HandleAddWebsite = async () => {
        setLoading(true)
        if (text && title && img1) {

            await UpdateObjects({ title: title, text: text, img: img1, tag: tag, data: calendar }, param?.id)
                .then((response) => {
                    if (response.status == 200) {
                        setLoading(false)
                        toast("item updated")
                        navgate(routes.PROJECTS)
                    } else {
                        toast('please try again')
                    }
                })
                .catch(error => {
                    setLoading(false)
                    toast(error.message)

                })
        } else {
            toast('inputs are requred to fill')
            setLoading(false)
        }


    }
    const hendleimg = async (e) => {
        if (e.target.files[0]) {
            const formData = new FormData()
            formData.append("image", e.target.files[0])
            await UploadImg(formData)
                .then((response) => {
                    setImg1(status => [...status, response?.data])

                })
                .catch(error => {
                    setLoading(false)
                    toast(error.message)

                })
        }
    }

    return (
        <div className='ServicesFrom'>
            {loading ? <Loader /> : ''}
            <div className="ServicesFrom_top">
                <button className='ServicesFrom_top-back'><Link className='ServicesFrom_top-back2' to={routes.PROJECTS}>Добавление объекта</Link></button>
                <button className='ServicesFrom_top-Edit btnopacity'>Изменить</button>
                <button className='ServicesFrom_top-delete btnopacity'>Удалить</button>
                <button className='ServicesFrom_top-Cancel'>Отменить</button>
                <button className='ServicesFrom_top-Publish' onClick={handleSubmit(HandleAddWebsite)}>Сохранить</button>
            </div>
            <form className="ServicesFrom_from" >
                <div className='ServicesFrom_from-mid mid2'>
                    <div className='mid2-div'>
                        <label className='ServicesFrom_from-img img2' >
                            <input className='img2-img' type={"file"} onChange={hendleimg} />
                            <img className='ServicesFrom_from-imgvie2' src={img} alt="" width={105} height={81} />
                        </label>
                        {img1 && img1.map((e, i) => (
                            <div className='ServicesFrom_from-imgviedivcha'>
                                <img key={i} className='ServicesFrom_from-imgvie' src={e?.url || img} alt="" width={105} height={81} />
                                <div> X</div>
                            </div>
                        ))}
                    </div>
                    <div className='ServicesFrom_from-mid-left'>

                        <textarea className='ServicesFrom_from-mid-inputtitle inputtitle2' type="text" value={title} placeholder='Название объекта' onClick={(e) => e.target.classList.add("inputtagcolor")} onChange={e => {
                            e.target.classList.add("inputtagcolor")
                            setTitle(e.target.value)
                            e.target.style.height = "51px";
                            e.target.style.height = (e.target.scrollHeight) + "px";
                        }} >

                        </textarea>
                        <div className='ServicesFrom_from-mid-tags'>
                            <input className='ServicesFrom_from-mid-inputtag' type="text" value={tag} placeholder='Узбекистан' onClick={(e) => e.target.classList.add("inputtagcolor")} onChange={e => {
                                setTags(e.target.value)
                            }} />

                        </div>
                        <input className='ServicesFrom_from-mid-date' type="date" value={calendar} onChange={e => setCalendar(e.target.value)} />
                    </div>
                </div>
                <textarea className='ServicesFrom_from-mid-inputtext' name="text" value={text} type="text" placeholder='описания' onChange={(e) => {
                    e.target.style.height = "37px";
                    e.target.style.height = (e.target.scrollHeight) + "px";
                    setText(e.target.value)

                }} >

                </textarea>
            </form>
            <Toaster />
        </div>
    )
}
