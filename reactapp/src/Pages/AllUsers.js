import { React, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Axios from 'axios'
import ReactPaginate from 'react-paginate'
import '../style.css'


function Users() {
    const history = useHistory()
    const [user, setUser] = useState([]);
    const [userName, setUserName] = useState('');
    const [emailName, setEmailName] = useState('');
    const [webSite, setWebsite] = useState('');

    const [pageNumer, setPageNumer] = useState(0);
    const [userPerPage, setUserperPage] = useState(5);
   

    const firstUserIndex = userPerPage * pageNumer;

    const pageCount = Math.ceil(user.length / userPerPage);



    useEffect(() => {
        Axios.get('https://jsonplaceholder.typicode.com/users')
            .then(res => {
                setUser(res.data)
            
            })
            .catch(err => console.log(err))
    }, []);

    var ur=user
    const changePage = ({ selected }) => {
        setPageNumer(selected);
    }


    const sortName_Asc = () => {
        setUser((user)=>user.slice().sort((a, b) => { return a.name.localeCompare(b.name) }));         
      
    }

    const sortName_Desc = () => {

        setUser((user)=>user.slice().sort((a, b) => { return b.name.localeCompare(a.name) }));

    }

    const sortEmail_Asc = () => {
        setUser((user)=>user.slice().sort((a, b) => { return a.email.localeCompare(b.email) }));      
    }
    const sortEmail_Desc = () => {

        setUser((user)=>user.slice().sort((a, b) => { return b.email.localeCompare(a.email) }));
     
    }

    const pageReSize = (e) => {
        e.preventDefault();
        const x = document.getElementById('input').value
        if (x.toLowerCase().trim() == 'all') {
            setUserperPage(user.length)
        }

        else if (x != '' && x != '0') {
            setUserperPage(parseInt(x))
        }
    }


    const tableClick = (id) => {
        alert('Show Profile?')
        history.push('/userprofile/' + id);
    }

    var display =ur.slice(firstUserIndex, firstUserIndex + userPerPage).map((user, index) => {
            if (user.name.match(userName.trim()) && user.email.match(emailName.trim()) && user.website.match(webSite.trim())) {

                return (
                    <tr id='tr' key={index} onClick={() => tableClick(user.id)} >
                        <td>{user.name} </td>
                        <td> {user.email}</td>
                        <td> {user.website}</td>
                    </tr>
                )
            }
        });

    return (
        <div className='center'>
            <h1 className='center' > All Users</h1>

            <input id='input' placeholder=" user perpage" />
            <button type="submit" onClick={pageReSize}>Enter</button>


            <table id="myTable">
                <tbody>

                    <tr>
                        <th>Name
                            <input className="input" placeholder="Search Name" onChange={event => setUserName(event.target.value)} />
                            <label>Sort By</label>
                            <button onClick={sortName_Asc}>Asc</button>
                            <button onClick={sortName_Desc}>Des</button>
                        </th>
                        <th>Email
                            <input placeholder="Search Email" onChange={event => setEmailName(event.target.value)} />
                            <label>Sort By</label>
                            <button onClick={sortEmail_Asc}>Asc</button>
                            <button onClick={sortEmail_Desc}>Des</button>

                        </th>
                        <th>Website
                            <input placeholder="Search Website" onChange={event => setWebsite(event.target.value)} />
                        </th>
                    </tr>

                    {

                        display
                    }


                </tbody>
            </table>

            <ReactPaginate
                pageCount={pageCount}
                onPageChange={changePage}
                containerClassName={"paginationStyle"}
                activeClassName={"active"}
            />

        </div>
    );
}

export default Users;