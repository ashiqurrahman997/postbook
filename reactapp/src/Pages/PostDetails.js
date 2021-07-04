import { useParams } from 'react-router';
import { React, useEffect, useState, createContext } from 'react';
import Axios from 'axios';
import Comments from '../components/Comments';

export const Context = createContext()

function PostDetails() {
    const id = useParams();
    const [comments, setComments] = useState([]);
    const [posts, setPost] = useState([]);
    useEffect(() => {
        Axios.get('https://jsonplaceholder.typicode.com/posts/' + id.id)
            .then(res => {
                console.log(res.data.title);
                setPost(res.data)
            })
            .catch(err => console.log(err))

    }, []);

    useEffect(() => {
        Axios.get('https://jsonplaceholder.typicode.com/posts/' + id.id + '/comments')
            .then(res => {
                //  console.log(res.data[0]);
                setComments(res.data)
            })
            .catch(err => console.log(err))

    }, []);



    return (
        <div className='center1'>
            <br /> 
            <h1 className='center'> Post</h1>
            <div className='card'>
            <h3 className='center'>{posts.title}</h3>
            <p className='boder'>{posts.body}</p>
            </div>
            <hr />
            <h1 className='center'> Comments</h1>

            <ol type="1">
                <Context.Provider value={comments}>
                    <Comments />
                </Context.Provider>

            </ol>

        </div>
    );
}

export default PostDetails;

