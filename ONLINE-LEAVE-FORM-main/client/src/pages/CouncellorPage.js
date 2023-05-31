import React,{useState, useEffect} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import "./cssPages/style.css";
import "bootstrap/dist/css/bootstrap.css"

const CouncellorPage = () => {
    const [data, setData] = useState([])
    useEffect(()=>{
        getInfo()
    },[])

    const getInfo = async () => {
        const response = await axios.get('http://localhost:4000/api/getCouncellor');
        console.log(`count: ${response.data}`);
        if(response.data>=1){
            getDetails()
        }
    }

    const getDetails = async() => {
        const response = await axios.get('http://localhost:4000/api/pdfs');
        setData(response.data)
    }
    return (
        <div>
            <section>
                <div class="container">
                    <div class="row student-head">
                        <h1>Councellor Page</h1>
                    </div>
                </div>
            </section>
            {data.length > 0 ? (
                <ul className='mx-auto'>
                    <h2>Request Count: {data.length}</h2>
                    {data.map((doc) => (
                        <li key={doc._id} style={{ listStyleType: 'none' }}>
                            <Link to={`/studentRequest/${doc._id}`} className="text-decoration-none">
                                <h2 >{doc.title}</h2>
                            </Link>
                        </li>
                    ))}
                </ul>
            ) : (
                <section>
                    <div className='container'>
                        <div className='row text-center mt-5'>
                            <h3 >Loading...</h3>
                        </div>
                    </div>
                </section>
            )}
        </div>
    )
}

export default CouncellorPage
