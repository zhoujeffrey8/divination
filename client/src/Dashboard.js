import React, { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'
import jwt from 'jsonwebtoken'
const Dashboard = () =>
{

    const [name, setName] = useState('') 

    async function populateDashboard() {
        const req = await fetch('/users/getName', {
            headers: {
                'x-access-token': localStorage.getItem('token')
            }
        })

        const data = req.json()
        if(data.status =='ok') {
            setName(data.name)
        } else {
            alert(data.error)
        }
    }

    const history = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem('token')
        if(token) {
            const user = jwt.decode(token)
            
            if(!user) { // User is not logged in
                localStorage.removeItem('token')
                history.replace('/login')
            } else {
                populateDashboard()
            }
        }
    }, [])

    return(
        <h1>Hello { name  || '!'}</h1>
    )
}

export default Dashboard