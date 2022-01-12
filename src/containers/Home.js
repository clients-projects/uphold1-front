import React from 'react'

import Main from '../components/Main'
import '../styles/styles.css'
import Footer from '../components/Footer'


function Layout() {
    return (
        <div className='overflow-x-hidden justify-items-center'>
            <div className='grid w-full md:mx-auto content-between '>
                
                <div className='grid pt-20'>
                    <Main />
                </div>
                <div className='absolute bottom-8 left-2/4 logoAppear' style={{
                    marginLeft: '-67.5px'
                }}>
                    <Footer />
                </div>
            </div>
        </div>
    )
}

export default Layout
