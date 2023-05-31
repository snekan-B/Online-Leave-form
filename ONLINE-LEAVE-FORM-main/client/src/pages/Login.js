import React ,{ useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './cssPages/style.css'
import axios from 'axios'
import headimg from './headimg.jpg'

const Login = () => {

    
    
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
            await axios.post('http://localhost:4000/api/login',{email,password})
            .then((response)=>{
                if(response.data==="student"){
                    navigate('/inputPage')
                }else if(response.data==="councellor"){
                    navigate('/councellor')
                }else if(response.data==="hod"){
                    navigate('/hodPage')
                }else if(response.data==="incharge"){
                    navigate('/inchargePage')
                }else if(response.data==="LeaveCount Invalid"){
                    alert('You are not allow to apply leave form .Since you have already applied 6 days leave')
                    navigate('/login')
                }
                else if(response.data==="not exist"){
                    alert('User Have Not Sign Up')
                    navigate('/register')
                }else{
                    alert('error')
                }
            }).catch((e)=>{
                alert('wrong Details')
            })
        }catch(err){
            console.log(err);
        }
    }

    return (
        <div>
            
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
                                    <h1 class="fs-4 card-title fw-bold mb-4">Login</h1>
                                    <form action="POST" onSubmit={handleSubmit} class="needs-validation" novalidate="" autocomplete="off">
                                        <div class="mb-3">
                                            <label class="mb-2 text-muted" for="email">E-Mail Address</label>
                                            <input id="email" value={email} onChange={(e)=>setEmail(e.target.value)} type="email" class="form-control" name="email" required autofocus/>
                                            <div class="invalid-feedback">
                                                Email is invalid
                                            </div>
                                        </div>

                                        <div class="mb-3">
                                            <div class="mb-2 w-100">
                                                <label class="text-muted" for="password">Password</label>
                                            </div>
                                            <input id="password" value={password} onChange={(e)=>setPassword(e.target.value)} type="password" class="form-control" name="password" required/>
                                            <div class="invalid-feedback">
                                                Password is required
                                            </div>
                                        </div>

                                        <div class="mb-3">
                                            <label class="mb-2 text-muted" for="name">Student/Councellor/Hod/Incharge</label>
                                            <input id="name" type="name" value={person} onChange={(e)=>setPerson(e.target.value)} class="form-control" name="name" required autofocus/>
                                        </div>

                                        <div class="d-flex align-items-center">
                                            <div class="form-check">
                                                <input type="checkbox" name="remember" id="remember" class="form-check-input"/>
                                                <label for="remember" class="form-check-label">Remember Me</label>
                                            </div>
                                            <button type="submit" onSubmit={handleSubmit} class="btn btn-primary ms-auto">
                                                Submit
                                            </button>
                                        </div>
                                    </form>
                                </div>
                                <div class="card-footer py-3 border-0">
                                    <div class="text-center">
                                        Don't have an account? 
                                        <Link to={'/register'}>
                                            <a href="register.html" class="text-dark">Create One</a>
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

export default Login