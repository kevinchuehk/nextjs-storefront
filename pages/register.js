import client from "../lib/apollo"
import { useRouter } from 'next/router'
import { gql } from "@apollo/client"
import React, { useState, useEffect } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'


export default function Register() {
    const [isLogin, setLogin] = useState(false)

    useEffect(() => {
        const isLogin = sessionStorage.getItem("isLogin") ? true : false
        setLogin(isLogin)
    })

    if (isLogin) {
        router.push("/profile")
        return
    }

    

    return(
        <div></div>
    )
}