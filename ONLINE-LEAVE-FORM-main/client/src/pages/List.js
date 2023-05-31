import React ,{useState,useEffect}from 'react'
import axios from 'axios'
import './cssPages/List.css'

const List = () => {

    const [list,setlist] = useState([])
    const [available,setAvailable] = useState(false)
    const [effect,setEffect] = useState(0)

    const [selectedOption, setSelectedOption] = useState('');

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };
    useEffect(()=>{
        getList()
    },[selectedOption])
    const getList = async() => {
        if(selectedOption==='class'){
            const response = await axios.get('http://localhost:4000/api/list/class');
            if(response.data){
                setlist(response.data)
                setEffect(1)
            }
        }
        else if(selectedOption==='dept'){
            const response = await axios.get('http://localhost:4000/api/list/dept');
            if(response.data){
                setlist(response.data)
                setEffect(1)
            }          
        }
        else if(selectedOption==='leave'){
            const response = await axios.get('http://localhost:4000/api/list/leave');
            if(response.data){
                setlist(response.data)
                setEffect(1)
            }            
        }
        else {
            const response = await axios.get('http://localhost:4000/api/list');
            if(response.data){
                setlist(response.data)
                setEffect(1)
            }
        }
        // if(list.length>0){
        //     console.log('fetched')
        //     console.log(list);
        //     console.log(selectedOption);
        //     setAvailable(true)
        // }
    }

    return (

        <>
            <div>
                <select value={selectedOption} onChange={handleOptionChange}>
                    <option value="">Filter</option>
                    <option value="class">Class</option>
                    <option value="dept">Dept</option>
                    <option value="leave">LeaveCount</option>
                </select>
            </div>
            <div className="list-container">
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Department</th>
                            <th>Section</th>
                            <th>LeaveCount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {list.map((row,index)=>(
                            <tr key={index}>
                                <td>{row.name}</td>
                                <td>{row.dept}</td>
                                <td>{row.section}</td>
                                <td>{row.leaveCount}</td>                            
                            </tr>
                        ))}
                    </tbody>
                </table>               
        </div>
        </>
    )
}

export default List