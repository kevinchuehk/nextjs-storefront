import client from "../lib/apollo"
import { useRouter } from 'next/router'
import { gql } from "@apollo/client"
import React, { useState, useEffect } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'

const RegisterSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().required("Required"),
    confirmPassword: Yup.string().oneOf([Yup.ref("password"), null], "please repeat the password")
})

const showErrors = (errors) => errors.map(error => {
    return (
        <div className="alert alert-error shadow-lg">
            <div>
                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span>{`${error.field} -- ${error.code}`}</span>
            </div>
        </div>
    )
})


const REGISTER_GQL = gql`
    mutation register($email: String!, $password: String!, $channel: String!) {
        accountRegister(input: {email: $email, password: $password, channel: $channel}) {
            errors {
                field
                code
            }
            user {
                email
                isActive
            }
        }
    }
`

export default function Register() {
    const router = useRouter()
    const [registerError, setRegisterError] = useState([])
    const [isLogin, setLogin] = useState(false)

    useEffect(() => {
        const isLogin = sessionStorage.getItem("isLogin") == "true" ? true : false
        setLogin(isLogin)
    })

    const handleRegisterSubmit = async (values) => {
        const { email, password } = values

        try {
            const { data } = await client.mutate({
                mutation: REGISTER_GQL,
                variables: { email, password, channel: "default-channel" }
            })

            const { user, errors } = data.accountRegister
            if (errors && errors.length > 0) {
                setRegisterError(errors)
                console.log(data)
            }
            else {
                router.push("/login")
            }

        } catch (err) {
            alert(err)
        }
    }

    if (isLogin == true) {
        router.push("/profile")
        return
    }


    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            confirmPassword: ''
        },
        onSubmit: handleRegisterSubmit,
        validationSchema: RegisterSchema
    })

    const pushToLogin = () => router.push("/login")

    return (
        <form onSubmit={formik.handleSubmit}>
            <div className="grid grid-rows-3 place-content-center md:place-content-center">
                <div className="card w-96 bg-neutral text-neutral-content">
                    <div className="card-body items-center text-center">
                        <h2 className="card-title">Register</h2>
                        <p>{formik.errors.email}</p>
                        <label className="input-group">
                            <span className="bg-sky-600">Email</span>
                            <input
                                name="email"
                                type="text"
                                placeholder="info@site.com"
                                className="input input-bordered"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                            />
                        </label>
                        <p>{formik.errors.password}</p>
                        <label className="input-group">
                            <span className="bg-sky-600">Password</span>
                            <input
                                name="password"
                                type="password"
                                className="input input-bordered"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                            />
                        </label>

                        <p>{formik.errors.confirmPassword}</p>
                        <label className="input-group">
                            <span className="bg-sky-600">Repeat Password</span>
                            <input
                                name="confirmPassword"
                                type="password"
                                className="input input-bordered"
                                value={formik.values.confirmPassword}
                                onChange={formik.handleChange}
                            />
                        </label>

                        <div className="card-actions justify-end">
                            <button className="btn btn-primary" type="submit" disabled={!formik.isValid || !formik.dirty}>Register</button>
                            <button className="btn btn-ghost" type="button" onClick={pushToLogin}>Signin</button>
                        </div>
                    </div>
                </div>
            </div>
            {showErrors(registerError)}
        </form>
    )
}