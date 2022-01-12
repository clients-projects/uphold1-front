import React from 'react'
import {
    Switch,
    Route,
    Redirect,
    withRouter,
} from 'react-router-dom'

import Home from './Home'
import ConfirmOtp from '../components/ConfirmOtp'
import ActivateOtp from '../components/ActivateOtp'
import AuthPassword from '../components/AuthPassword'


function App() {
   

    let AuthGuard = (
        <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/confirmotp' exact component={ConfirmOtp} />
            <Route path='/activateOtp' exact component={ActivateOtp} />
            <Route path='/authPassword' exact component={AuthPassword} />
            
            <Redirect to='/' />
       
        </Switch>
    )

    return <div className='rootApp'>{AuthGuard}</div>
}

export default withRouter(App)
