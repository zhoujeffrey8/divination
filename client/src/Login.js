import {React, useState} from 'react';

export default function Login() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    async function loginUser(event) {
        event.preventDefault()
        const response = await fetch("/users/login", {
            method: "Post",
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
            email, password
            }),
        })

        const data = await response.json()
        if(data.user) {
            localStorage.setItem('token', data.user)
            alert('Login successful')
            window.location.href = '/home'
        } else {
            alert('Please check your username and password')
        }
        console.log("Data:")
        console.log(data)
    }

    return(
        <div>
            <h1>Login</h1>
            <form onSubmit={loginUser}>
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