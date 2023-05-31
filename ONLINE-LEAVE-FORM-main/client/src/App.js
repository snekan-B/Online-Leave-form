import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SignatureCanvas from 'react-signature-canvas';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';

function App() {
  const navigate = useNavigate()
  const [signature, setSignature] = useState(null);
  const [pdfBlob, setPdfBlob] = useState(null);
  const [name,setName] = useState('')
  const [rollno,setRollno] = useState('')
  const [ug,setUg] = useState('')
  const [coarse,setCoarse] = useState('')
  const [year,setYear] = useState('')
  const [branch,setBranch] = useState('')
  const [section,setSection] = useState('')
  const [reason,setReason] = useState('')
  const [leave,setLeave] = useState(0)
  const [selectedDate, setSelectedDate] = useState(null);
  const [councellor,setCouncellor] = useState('')
  const [hod,setHod] = useState('')
  const [state,setState] = useState(null)


  const [file, setFile] = useState(null);
  const [isChecked, setIsChecked] = useState(false);

  const signatureRef = useRef();

  const handleSave = () => {
    if (signatureRef.current.isEmpty()) {
      return;
    }
    const signatureDataUrl = signatureRef.current.toDataURL();
    axios
      .post('http://localhost:4000/api/signature', { ...state,signatureDataUrl }, { responseType: 'arraybuffer' })
      .then((response) => {
        setPdfBlob(new Blob([response.data], { type: 'application/pdf' }));
        navigate('/')
      })
      .catch((error) => {
        console.log("error");
      });
  };


  

  const handleSubmit = (e) => {
    e.preventDefault()    
    setState({
      name:name,
      rollno:rollno,
      ug:ug,
      year:year,
      branch:branch,
      section:section,
      reason:reason,
      leave:leave,
      coarse:coarse,
      councellor:councellor,
      hod:hod,
      selectedDate:selectedDate.toLocaleDateString(),
    })
    console.log(state);
  }

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <div>

      <section class="h-100 form">
                <div class="container h-100">
                    <div class="row justify-content-sm-center h-100">
                        <div class="col-xxl-4 col-xl-5 col-lg-5 col-md-7 col-sm-9">
                            <div class="card shadow-lg">
                                <div class="card-body p-5">
                                    <h1 class="fs-4 card-title fw-bold mb-4">Student Details:</h1>
                                    <form method="POST" onSubmit={handleSubmit} class="needs-validation" novalidate="" autocomplete="off">
                                        <div class="mb-3">
                                            <label class="mb-2 text-muted" for="email">Name:</label>
                                            <input id="name" value={name} onChange={(e)=>setName(e.target.value)}type="text" class="form-control" name="email" required autofocus/>
                                        </div>

                                        <div class="mb-3">
                                            <label class="mb-2 text-muted" for="rollno">Roll No:</label>
                                            <input id="number" type="text" class="form-control" name="rollno" value={rollno} onChange={(e)=>setRollno(e.target.value)} required autofocus/>
                                        </div>

                                        <div class="mb-3">
                                            <label class="mb-2 text-muted" for="year">Year:</label>
                                            <input id="number" type="text" class="form-control" name="year" value={year} onChange={(e)=>setYear(e.target.value)} required autofocus/>
                                        </div>

                                        <div class="mb-3">
                                            <label class="mb-2 text-muted" for="ug">UG/PG:</label>
                                            <input id="ug" type="text" class="form-control" name="ug" value={ug} onChange={(e)=>setUg(e.target.value)} required autofocus/>
                                        </div>

                                        <div class="mb-3">
                                            <label class="mb-2 text-muted" for="coarse">Course:</label>
                                            <input id="coarse" type="text" class="form-control" name="coarse" value={coarse} onChange={(e)=>setCoarse(e.target.value)} required autofocus/>
                                            
                                        </div>

                                        <div class="mb-3">
                                            <label class="mb-2 text-muted" for="branch">Branch:</label>
                                            <input id="branch" type="text" class="form-control" name="branch" value={branch} onChange={(e)=>setBranch(e.target.value)} required autofocus/>
                                            
                                        </div>

                                        

                                        <div class="mb-3">
                                            <label class="mb-2 text-muted" for="section">Section:</label>
                                            <input id="section" type="text" class="form-control" name="section" value={section} onChange={(e)=>setSection(e.target.value)} required autofocus/>
                                            
                                        </div>

                                    

                                        <div class="mb-3">
                                            <label class="mb-2 text-muted" for="leave">No of Days:</label>
                                            <input id="leave" type="text" class="form-control" name="leave" value={leave} onChange={(e)=>setLeave(e.target.value)} required autofocus/>
                                            
                                        </div>

                                        <DatePicker
                                          selected={selectedDate}
                                          onChange={handleDateChange}
                                          dateFormat="MM/dd/yyyy"
                                          placeholderText="Select a date"
                                        />


                                        <div class="mb-3">
                                            <label class="mb-2 text-muted" for="reason">Reason:</label>
                                            <input id="reason" type="text" class="form-control" name="reason" value={reason} onChange={(e)=>setReason(e.target.value)} required autofocus/>
                                            
                                        </div>

                                        <div class="mb-3">
                                            <label class="mb-2 text-muted" for="councellor">Counsellor Name:</label>
                                            <input id="councellor" type="text" class="form-control" name="councellor" value={councellor} onChange={(e)=>setCouncellor(e.target.value)} required autofocus/>
                                            
                                        </div>

                                        <div class="mb-3">
                                            <label class="mb-2 text-muted" for="hod">Head Of Department:</label>
                                            <input id="hod" type="text" class="form-control" name="hod" value={hod} onChange={(e)=>setHod(e.target.value)} required autofocus/>
                                            
                                        </div>

                                        <button type='submit'>Submit</button>
  

                                        </form>

                                        </div>
                                        </div>

                                        
                                    
                            </div>


                    </div>
                </div>
            </section>

      {/* <form onSubmit={handleSubmit}>
        <label
          htmlFor='name'
        >Name:</label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e)=>setName(e.target.value)}
        ></input>

        <label
          htmlFor='rollname'
        >Rollno:</label>
        <input
          type="text"
          name='rollno'
          value={rollno}
          onChange={(e)=>setRollno(e.target.value)}
        ></input>

        <label
          htmlFor='year'
        >Year:</label>
        <input
          type="text"
          name="year"
          value={year}
          onChange={(e)=>setYear(e.target.value)}
        ></input> 

        <label
          htmlFor='Branch'
        >Branch:</label>
        <input
          type="text"
          name='branch'
          value={branch}
          onChange={(e)=>setBranch(e.target.value)}
        ></input> 

        <label
          htmlFor='ug'
        >UG/PG:</label>
        <input
          type="text"
          name='ug'
          value={ug}
          onChange={(e)=>setUg(e.target.value)}
        ></input> 

        <label
          htmlFor='section'
        >Section:</label>
        <input
          type="text"
          name='section'
          value={section}
          onChange={(e)=>setSection(e.target.value)}
        ></input> 

        <label
          htmlFor='coarse'
        >Coarse:</label>
        <input
          type="text"
          name='coarse'
          value={coarse}
          onChange={(e)=>setCoarse(e.target.value)}
        ></input>

        <label
          htmlFor='leave'
        >No of Days:</label>
        <input
          type="Number"
          name='leave'
          value={leave}
          onChange={(e)=>setLeave(e.target.value)}
        ></input>
        <label>
          Date:
        </label>
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          dateFormat="MM/dd/yyyy"
          placeholderText="Select a date"
        />


        <label
          htmlFor='reason'
        >Reason:</label>
        <input
          type="text"
          name='reason'
          value={reason}
          onChange={(e)=>setReason(e.target.value)}
        ></input> 

        <label
          htmlFor='councellor'
        >Councellor:</label>
        <input
          type="text"
          name='councellor'
          value={councellor}
          onChange={(e)=>setCouncellor(e.target.value)}
        ></input>   

        <label
          htmlFor='year'
        >HOD:</label>
        <input
          type="text"
          name='hod'
          value={hod}
          onChange={(e)=>setHod(e.target.value)}
        ></input> 
        <button type='submit'>Submit</button>
      </form> */}

      
      <h2>Signature</h2>
      <SignatureCanvas
        style={{backgroundColor:"black"}}
        ref={signatureRef}
        canvasProps={{ width: 500, height: 200 }}
      />

      <button onClick={handleSave}>Save</button>
      {/* <button onClick={handleDownload} disabled={!pdfBlob}>Download</button> */}
      
      
      
    </div>
  );
}

export default App;



