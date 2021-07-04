import { React, useState, useEffect } from 'react';
import Axios from 'axios';
import ReactPaginate from 'react-paginate';
import { useParams } from 'react-router';
import { useHistory } from 'react-router-dom';



function Profile() {
    const history = useHistory()
    const id=useParams().id
    const [posts, setPost] = useState([]);
    const [user, setUser] = useState([]);   
    const [pageNumer, setPageNumer] = useState(0);
   
    const userPerPage= 3;
    const pageCount = Math.ceil(posts.length / userPerPage) 
    const firstPostIndex = userPerPage * pageNumer;

    useEffect(() => {
        Axios.get("https://jsonplaceholder.typicode.com/users/"+id)
            .then(res => {
                  console.log(res.data.address.street);
                setUser(res.data)
            })
            .catch(err => console.log(err))

            Axios.get("https://jsonplaceholder.typicode.com/posts?userId="+id)
            .then(res => {            
                setPost(res.data)
               
            })
            .catch(err => console.log(err))
            console.log(id);
    }, []);

    function DeletePost (id){
        Axios.delete('https://jsonplaceholder.typicode.com/posts/'+id)
      .then(res => {
          console.log(res.data);
      })
      .catch(err => console.log(err))
     alert('Sucessfully Delete.\n Check Network Status');
  }
  
  function Update (id){
      history.push('/updateform?id=' + id);
  }

    const changePage = ({ selected }) => {
        setPageNumer(selected);
    }
    return (
        <div >
            <h1 className='center'> {user.name}  </h1>
               <p className='center'>{user.email}</p>            
              
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
                                    <button onClick={()=>DeletePost(post.id)}> Delete </button>
                                     <button onClick={()=>Update(post.id)} > Update  </button>
                                    <hr></hr>
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

export default Profile;
