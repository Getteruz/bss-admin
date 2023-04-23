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

    const [img1, setImg1] = useState()

    const [loading, setLoading] = useState(false)

    const { register, handleSubmit, control, formState: { errors } } = useForm();

    const HandleAddWebsite = async () => {
        setLoading(true)
        if (text && title && img1) {
            await createService({ title: title, text: text, img: [img1] })
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
                    setImg1(response?.data)

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
                                <img className='ServicesFrom_from-imgvie' src={img1 || img} alt="" width={105} height={81} name="img" />
                            </label>
                        </div>
                        <div className='ServicesFrom_from-mid-left'>
                            <input className='ServicesFrom_from-mid-inputtitle inputtitle2' name="title" type="text" placeholder='Название услуги' onClick={(e) => e.target.classList.add("inputtagcolor")} onChange={(e) => setTitle(e.target.value)} />
                        </div>
                    </div>
                    <input className='ServicesFrom_from-mid-inputtext' name="text" type="text" placeholder='описания' onChange={(e) => setText(e.target.value)} />
                </div>
            </form>
            <Toaster />
        </>
    )
}
