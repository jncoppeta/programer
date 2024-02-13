import React, { useState, useEffect, useRef } from 'react';
import './Sandbox.css'
import SandboxForm from './SandboxForm.js'
import { IoHomeSharp } from "react-icons/io5";
import DayView from './DayView.js';

function Sandbox() {

  const [dayView, setDayView] = useState(false)

  const [homeView, setHomeView] = useState(false)

  const [formView, setFormView] = useState(true)

  const [currentProgram, setCurrentProgram] = useState("")

  const handleProgram = (program) => {
    console.log(program)
    setCurrentProgram(program['name'])
    setFormView(false)
    setDayView(true)
    setHomeView(true)
  }

  return (
    <div className="sandbox-page">
        <div className="row" id="view-bar">
        
        </div>
        <div className="row" id="day-view-container">
          {homeView && <IoHomeSharp onClick={() => {setHomeView(false); setDayView(false); setFormView(true)}} id="home-icon"/>}
          {dayView && <DayView program={currentProgram}></DayView>}
          {formView && <SandboxForm selectProgram={handleProgram}></SandboxForm>}
        </div>
        
    </div>
  );
}

export default Sandbox;
