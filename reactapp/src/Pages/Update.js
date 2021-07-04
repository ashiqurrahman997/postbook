import { React, useEffect, useState } from 'react';
import Axios from 'axios';
import '../style.css'
function Update() {
    const id = new URLSearchParams(window.location.search).get('id');
    const [posts, setPost] = useState([]);

    useEffect(() => {
        Axios.get('https://jsonplaceholder.typicode.com/posts/' + id)
            .then(res => {

                setPost(res.data)
                document.getElementById('utitle').value = res.data.title
                document.getElementById('ubody').value = res.data.body
            })
            .catch(err => console.log(err))

    }, []);

    const Update =()=> {
        Axios.put('https://jsonplaceholder.typicode.com/posts/'+id, {
            title: document.getElementById('utitle').value,
            body: document.getElementById('ubody').value
        })
            .then(response => {
                console.log(response);
            })
            .catch(err => {
                console.log(err);
            });
            alert("Successfully Updated.\nCheck Network Status.")
    }

    return (
        <div>
        <h1 className='center'>UPDATE POST</h1>     
        <div className='card' >  
               
        <label>Title</label>
        <input type='text' id='utitle' /><br />
        <label>Body</label>
        <textarea  id='ubody' required  /><br />
        <button type='submit' onClick={Update} > Update Post  </button>           
</div>   
</div>
    );
}

export default Update;