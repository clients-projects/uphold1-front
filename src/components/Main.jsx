import React from 'react'
import Form from './Form'

import '../styles/styles.css'
import LogoWhite from '../assets/logo-white.svg'


const Main = () => {

    return (
        <div className='grid '>
            <div className=' grid'>

                <img src={LogoWhite} alt='' className='lg:w-1/4 w-5/12 justify-self-center my-7 '/>
              
                <div className='mx-4'>
                    <Form />
                </div>
            </div>

      
        </div>
    )
}

export default Main
