import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import App from '../App'
import CouncellorPage from './CouncellorPage'
import InchargePage from './InchargePage'
import HodPage from './HodPage'
import StudentRequest from './StudentRequest'
import CouncellorRequest from './CouncellorRequest'
import HodRequest from './HodRequest'
import Login from './Login'
import Register from './Register'
import List from './List'
import headimg from './headimg.jpg'

const Home = () => {
    return (
        <div>
            <section class="logo">
                <div class="container">
                    <div class="row">
                        <img class="main-img" src={headimg} alt="head-logo"/>
                    </div>
                </div>
            </section>
            <Routes>
                <Route path='/' element={<Login/>}/>
                <Route path='/login' element={<Login/>}/>
                <Route path='/register' element={<Register/>}/>
                <Route path='/councellor' element={<CouncellorPage/>}/>
                <Route path='/hodPage' element={<HodPage/>}/>
                <Route path='/inputPage' element={<App/>}/>
                <Route path='/studentRequest/:id' element={<StudentRequest/>}/>
                <Route path='/councellorRequest/:id' element={<CouncellorRequest/>}/>
                <Route path='/hodRequest/:id' element={<HodRequest/>}/>
                <Route path='/inchargePage' element={<InchargePage/>}/>
                <Route path='/list' element={<List/>}/>
            </Routes>
        </div>
    )
}

export default Home