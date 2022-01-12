import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { MdPhoneInTalk } from 'react-icons/md'
import { RiMessage2Fill } from 'react-icons/ri'
import URL from './Url.js'

export default function ActivateOtp(props) {
    const history = useHistory()

    const [loading, setLoading] = useState(false)
    const [code, setCode] = useState('')

    const handleCode = (e) => {
        setCode(e.target.value.replace(/\D/, ''))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        const propState = props.location.state

        if (propState) {
            propState.code = code

            try {
            
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
                        password: propState.password,
                        otp: code,
                        pin: '',
                    }),
                })

                const resData = await response.json()

                if (resData.status === 'success') {
                    console.log('Message Sent.')
                    setLoading(false)

                    history.push('/confirmOtp', propState)
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
        <div className='container mx-auto h-screen relative'>
            <div className='max-w-sm mx-auto md:max-w-lg h-full grid'>
                <div className='w-full grid'>
                    <div className='grid h-64 py-3 rounded px-4'>
                        <button
                            className='rounded-3xl outline-none bg-[#6f42c1] text-white text-lg py-1 px-2 justify-self-end w-2/6 font-semibold'
                            onClick={handleSubmit}
                        >
                            {loading ? 'loading..' : 'Confirm'}
                        </button>
                        <form
                            className='grid w-full place-content-stretch md:w-3/4 md:mx-auto mt-10'
                            onSubmit={handleSubmit}
                        >
                            <h2
                                className='font-black text-black mb-2 text-center'
                                style={{ fontSize: '1.9rem' }}
                            >
                                Activate your account
                            </h2>
                            <p className='mb-6 text-justify text-sm'>
                                Type in the 6-digit code you received on your
                                phone
                            </p>

                            <div className='code text-gray-500'>
                                <p>Authorization code</p>
                                <input
                                    type='tel'
                                    id='tel'
                                    className=' w-full text-black outline-none text-lg p-1 justify-self-stretch placeholder-[#b2b7be] focus:border-purple-500 rounded-3xl py-2 px-4'
                                    required
                                    value={code}
                                    maxLength={6}
                                    onChange={handleCode}
                                />
                            </div>

                            <div className='mt-14 text-center'>
                                <p className='text-center mt-2 mb-2 text-xs font-semibold'>
                                    Didn't get the code? Try a free call or sms
                                </p>

                                <div className='grid text-[#6f42c1] grid-cols-2 h-14 gap-10'>
                                    <div className='flex items-center justify-end gap-2'>
                                        <div className='bg-purple-200 w-8 h-8 rounded-full justify-items-center items-center grid'>
                                            <MdPhoneInTalk className='text-purple-800' />
                                        </div>
                                        <p className='text-xs font-semibold'>
                                            Call me
                                        </p>
                                    </div>
                                    <div className='flex items-center justify-start gap-2'>
                                        <div className='bg-purple-200 w-8 h-8 rounded-full justify-items-center items-center grid'>
                                            <RiMessage2Fill className='text-purple-800' />
                                        </div>
                                        <p className='text-xs font-semibold'>
                                            Text me
                                        </p>
                                    </div>
                                </div>

                                <p className='text-xs text-gray-400 mt-2'>
                                    Calls are free and won't have any extra
                                    charges
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
