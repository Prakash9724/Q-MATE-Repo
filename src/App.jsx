import React from 'react'
import Landing from './Landing'
import SinglePage2 from './SinglePage2'
import Card from './components/Card'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SinglePage3 from './SinglePage3';
import Explore from './Explore';



function App() {
  return (
    <div className='w-full'>
      
        <Routes>
          <Route path='/museum/:id' element={<SinglePage2/>}/>
          <Route path='/' element={<Landing/>}/>
          <Route path='/explore' element={<Explore/>}/>
        </Routes>
    </div>
  )
}

export default App
