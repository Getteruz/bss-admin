import React from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';


import { Loginuser } from '../../shared/api/auth';

import routes from '../../shared/constants/routes';

import { setCookie, getCookie } from 'typescript-cookie'
export default function LoginPage() {
    const { register, handleSubmit, control, formState: { errors } } = useForm();

    const navigate = useNavigate()
    const loginSubmit = async (data) => {
        const res = await Loginuser(data)
        if (res.status == 200) {
            setCookie('accesToken', res?.data?.token);
            navigate(routes.HOME)
        } else {
            alert('failed')
        }
    };
    return (
        <form >
            <input type="text"
                {...register("name", {
                    required: true,
                })} />
            <input type={"password"}
                {...register("password", {
                    required: true,
                })} />
            <button onClick={handleSubmit(loginSubmit)}>login</button>
        </form>
    )
}
