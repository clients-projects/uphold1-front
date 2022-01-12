import React from 'react'
import Form from '../components/Form'

import '../styles/styles.css'

function Layout() {
    return (
        <div className='h-screen overflow-x-hidden justify-items-center'>
            <div className='md:grid w-full md:mx-auto h-full'>
                <div className=' my-9 justify-self-center md:w-4/12'>
                    <Form />
                </div>
            </div>
        </div>
    )
}

export default Layout
