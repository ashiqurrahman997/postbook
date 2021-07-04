import { React, useEffect, useState, createContext } from 'react';
import Axios from 'axios'
import { Router, Route, Link } from 'react-router-dom';





function Home() {
    const [count, setCount] = useState(10);
    const [posts, setPost] = useState([]);

    const data = {
        title: '',
        body: '',
        UserId: 2
    }

    const AddPost = () => {
        data.title = document.getElementById('title').value
        data.body = document.getElementById('body').value

        document.getElementById('title').value = ''
        document.getElementById('body').value = ''       
        Axios.post('https://jsonplaceholder.typicode.com/posts', data)
            .then(res => {
                console.log(res.data)
            })
       alert("Successfully Post")

    }
    useEffect(() => {
        Axios.get('https://jsonplaceholder.typicode.com/posts')
            .then(res => {
                console.log(res.data[0].title);
                setPost(res.data)
            })
            .catch(err => console.log(err))

    }, []);


    const LoadMore = () => {

        setCount(count + 10)
        console.log(count);
    }

    return (
        <div className='center' >
          
            <div className='card' >              
                    <label>Title</label>
                    <input type='text' name='tile' id='title' required={true} /><br />
                    <label>Body</label>
                    <textarea id='body' name='body'  required={true} /><br />
                    <button type='submit' onClick={AddPost} > Add Post  </button>           
          </div>           
        
            <hr />
            <h1 className="center"> All Posts</h1>
            <hr />  <hr />
            <div >

                <ol type="1">

                    {posts.slice(0, count).map((post, index) => {
                        return (
                            <div key={index}>
                                <li>

                                    <h3>  Title : {post.title} </h3>
                                    <p>Body: {post.body}</p>

                                    <Link className='nav-link' to={"/postdetails/" + post.id} >Show Post Details</Link>

                                    <hr></hr>

                                </li>
                            </div>
                        )
                    })}


                </ol>
            </div>
            <button onClick={LoadMore}> Load More   </button>

            <br /><br />

        </div>
    );
}

export default Home;
