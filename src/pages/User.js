import React from 'react'
import Profile from '../components/User/Profile';

export default function User({match}){
    const {params} = match;
   
    //const params=useParams();
    
    //console.log(params);
    return (
        <div>
            <Profile username={params.username} />
        </div>
    )
}
