import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { gql, useQuery } from "@apollo/client"


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
    const [isLogin, setLogin] = useState(false)
    const { loading, error, data } = useQuery(PROFILE_GQL)

    useEffect(() => {
        setLogin((sessionStorage.getItem("isLogin") == "true") ? true : false)
    })
   
    if (loading) return <div>loading</div>

    const {email="", defaultBillingAddress={} } = data.me
    const { streetAddress1="", country={country:""} } = defaultBillingAddress ? defaultBillingAddress : {}

    if (error) { console.error(error) }

    return (
        <div>
            <p>Email: {email}</p>
            <p>StreetAddress: {streetAddress1}</p>
            <p>Country: {country.country}</p>
        </div>
    )
}