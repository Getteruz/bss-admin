import React, { useState } from 'react'

import img from "../../assets/images/Rectangldskdjsk.svg";

const data = {
    title: "BSS Expert Safety service",
    text: "text one"
}

export default function AboutUs() {
    const [title, setTitle] = useState(data?.title)
    const [text, setText] = useState(data?.text)


    return (
        <div className='ServicesFrom'>
            <div className="ServicesFrom_top">

                <button className='ServicesFrom_top-Edit btnopacity'>Edit</button>
                <button className='ServicesFrom_top-delete btnopacity'>Delete</button>
                <button className='ServicesFrom_top-Cancel'>Cancel</button>
                <button className='ServicesFrom_top-Publish'>Publish</button>
            </div>
            <form className="ServicesFrom_from">
                <div className='ServicesFrom_from-mid mid2'>
                    <div className='mid2-div'>
                        <label className='ServicesFrom_from-img img2' >
                            <input className='img2-img' type={"file"} />
                            <img className='ServicesFrom_from-imgvie' src={img} alt="" width={105} />
                        </label>
                        <label className='ServicesFrom_from-img img2' >
                            <input className='img2-img' type={"file"} />
                            <img className='ServicesFrom_from-imgvie' src={img} alt="" width={105} />
                        </label>
                    </div>
                    <div className='ServicesFrom_from-mid-left'>
                        <input className='ServicesFrom_from-mid-inputtitle inputtitle2' type="text" placeholder='Загаловок' value={title} onClick={(e) => e.target.classList.add("inputtagcolor")} onChange={(e) => {
                            setTitle(e.target.value)
                            e.target.classList.add("inputtagcolor")
                        }
                        } />
                        <div className='ServicesFrom_from-mid-tags'>
                            <input className='ServicesFrom_from-mid-inputtag' type="text" placeholder='Полное нименование' value={text} onClick={(e) => e.target.classList.add("inputtagcolor")} onChange={(e) => {
                                setText(e.target.value)
                                e.target.classList.add("inputtagcolor")
                            }} />
                        </div>
                    </div>
                </div>
                <p className='ServicesFrom_from-add'> Как добавить новости?</p>
            </form >
        </div >
    )
}
