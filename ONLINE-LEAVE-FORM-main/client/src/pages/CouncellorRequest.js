import React, { useState, useEffect, useRef } from 'react'
import { useNavigate, useParams,Link } from 'react-router-dom'
import axios from 'axios'
import SignatureCanvas from 'react-signature-canvas';


const CouncellorRequest = () => {

    const { id } = useParams()
    const signatureRef = useRef();
    const navigate = useNavigate()
    const [request, setRequest] = useState(null)
    const [pdfBlob, setPdfBlob] = useState(null)

    const getInfo = async (id) => {
        const response = await axios.get(`http://localhost:4000/api/getHodRequest/${id}`, {
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
        axios.post('http://localhost:4000/api/saveToIncharge',{signatureDataUrl,id}).then((response)=>{
            navigate('/hodPage')

        }).catch((error)=>{
            console.log('error');
        })
    }


    return (
        <div>
            <h2>Student Requests</h2>
            <button onClick={handleDownload}>Download PDF</button>
            <h2>HOD Sign</h2>
            <SignatureCanvas
                className='signature'
                ref={signatureRef}
                canvasProps={{ width: 500, height: 200 }}
            />
            <Link to={'/hodPage'}>
                <button>Deny</button>
            </Link>
            <button onClick={handleSign}>Submit</button>
        </div>
    )
}

export default CouncellorRequest