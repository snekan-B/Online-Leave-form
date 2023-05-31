import React ,{ useState ,useEffect} from 'react'
import axios from 'axios'
import { Link ,useNavigate} from 'react-router-dom'
import headimg from './headimg.jpg'

const Register = () => {

    (function () {
	'use strict'
	var forms = document.querySelectorAll('.needs-validation')
	Array.prototype.slice.call(forms)
		.forEach(function (form) {
			form.addEventListener('submit', function (event) {
				if (!form.checkValidity()) {
					event.preventDefault()
					event.stopPropagation()
				}

				form.classList.add('was-validated')
			}, false)
		})
    })()
    const [email,setEmail] =useState('')
    const [name,setName] =useState('')
    const [dept,setDept] =useState('')
    const [section,setSection] =useState('')
    const [newClassName,setNewClassName] =useState('special')
    const [person,setPerson] =useState('')
    const [password,setPassword] =useState('')
    const navigate = useNavigate()

    function validateName(event) {
        const name = document.getElementById("name").value;
        const nameRegex = /^[a-zA-Z\s]+$/;
        if (!nameRegex.test(name)) {
        alert("Please enter a valid name (only letters and spaces allowed)");
        event.preventDefault();
        return false;
        }
        return true;
    }


    function validateNumber(event) {
        const number = document.getElementById("number").value;
        const numberRegex = /^\d+$/;
        if (!numberRegex.test(number)) {
        alert("Please enter a valid number (only digits allowed)");
        event.preventDefault();
        return false;
        }
        return true;
    }

    const handleSubmit = async (e) =>{
        e.preventDefault()
        try{
            await axios.post('http://localhost:4000/api/register',{name,dept,person,section,email,password})
            .then((response)=>{ 
                if(response.data==="exist"){ 
                    alert('User already Exist') 
                }
                else if(response.data==="not exist"){
                    alert('Account Created Successfully!!!') 
                }
                navigate('/login')
            }).catch((e)=>{
                alert('wrong Details')
                navigate('/login') 
            })
        }catch(err){
            console.log(err);
        }
    }

    const handleSection = () => {
        if(person=='student'){
            setNewClassName('normal');
        }else{
            setNewClassName('special');
        }
    }
    useEffect(() => {
        handleSection()
    }, [person])

    
    return (
        <div>
            <section class="logo">
                <div class="container">
                    <div class="row">
                        <img class="main-img"  src={headimg} alt="head-logo"/>
                    </div>
                </div>
            </section>
            <section class="signup">
                <div class="container main-head">
                    <div class="row">
                        <h1 class="heading">Attendance Management System.</h1>
                            <h4>A solution for both teachers and students!</h4>
                            <br/>
                    </div>
                </div>
            </section>

            <section class="h-100 form">
                <div class="container h-100">
                    <div class="row justify-content-sm-center h-100">
                        <div class="col-xxl-4 col-xl-5 col-lg-5 col-md-7 col-sm-9">
                            <div class="card shadow-lg">
                                <div class="card-body p-5">
                                    <h1 class="fs-4 card-title fw-bold mb-4">Register</h1>
                                    <form method="POST" class="needs-validation" novalidate="" onSubmit={handleSubmit} autocomplete="off">
                                        <div class="mb-3">
                                            <label class="mb-2 text-muted" for="name">Name</label>
                                            <input id="name" value={name} onChange={(e)=>setName(e.target.value)} type="text" class="form-control" name="name" required autofocus/>
                                            <div class="invalid-feedback">
                                                Name is required	
                                            </div>
                                        </div>
                                        <div class="mb-3">
                                            <label class="mb-2 text-muted" for="dept">Dept</label>
                                            <input id="dept" value={dept} onChange={(e)=>setDept(e.target.value)} type="text" class="form-control" name="dept" required/>
                                        </div>

                                        <div class="mb-3">
                                            <label class="mb-2 text-muted" for="person">Student/Councellor/Hod/Incharge</label>
                                            <input id="person" value={person} onChange={(e)=>setPerson(e.target.value)} type="text" class="form-control" name="person" required/>
                                        </div>
                                        <div class="mb-3" className={newClassName}>
                                            <label class="mb-2 text-muted" for="section">Section</label>
                                            <input id="section" value={section} onChange={(e)=>setSection(e.target.value)} type="text" class="form-control" name="section" required/>
                                        </div>
            
                                        <div class="mb-3">
                                            <label class="mb-2 text-muted" for="email">E-Mail Address</label>
                                            <input id="email" onChange={(e)=>setEmail(e.target.value)} type="email" class="form-control" name="email" value={email} required/>
                                            <div class="invalid-feedback">
                                                Email is invalid
                                            </div>
                                        </div>
            
                                        <div class="mb-3">
                                            <label class="mb-2 text-muted" for="password">Password</label>
                                            <input id="password" value={password} onChange={(e)=>setPassword(e.target.value)} type="password" class="form-control" name="password" required/>
                                            <div class="invalid-feedback">
                                                Password is required
                                            </div>
                                        </div>            
                                        <p class="form-text text-muted mb-3">
                                            By registering you agree with our terms and condition.
                                        </p>
            
                                        <div class="align-items-center d-flex">
                                            <button type="submit" class="btn btn-primary ms-auto">
                                                Register	
                                            </button>
                                        </div>
                                    </form>
                                </div>
                                <div class="card-footer py-3 border-0">
                                    <div class="text-center">
                                        Already have an account? 
                                        <Link to={'/login'}>
                                            <a href="index.html" class="text-dark">Login</a>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Register