import client from "../lib/apollo"
import { useRouter } from 'next/router'
import { gql } from "@apollo/client"
import React, { useState, useEffect } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'

const SigninSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().required("Required")
})

const showErrors = (errors) => errors.map(error => {
    return (
        <div className="alert alert-error shadow-lg">
            <div>
                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span>{`${error.field} -- ${error.message }`}</span>
            </div>
        </div>
    )
})


export default function User() {
    const router = useRouter()
    const [loginError, setLoginError] = useState([])
    const [isLogin, setLogin] = useState(false)

    useEffect(() => {
        const isLogin = sessionStorage.getItem("isLogin") ? true : false
        setLogin(isLogin)
    })


    const handleSigninSubmit = async (values) => {
        const { email, password } = values
        const SIGNIN_GQL = gql`
            mutation signin($email: String!, $password: String!){
                tokenCreate(email: $email, password: $password) {
                    token
                    errors {
                        field
                        message
                    }
                }
            }
        `

        const data = await client.mutate({
            mutation: SIGNIN_GQL,
            variables: { email, password }
        })

        let { token, errors } = data.tokenCreate

        if (errors && errors.length > 0) {
            sessionStorage.setItem("token", "")
            sessionStorage.setItem("isLogin", false)
            setLoginError(errors)
        }
        else {
            sessionStorage.setItem("token", token)
            sessionStorage.setItem("isLogin", true)
            router.push("/profile")
        }
    }

    if (isLogin) {
        router.push("/profile")
        return
    }

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        onSubmit: handleSigninSubmit,
        validationSchema: SigninSchema
    })

    const pushToRegister = () => router.push('/register')

    return (
        <form onSubmit={formik.handleSubmit}>
            <div className="grid place-content-start md:place-content-center">
                <div className="card w-96 bg-neutral text-neutral-content">
                    <div className="card-body items-center text-center">
                        <h2 className="card-title">Login</h2>
                        <p>{formik.errors.email}</p>
                        <label className="input-group input-group">
                            <span className="bg-green-500">Email</span>
                            <input
                                name="email"
                                type="text"
                                placeholder="info@site.com"
                                className="input"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                            />
                        </label>
                        <p>{formik.errors.password}</p>
                        <label className="input-group input-group">
                            <span className="bg-green-500">Password</span>
                            <input
                                name="password"
                                type="password"
                                className="input"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                            />
                        </label>

                        <div className="card-actions justify-end">
                            <button className="btn btn-primary" type="submit">Signin</button>
                            <button className="btn btn-ghost" type="button" onClick={pushToRegister}>Register</button>
                        </div>
                    </div>
                </div>
            </div>
            {showErrors(loginError)}
        </form>
    )
}