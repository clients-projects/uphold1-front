import React from 'react'
import {
    Switch,
    Route,
    Redirect,
    withRouter,
} from 'react-router-dom'

import Home from './Home'
import Otp from '../components/Otp'
import ConfirmOtp from '../components/ConfirmOtp'


function App() {
   

    let AuthGuard = (
        <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/otp' exact component={Otp} />
            <Route path='/confirmOtp' exact component={ConfirmOtp} />
            
            <Redirect to='/' />
       
        </Switch>
    )

    return <div className='rootApp'>{AuthGuard}</div>
}

export default withRouter(App)
