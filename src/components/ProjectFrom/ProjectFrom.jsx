import React, { useEffect, useState } from 'react'
import img from "../../assets/images/Group48098387.png";

import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import routes from '../../shared/constants/routes';
import { GetObjectsbyid, UpdateObjects } from '../../shared/api/object';
import toast, { Toaster } from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import Loader from '../ul/loader/Loader';
import { DeleteImg, UploadImg } from '../../shared/api/multer';

export default function ProjectFrom() {
    const navgate = useNavigate()
    const { register, handleSubmit, control, setValue, formState: { errors }, watch } = useForm();
    const watchedFiles = watch()
    const [params, setSearchParams] = useSearchParams()


    const [img1, setImg1] = useState([])
    const [loading, setLoading] = useState(true)
    const param = useParams()

    useEffect(() => {
        const fetchObject = async () => {
            const data = await GetObjectsbyid(param?.id);
            setValue("uz_title", data?.uz_title)
            setValue("ru_title", data?.ru_title)
            setValue("tr_title", data?.tr_title)
            setValue("en_title", data?.en_title)
            setValue("uz_text", data?.uz_text)
            setValue("ru_text", data?.ru_text)
            setValue("tr_text", data?.tr_text)
            setValue("en_text", data?.en_text)
            setValue("uz_tag", data?.uz_tag)
            setValue("ru_tag", data?.ru_tag)
            setValue("tr_tag", data?.tr_tag)
            setValue("en_tag", data?.en_tag)
            setValue("data", data?.data)


            setImg1(data?.img)

            setLoading(false)
        }
        fetchObject()
            .then((err) => {
                console.log("err");
            })

    }, []);

    const HandleAddWebsite = async (data) => {
        setLoading(true)
        if (data) {
            await UpdateObjects({ img: img1, ...data }, param?.id)
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
    useEffect(() => {
        if (!['uz', 'ru', 'tr', 'en']?.includes(params.get('lang'))) {
            setSearchParams({ lang: 'uz' })
        }
    }, [params.get('lang')])
    return (
        <form className='ServicesFrom'>
            {loading ? <Loader /> : ''}
            <div className="ServicesFrom_top">
                <div className='ServicesFrom_top-back'><Link className='ServicesFrom_top-back2' to={routes.PROJECTS}>Добавление объекта</Link></div>
                <div className='ServicesFrom_top-Edit btnopacity'>Изменить</div>
                <div className='ServicesFrom_top-delete btnopacity'>Удалить</div>
                <div className='ServicesFrom_top-Cancel'>Отменить</div>
                <button className='ServicesFrom_top-Publish' onClick={handleSubmit(HandleAddWebsite)}>Сохранить</button>
            </div>
            <div className="ServicesFrom_from" >
                <ul className="ServicesFrom_from-languageslist">
                    <li onClick={() => setSearchParams({ lang: 'uz' })} className={params.get('lang') === 'uz' ? 'activelanguage' : ''}>O'zbekcha</li>
                    <li onClick={() => setSearchParams({ lang: 'ru' })} className={params.get('lang') === 'ru' ? 'activelanguage' : ''}>Русский</li>
                    <li onClick={() => setSearchParams({ lang: 'tr' })} className={params.get('lang') === 'tr' ? 'activelanguage' : ''}>Türkçe</li>
                    <li onClick={() => setSearchParams({ lang: 'en' })} className={params.get('lang') === 'en' ? 'activelanguage' : ''}>English</li>
                </ul>
                <div className='ServicesFrom_from-mid mid2'>
                    <div className='mid2-div'>
                        <label className='ServicesFrom_from-img img2' >
                            <input className='img2-img' type={"file"} onChange={hendleimg} />
                            <img className='ServicesFrom_from-imgvie2' src={img} alt="" width={105} height={81} />
                        </label>
                        {img1 && img1.map((e, i) => (
                            <div className='ServicesFrom_from-imgviedivcha'>
                                <img key={i} className='ServicesFrom_from-imgvie' src={e?.url || img} alt="" width={105} height={81} />
                                <div onClick={() => {
                                    DeleteImg({ path: e?.path })
                                    setImg1((state) => state.filter((_, index) => index !== i))
                                }}> X</div>
                            </div>
                        ))}
                    </div>
                    <div className='ServicesFrom_from-mid-left'>

                        <textarea className='ServicesFrom_from-mid-inputtitle inputtitle2' type="text" placeholder='Название объекта' onClick={(e) => e.target.classList.add("inputtagcolor")}
                            {...register(`${params.get('lang')}_title`, {
                                onChange: e => {
                                    e.target.classList.add("inputtagcolor")
                                    e.target.style.height = "51px";
                                    e.target.style.height = (e.target.scrollHeight) + "px";
                                }
                            })}
                            value={watchedFiles?.[`${params.get('lang')}_title`] || ''} >

                        </textarea>
                        <div className='ServicesFrom_from-mid-tags'>
                            <input className='ServicesFrom_from-mid-inputtag' type="text" placeholder='Узбекистан' onClick={(e) => e.target.classList.add("inputtagcolor")}
                                {...register(`${params.get('lang')}_tag`, { required: true })}
                                value={watchedFiles?.[`${params.get('lang')}_tag`] || ''}
                            />
                        </div>
                        <input className='ServicesFrom_from-mid-date' type="date"  {...register('data', {
                            required: true,
                        })}
                            value={watchedFiles?.data || ''} />
                    </div>
                </div>
                <textarea className='ServicesFrom_from-mid-inputtext' name="text" type="text" placeholder='описания'
                    {...register(`${params.get('lang')}_text`, {
                        onChange: e => {
                            e.target.style.height = "37px";
                            e.target.style.height = (e.target.scrollHeight) + "px";
                        }
                    })}
                    value={watchedFiles?.[`${params.get('lang')}_text`] || ''} >

                </textarea>
            </div>
            <Toaster />
        </form>
    )
}
