import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import img from "../../assets/images/Group48098387.png";
import { GetAboutUs, UpdateAboutUs } from '../../shared/api/aboutUs';
import { UploadImg } from '../../shared/api/multer';
import toast, { Toaster } from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { UpdateObjects } from '../../shared/api/object';
import routes from '../../shared/constants/routes';

export default function AboutUs() {
    const param = useParams()
    const navgate = useNavigate()
    const [data, setData] = useState()
    const [title, setTitle] = useState(data?.title)
    const [name, setName] = useState(data?.name)
    const [text, setText] = useState(data?.text)
    const [text2, setText2] = useState(data?.text2)
    const [text3, setText3] = useState(data?.text3)
    const [img1, setImg1] = useState()
    const [img2, setImg2] = useState()
    const [aboutusId, setAboutusId] = useState(data?._id)
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        const fetchNews = async () => {
            const data = await GetAboutUs();
            setLoading(false)
            setData(data.aboutus[0])
            setTitle(data?.aboutus[0]?.title)
            setName(data?.aboutus[0]?.name)
            setText(data?.aboutus[0]?.text)
            setText2(data?.aboutus[0]?.text2)
            setText3(data?.aboutus[0]?.text3)
            setImg1(data?.aboutus[0]?.img[0])
            setImg2(data?.aboutus[0]?.img[1])
            setAboutusId(data?.aboutus[0]?._id)
        }
        fetchNews()
            .then((err) => {
                console.log("err");
            })

    }, []);
    const { register, handleSubmit, control, formState: { errors } } = useForm();

    const HandleAddWebsite = async () => {
        setLoading(true)
        if (text && text2 && text3 && name && title && img1) {
            await UpdateAboutUs({ title: title, text: text, text2: text2, text3: text3, img: [img1 && img1, img2 && img2], name: name }, aboutusId)
                .then((response) => {
                    if (response.status == 200) {
                        setLoading(false)
                        toast("item updated")
                        navgate(routes.ABOUTUS)
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

    return (
        <div className='ServicesFrom'>
            <div className="ServicesFrom_top">

                <button className='ServicesFrom_top-Edit btnopacity'>Edit</button>
                <button className='ServicesFrom_top-delete btnopacity'>Delete</button>
                <button className='ServicesFrom_top-Cancel'>Cancel</button>
                <button className='ServicesFrom_top-Publish' onClick={handleSubmit(HandleAddWebsite)} >Publish</button>
            </div>
            <form className="ServicesFrom_from">
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
                    </div>
                    <div className='ServicesFrom_from-mid-left'>
                        <input className='ServicesFrom_from-mid-inputtitle inputtitle2' type="text" placeholder='Загаловок' value={title} onClick={(e) => e.target.classList.add("inputtagcolor")} onChange={(e) => {
                            setTitle(e.target.value)
                            e.target.classList.add("inputtagcolor")
                        }
                        } />
                        <div className='ServicesFrom_from-mid-tags'>
                            <input className='ServicesFrom_from-mid-inputtag' type="text" placeholder='Полное нименование' value={name} onClick={(e) => e.target.classList.add("inputtagcolor")} onChange={(e) => {
                                setName(e.target.value)
                                e.target.classList.add("inputtagcolor")
                            }} />
                        </div>
                    </div>
                </div>
                <input className='ServicesFrom_from-mid-inputtext' style={{ "marginTop": "20px" }} value={text} name="text" type="text" placeholder='описания' onChange={(e) => setText(e.target.value)} />
                <input className='ServicesFrom_from-mid-inputtext' style={{ "marginTop": "60px" }} value={text2} name="text" type="text" placeholder='описания' onChange={(e) => setText2(e.target.value)} />
                <input className='ServicesFrom_from-mid-inputtext' style={{ "marginTop": "60px" }} value={text3} name="text" type="text" placeholder='описания' onChange={(e) => setText2(e.target.value)} />
            </form >
            <Toaster />
        </div >
    )
}
