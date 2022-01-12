import React from 'react'

import Main from '../components/Main'
import '../styles/styles.css'

function Layout() {
    return (
        <div className='h-screen overflow-x-hidden justify-items-center'>
            <div className='md:grid w-full md:mx-auto h-full'>
                
                <div className=' my-9 justify-self-center md:w-4/12'>
                    <Main />
                </div>
               
            </div>
        </div>
    )
}

export default Layout
