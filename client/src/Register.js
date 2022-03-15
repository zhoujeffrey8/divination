import {React, useState} from 'react';
import {useNavigate} from 'react-router-dom'

export default function Register() {
    const history = useNavigate()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    async function registerUser(event) {
        event.preventDefault()
        const response = await fetch("/users/register", {
            method: "Post",
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                name, email, password
            }),
        })

        const data = await response.json()

        if(data.status === 'ok') {
            history('/login')
        }

    }

    return(
        <div>
            <h1>Register</h1>
            <form onSubmit={registerUser}>
                <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder='Name'></input>
                <input 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='Email'></input>
                <input 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder='Password'></input>
                <input type="submit" value="Register"/>
            </form>
        </div>
    )
}