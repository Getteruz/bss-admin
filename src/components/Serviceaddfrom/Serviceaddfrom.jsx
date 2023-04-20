import React, { useState } from 'react'
import img from "../../assets/images/Group48098387.png";

import { Link } from 'react-router-dom';
import routes from '../../shared/constants/routes';
import { useForm } from 'react-hook-form';
import { createService } from '../../shared/api/service';
export default function ServicesAddFrom() {

    const [title, setTitle] = useState("")
    const [text, setText] = useState("")
    const [img, setImg] = useState("")
    const [loading, setLoading] = useState(true)
    const { register, handleSubmit, control, formState: { errors } } = useForm();

    const HandleAddWebsite = async () => {
        setLoading(true)
        console.log(text, title)

        // await createService()
        //     .then((response) => {

        //     })
        //     .catch(error => {
        //         setLoading(false)
        //         alert(error.message)

        //     })
    }
    return (
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
                            <input className='img2-img' type={"file"} onChange={(e) => console.log(e)} />
                            <img className='ServicesFrom_from-imgvie' src={img} alt="" width={105} name="img" />
                        </label>
                    </div>
                    <div className='ServicesFrom_from-mid-left'>
                        <input className='ServicesFrom_from-mid-inputtitle inputtitle2' name="title" type="text" placeholder='Название услуги' onClick={(e) => e.target.classList.add("inputtagcolor")} onChange={(e) => setTitle(e)} />
                    </div>
                </div>
                <input className='ServicesFrom_from-mid-inputtitle' name="text" type="text" placeholder='описания' onChange={(e) => setText(e)} />
            </div>
        </form>
    )
}
