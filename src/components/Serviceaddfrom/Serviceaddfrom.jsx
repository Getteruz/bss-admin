import React, { useState } from 'react'
import img from "../../assets/images/Group48098387.png";

import { Link, useNavigate } from 'react-router-dom';
import routes from '../../shared/constants/routes';
import { useForm } from 'react-hook-form';
import { createService } from '../../shared/api/service';
import { UploadImg } from '../../shared/api/multer';
import toast, { Toaster } from 'react-hot-toast';
import Loader from '../ul/loader/Loader';
export default function ServicesAddFrom() {
    const navgate = useNavigate()
    const [title, setTitle] = useState("")
    const [text, setText] = useState("")

    const [img1, setImg1] = useState([])

    const [loading, setLoading] = useState(false)

    const { register, handleSubmit, control, formState: { errors } } = useForm();

    const HandleAddWebsite = async () => {
        setLoading(true)
        if (text && title && img1) {
            await createService({ title: title, text: text, img: img1 })
                .then((response) => {
                    if (response.status == 200) {
                        setLoading(false)
                        toast("item create")
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
            {loading ? <Loader /> : ''}
            <form className='ServicesFrom'>
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

                            <textarea className='ServicesFrom_from-mid-inputtitle inputtitle2' type="text" placeholder='Название услуги' onClick={(e) => e.target.classList.add("inputtagcolor")} onChange={e => {
                                e.target.classList.add("inputtagcolor")
                                setTitle(e.target.value)
                                e.target.style.height = "51px";
                                e.target.style.height = (e.target.scrollHeight) + "px";
                            }} >

                            </textarea>
                        </div>
                    </div>
                    <textarea className='ServicesFrom_from-mid-inputtext' name="text" type="text" placeholder='описания' onChange={(e) => {
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
