import React from 'react';
import Board from './components/Board';
import Card from './components/Card';
import Navbar from './components/Navbar';
import Pricing from './pages/Pricing';
import About from './pages/About';
import Home from './pages/Home';
import { Route, Routes } from 'react-router-dom';

function App() {
  
  
  return (
    <>
      <Navbar />
      <div className='container'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/pricing' element={<Pricing />} />
          <Route path='/about' element={<About />} />
        </Routes>
      </div>
    </>

    // <div className='App'>
    //   <main className='flexbox'>
        
        
    //     <Board id='board-1' className='board'>
    //       <Card id='card-1' className='card' draggable='true'>
    //         <p>Card one</p>
    //       </Card>
    //     </Board>

    //     <Board id='board-2' className='board'>
    //       <Card id='card-2' className='card' draggable='true'>
    //         <p>Card two</p>
    //       </Card>
    //     </Board>

    //   </main>
    // </div>
  );
}

export default App;
