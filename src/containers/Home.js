import React from 'react'
import Form from '../components/Form'

import '../styles/styles.css'

function Layout() {
    return (
        <div className='h-screen overflow-x-hidden justify-items-center md:grid'>
            <div className=' w-full md:mx-auto h-full justify-self-center md:w-4/12'>
                    <Form />
                
            </div>
        </div>
    )
}

export default Layout
