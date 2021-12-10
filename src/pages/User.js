import React from 'react'

export default function User({match}){
    const {params} = match;
   
    //const params=useParams();
    
    console.log(params);
    return (
        <div>
            User
        </div>
    )
}
