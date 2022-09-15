import client from "../lib/apollo"
import { useRouter } from 'next/router'
import { gql } from "@apollo/client"
import React, { useState, useEffect } from 'react' 

const queryProfile = async () => {
    try {
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

        
    } catch(err) {
        alert(err)
    }
}

export default function Profile() {
    const router = useRouter()
    const [isLogin, setLogin] = useState(false)

    useEffect(async () => {
        const isLogin = sessionStorage.getItem("isLogin") ? true : false
        setLogin(isLogin)

        if(!isLogin) return

        
    })

    if (!isLogin) {
        router.push("/login")
        return
    }

    

    return (
        <div>

        </div>
    )
}