import React, { useState, useEffect, useRef } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import SignatureCanvas from 'react-signature-canvas';


const StudentRequest = () => {
    const { id } = useParams()
    const signatureRef = useRef();
    const navigate = useNavigate()
    const [request, setRequest] = useState(null)
    const [pdfBlob, setPdfBlob] = useState(null)

    const getInfo = async (id) => {
        const response = await axios.get(`http://localhost:4000/api/getStudentRequest/${id}`, {
            responseType: 'arraybuffer'
        })
        setRequest(response.data)
        setPdfBlob(new Blob([response.data], { type: 'application/pdf' }))
    }

    const handleDownload = () => {
        if (pdfBlob) {
            const url = URL.createObjectURL(pdfBlob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'response.pdf');
            document.body.appendChild(link);
            link.click();
        }
    }

    useEffect(() => {
        if (id) {
            getInfo(id)
        }
    }, [id])

    const handleSign = () => {
        if (signatureRef.current.isEmpty()) {
            return;
        }
        const signatureDataUrl = signatureRef.current.toDataURL();
        axios.post('http://localhost:4000/api/saveToHOD',{signatureDataUrl,id}).then((response)=>{
            navigate('/councellor')

        }).catch((error)=>{
            console.log('error');
        })
    }


    return (
        <div>
            <h2>Student Requests</h2>
            <button onClick={handleDownload}>Download PDF</button>
            <h2>Councellor Sign</h2>
            <SignatureCanvas
                className='signature'
                ref={signatureRef}
                canvasProps={{ width: 500, height: 200 }}
            />
            <Link to={'/councellor'}>
                <button>Deny</button>
            </Link>
            <button onClick={handleSign}>Allow</button>
            
        </div>
    )
}

export default StudentRequest





// import React,{ useState ,useEffect} from 'react'
// import { useNavigate, useParams } from 'react-router-dom'
// import axios from 'axios'

// const StudentRequest = () => {
//     const { id } = useParams()
//     const [request,setRequest] = useState(null)

//     const [student,setStudent] = useState([])
    

//     const getInfo = async (id) => {
//         const response = await axios.get(`http://localhost:4000/api/getStudentRequest/${id}`)
//         setRequest(response.data)
//         console.log(request);
//     }
//     useEffect(()=>{
//         if(id){
//             getInfo(id)
//         }
//     },[request])
//     return (
//         <div>
//             <h2>Student Requests</h2>

//         </div>
//     )
// }

// export default StudentRequest





// import React, { useState } from 'react';

// const DownloadPDFButton = ({ pdfBlob }) => {
//   const [isDownloading, setIsDownloading] = useState(false);

//   const handleDownload = () => {
//     setIsDownloading(true);

//     if (pdfBlob) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         const arrayBuffer = reader.result;
//         const blob = new Blob([arrayBuffer], { type: 'application/pdf' });
//         const url = URL.createObjectURL(blob);
//         const link = document.createElement('a');
//         link.href = url;
//         link.setAttribute('download', 'response.pdf');
//         document.body.appendChild(link);
//         link.click();
//         setIsDownloading(false);
//       };
//       reader.readAsArrayBuffer(pdfBlob);
//     }
//   };

//   return (
//     <div>
//       <button disabled={isDownloading} onClick={handleDownload}>
//         {isDownloading ? 'Downloading...' : 'Download PDF'}
//       </button>
//     </div>
//   );
// };

// export default DownloadPDFButton;
