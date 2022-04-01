import React from 'react'
import { Route } from 'react-router'

export default function LoginTemplate(props) {

    let { Component, ...resRoute } = props

   


    return (
        <Route {...resRoute} render={(propsRoute) => {

            return <div style={{
                backgroundImage: `url('https://scontent.fsgn7-1.fna.fbcdn.net/v/t39.30808-6/277565056_2103287423173148_13245894924444002_n.jpg?_nc_cat=106&ccb=1-5&_nc_sid=8bfeb9&_nc_ohc=5T06GXafMvsAX_Fwrg7&tn=R0tIwYU3eR8hikK-&_nc_ht=scontent.fsgn7-1.fna&oh=00_AT_G-J-OQ_uaoxtB5mBpvp5jVAlluSGWNv3BvRLamoqF1g&oe=624B7995')`,
                height: '100%',
                width: '100%',
                position: 'fixed',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
            }}>
                <div style={{ backgroundColor: 'rgba(0,0,0,0.6)', width: '100%', height: '100%' }}>
                    <Component {...propsRoute} />
                </div>
            </div>

        }}>
        </Route>
    )
}
