import { useRouter } from 'next/router'
import { gql, useQuery } from "@apollo/client"
import React, { useState, useEffect } from 'react'

const PROFILE_GQL = gql`
    query profile {
        me {
            id
            email
            defaultBillingAddress {
                streetAddress1
                country {
                    country
                }
            }
        }
    }
`

export default function Profile() {
    const router = useRouter()
    const [isLogin, setLogin ] = useState(false)

    useEffect(() => {
        const isLogin = sessionStorage.getItem("isLogin") == true? true : false
        setLogin(isLogin)
        if (!isLogin) { router.push("/login") }
    })

    if(isLogin) return (<div></div>)

    const { loading, error, data } = useQuery(PROFILE_GQL);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        console.error(error);
        return <div>Error!</div>;
    }

    const { email, defaultBillingAddress } = data.me
    const { streetAddress1, country } = defaultBillingAddress

    return (
        <div>
            <p>Email: {email}</p>
            <p>StreetAddress: {streetAddress1}</p>
            <p>Country: {country.country}</p>
        </div>
    )
}