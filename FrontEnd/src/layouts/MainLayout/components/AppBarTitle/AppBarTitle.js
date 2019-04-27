import React from 'react'
import classes from './AppBarTitle.scss'
import { User } from 'components/BasicComponents'
import { Logout } from 'components/BasicComponents'

export const AppBarTitle = ({data, fetching, currentApplicationState  }) => {
    return ( 
    <div style={{ display: 'flex', height: '100%' }}>
        <span style={{width: '50px'}}></span>
        {data.center ? data.center(currentApplicationState) : <div />}        
        <div style={{ display: 'flex', flexGrow: '1', alignItems: 'center', justifyContent: 'space-between', lineHeight: '36px' }}>
            {data.right ? data.right(currentApplicationState) : <div />}               
        </div>
        <span style={{width: '300px'}}>
        <User /> </span>    
    </div>
)}

AppBarTitle.propTypes = {
    fetching: React.PropTypes.bool.isRequired,
    data: React.PropTypes.object.isRequired,
    currentApplicationState: React.PropTypes.object.isRequired
}

export default AppBarTitle
