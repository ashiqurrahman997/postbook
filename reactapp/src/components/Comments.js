import React from 'react';
import { Context } from '../Pages/PostDetails';
function Comments() {
    return (
        <div>
            
            <Context.Consumer>
                {
                    value => value.map((data, index) => {
                        return (
                            <div key={index}className='card'>
                                  
                                <li>
                                    <p> <u>Name: </u>{data.name}</p>
                                    <p><u>Comments:</u> {data.body}</p>
                                   
                                </li>
                                <hr/>
                            </div>

                        )
                    })

                }

            </Context.Consumer>
        </div>
    );
}

export default Comments;