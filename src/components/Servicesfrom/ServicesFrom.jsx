import React, { useEffect, useState } from 'react'
import img from "../../assets/images/Group48098387.png";

import { Link, useNavigate, useParams } from 'react-router-dom';
import routes from '../../shared/constants/routes';
import { GetServicebyid, UpdateService } from '../../shared/api/service';
import Loader from '../ul/loader/Loader';
import { UploadImg } from '../../shared/api/multer';
import { useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';

export default function ServicesFrom() {
    const navgate = useNavigate()
    const [data1, setData] = useState()
    const [title, setTitle] = useState(data1?.title)
    const [text, setText] = useState(data1?.text)
    const [img1, setImg1] = useState(data1?.img)

    const [loading, setLoading] = useState(true)
    const param = useParams()

    useEffect(() => {
        const fetchWebSite = async () => {
            const data = await GetServicebyid(param?.id);
            setData(data)
            setTitle(data?.title)
            setText(data?.text)
            setImg1(data?.img)
            setLoading(false)
        }
        fetchWebSite()
            .then((err) => {
                console.log("err");
            })

    }, []);

    const { register, handleSubmit, control, formState: { errors } } = useForm();

    const HandleAddWebsite = async () => {
        setLoading(true)
        if (text && title && img1) {

            await UpdateService({ title: title, text: text, img: img1 }, param?.id)
                .then((response) => {
                    if (response.status == 200) {
                        setLoading(false)
                        toast("item updated")
                        navgate(routes.SERVICES)
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
        <>
            {loading ? <Loader /> : ""}
            <form className='ServicesFrom' onSubmit={(e) => {
                e.preventDefault()
            }}>
                <div className="ServicesFrom_top">
                    <button className='ServicesFrom_top-back'><Link className='ServicesFrom_top-back2' to={routes.SERVICES}>Добавление услуга</Link></button>
                    <button className='ServicesFrom_top-Edit btnopacity'>Edit</button>
                    <button className='ServicesFrom_top-delete btnopacity'>Delete</button>
                    <button className='ServicesFrom_top-Cancel'>Cancel</button>
                    <button className='ServicesFrom_top-Publish' onClick={handleSubmit(HandleAddWebsite)}>Publish</button>
                </div>
                <div className="ServicesFrom_from" >
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
                            <textarea className='ServicesFrom_from-mid-inputtitle inputtitle2' type="text" value={title} placeholder='Названиеуслуги' onClick={(e) => e.target.classList.add("inputtagcolor")} onChange={e => {
                                e.target.classList.add("inputtagcolor")
                                setTitle(e.target.value)
                                e.target.style.height = "51px";
                                e.target.style.height = (e.target.scrollHeight) + "px";
                            }} >

                            </textarea>
                        </div>
                    </div>
                    <textarea className='ServicesFrom_from-mid-inputtext' name="text" value={text} type="text" placeholder='описания' onChange={(e) => {
                        e.target.style.height = "37px";
                        e.target.style.height = (e.target.scrollHeight) + "px";
                        setText(e.target.value)

                    }} >

                    </textarea>

                </div>
            </form>
            <Toaster />
        </>
    )
}
