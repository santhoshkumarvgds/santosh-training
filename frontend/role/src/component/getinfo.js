import React from 'react';
import {UserConsumer} from '../context/context';

 class Info extends React.Component{
    render(){
        return(
            <UserConsumer>
            {user=>{
                return(
                    <div>
                    <p>{user.name}</p>
                    <p>{user.email}</p>
                    <p>{user.role}</p>
                    </div>
                )
            }

            }
            </UserConsumer>
        )
    }
}
export default Info