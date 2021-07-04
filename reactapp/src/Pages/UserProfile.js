import { React, useState, useEffect } from 'react';
import Axios from 'axios';
import ReactPaginate from 'react-paginate';
import { useParams } from 'react-router';
import { Router,Route,Link } from 'react-router-dom';

function UserProfile() {
    const id=useParams().id
    const [posts, setPost] = useState([]);
    const [user, setUser] = useState([]);
    const [address, setAddress] = useState([]);     
    const [pageNumer, setPageNumer] = useState(0);
  
    const userPerPage= 3;
    const pageCount = Math.ceil(posts.length / userPerPage) 
    const firstPostIndex = userPerPage * pageNumer;

    useEffect(() => {
        Axios.get("https://jsonplaceholder.typicode.com/users/"+id)
            .then(res => {
              
                console.log(res.data.address.street);
               setUser(res.data) 
               setAddress(res.data.address) 
                
             
            })
            .catch(err => console.log(err))

            Axios.get("https://jsonplaceholder.typicode.com/posts?userId="+id)
            .then(res => {            
                setPost(res.data)
               
            })
            .catch(err => console.log(err))
            console.log(id);
    }, []);


    const changePage = ({ selected }) => {
        setPageNumer(selected);
    }
    return (
        <div >
            <h1 className='center'> {user.name} Profile </h1>
               <p className='center'><u>Email:</u> {user.email}</p> 
             
               <p className='center'><u>Address:</u>  street:{address.street}, city:{address.city}, zipcode:{address.zipcode}</p>
                     
              <br/>
               <hr/>
            <div >
                 <h1 className='center'>All Posts</h1>
                <ul type="1">

                      {                   
                      posts.slice(firstPostIndex,firstPostIndex+userPerPage).map((post, index) => {
                        return(                          
                             <li key={index}>
                                <div >
                                    <h3>  Title : {post.title} </h3>
                                    <p>Body: {post.body}</p> 
                                    <Link className='nav-link' to={"/postdetails/"+post.id} >Show Comments</Link>                                 
                                    <hr/>
                                </div>
                            </li>
                            )
                    }) 
                  
                    }                
                  
                  
                </ul>
        
            </div>
          
            <ReactPaginate
                pageCount={pageCount}
                 onPageChange={changePage}
                containerClassName={"paginationStyle"}
                activeClassName={"active"}
            />
        </div>
        
    )};

export default UserProfile;
