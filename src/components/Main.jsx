import React from 'react'
import Form from './Form'

import '../styles/styles.css'
import Logo from '../assets/bundle.png'

const Main = () => {
    return (
        <>
            <img src={Logo} alt='' className=' justify-self-center' />

            <Form />
        </>
    )
}

export default Main
