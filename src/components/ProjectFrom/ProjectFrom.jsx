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
    const [img1, setImg1] = useState()
    const [img2, setImg2] = useState()
    const [img3, setImg3] = useState()
    const [img4, setImg4] = useState()
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
            setImg1(data?.img[0])
            setImg2(data?.img[1])
            setImg3(data?.img[2])
            setImg4(data?.img[3])
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

            await UpdateObjects({ title: title, text: text, img: [img1 && img1, img2 && img2, img3 && img3, img4 && img4], tag: tag, data: calendar }, param?.id)
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
                    setImg1(response?.data)

                })
                .catch(error => {
                    setLoading(false)
                    toast(error.message)

                })
        }
    }
    const hendleimg2 = async (e) => {
        if (e.target.files[0]) {
            const formData = new FormData()
            formData.append("image", e.target.files[0])
            await UploadImg(formData)
                .then((response) => {
                    setImg2(response?.data)

                })
                .catch(error => {
                    setLoading(false)
                    toast(error.message)

                })
        }
    }
    const hendleimg3 = async (e) => {
        if (e.target.files[0]) {
            const formData = new FormData()
            formData.append("image", e.target.files[0])
            await UploadImg(formData)
                .then((response) => {
                    setImg3(response?.data)

                })
                .catch(error => {
                    setLoading(false)
                    toast(error.message)

                })
        }
    }
    const hendleimg4 = async (e) => {
        if (e.target.files[0]) {
            const formData = new FormData()
            formData.append("image", e.target.files[0])
            await UploadImg(formData)
                .then((response) => {
                    setImg4(response?.data)

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
                            <img className='ServicesFrom_from-imgvie' src={img1 || img} alt="" width={105} />
                        </label>
                        <label className='ServicesFrom_from-img img2' >
                            <input className='img2-img' type={"file"} onChange={hendleimg2} />
                            <img className='ServicesFrom_from-imgvie' src={img2 || img} alt="" width={105} />
                        </label>
                        <label className='ServicesFrom_from-img img2' >
                            <input className='img2-img' type={"file"} onChange={hendleimg3} />
                            <img className='ServicesFrom_from-imgvie' src={img3 || img} alt="" width={105} />
                        </label>
                        <label className='ServicesFrom_from-img img2' >
                            <input className='img2-img' type={"file"} onChange={hendleimg4} />
                            <img className='ServicesFrom_from-imgvie' src={img4 || img} alt="" width={105} />
                        </label>
                    </div>
                    <div className='ServicesFrom_from-mid-left'>
                        <input className='ServicesFrom_from-mid-inputtitle inputtitle2' type="text" value={title} placeholder='Название объекта' onChange={(e) => setTitle(e.target.value)} />
                        <div className='ServicesFrom_from-mid-tags'>
                            <input className='ServicesFrom_from-mid-inputtag' type="text" value={tag} placeholder='Узбекистан' onClick={(e) => e.target.classList.add("inputtagcolor")} onChange={e => {
                                setTags(e.target.value)
                            }} />

                        </div>
                        <input className='ServicesFrom_from-mid-date' type="date" value={calendar} onChange={e => setCalendar(e.target.value)} />
                        <input className='ServicesFrom_from-mid-inputtext' style={{ "marginTop": "80px" }} value={text} name="text" type="text" placeholder='описания' onChange={(e) => setText(e.target.value)} />
                    </div>
                </div>
            </form>
            <Toaster />
        </div>
    )
}
