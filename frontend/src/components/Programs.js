import React, { useState, useEffect } from 'react';
import { IoHomeSharp } from "react-icons/io5";
import '../App.css'

function Programs() {

  const [programs, setPrograms] = useState([])

  const [renderedPrograms, setRenderedPrograms] = useState([])

  const [showProgramList, setShowProgramList] = useState(true)

  const [showProgram, setShowProgram] = useState(false)

  const [showHome, setShowHome] = useState(false)

  const [addElements, setAddElements] = useState(0)

  const [exercises, setExercises] = useState([])

  const [weeks, setWeeks] = useState(0)

  useEffect(() => {
    const url = "http://localhost:8081/programs/published"
    const response = getFetch(url)
    response
      .then(data => {
        console.log("Programs: ", data)
        setPrograms(data)
      })
      .catch(error => {
        console.error("Error: ", error)
      })
  }, [showHome])

  useEffect(() => {
    const updatedPrograms = [...renderedPrograms]
    var count = 0
    var row = 0

    for (const key in programs) {
      if (count % 3 == 0) {
        row++
      }
      const programName = programs[key]['name'];

      const programExists = renderedPrograms.some(program => program.name === programName);
      
      console.log(addElements)
      if(addElements > 0 && ((!programExists && programs[key]['status'] !== 'pending') || (addElements % 2 === 0))) {
          console.log("HERE")
          updatedPrograms.push({ name: programName})
          addProgram(programs[key]['name'], programs[key]['description'], count, row, ((count % 3) + 1))
          count++;
      } else if ((!programExists && programs[key]['status'] !== 'pending')) {
          console.log("HERE")
          updatedPrograms.push({ name: programName})
          addProgram(programs[key]['name'], programs[key]['description'], count, row, ((count % 3) + 1))
          count++;
      }
      
    }
    setRenderedPrograms(updatedPrograms);
  }, [programs])

  useEffect(() => {
    console.log(exercises)
    console.log(weeks)
    if(weeks.length > 0) {
      setShowHome(true)
      setShowProgram(true)
    }
  }, [exercises, weeks])

  const handleClick = (name) => {
    console.log(name)
    setAddElements(addElements + 1)
    setShowProgramList(false)
    const url = "http://localhost:8081/exercises/program?program=" + name
    const response = getFetch(url)
    .then(data => {
      setExercises(data)
      const url2 = "http://localhost:8081/weeks/total?program=" + name
      const repsonse2 = getFetch(url2)
      .then(data2 => {
        setWeeks(data2)
      })
      .catch(error => {
        console.error("error: ", error)
      })
    })
    .catch(error => {
      console.error("error: ", error)
    })
  }

  const getFetch = async (url) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      return error;
    }
  }

  const addProgram = (name, description, programIndex, row, index) => {
    if(programIndex % 3 == 0) {
      var container = document.getElementById("program-container")

      const cardRow = document.createElement('div')
      cardRow.classList.add('row')
      cardRow.id = row
      cardRow.style.margin = "40px";

      const cardCol1 = document.createElement('div')
      cardCol1.id = `${row}1`
      cardCol1.classList.add('col-sm')

      const card = document.createElement('div')
      card.classList.add("card")
      card.classList.add("w-75")
      card.onclick = function() {
        handleClick(name)
      }
      card.onmouseenter = function() {
        card.style.background = "linear-gradient(to top left, white, #979494)";
      };
      card.onmouseleave = function() {
        card.style.background = "";
      };
      const cardBody = document.createElement('div')
      cardBody.classList.add('card-body')
      cardBody.id = "program-card"
      const cardTitle = document.createElement("h5")
      cardTitle.classList.add('card-title')
      cardTitle.innerHTML = name
      const cardText = document.createElement("p")
      cardText.classList.add('card-text')
      cardText.innerHTML = description

      cardBody.appendChild(cardTitle)
      cardBody.appendChild(cardText)

      card.appendChild(cardBody)

      cardCol1.appendChild(card)

      const cardCol2 = document.createElement('div')
      cardCol2.id = `${row}2`
      cardCol2.classList.add('col-sm')

      const cardCol3 = document.createElement('div')
      cardCol3.id = `${row}3`
      cardCol3.classList.add('col-sm')

      cardRow.appendChild(cardCol1)
      cardRow.appendChild(cardCol2)
      cardRow.appendChild(cardCol3)
      container.appendChild(cardRow)
    } else {
      const id = `${row}${index}`
      var cardCol = document.getElementById(`${row}${index}`)
      cardCol.classList.add('col-sm')
      
      const card = document.createElement('div')
      card.classList.add("card")
      card.classList.add("w-75")
      card.onclick = function() {
        handleClick(name)
      }
      card.onmouseenter = function() {
        card.style.background = "linear-gradient(to top left, white, #979494)";
      };
      card.onmouseleave = function() {
        card.style.background = "";
      };
      const cardBody = document.createElement('div')
      cardBody.classList.add('card-body')
      cardBody.id = "program-card"
      const cardTitle = document.createElement("h5")
      cardTitle.classList.add('card-title')
      cardTitle.innerHTML = name
      const cardText = document.createElement("p")
      cardText.classList.add('card-text')
      cardText.innerHTML = description

      cardBody.appendChild(cardTitle)
      cardBody.appendChild(cardText)

      card.appendChild(cardBody)

      cardCol.appendChild(card)

    }
  }

  return (
    <div className="programs-page">
      <div className="container">
        {showProgramList && 
          <div className="container" id="program-container"></div>
        }
        {showHome && 
          <div className="row" id="home-button-container">
            <IoHomeSharp onClick={() => {setShowProgram(false); setShowProgramList(true); setShowHome(false); setAddElements(addElements => addElements + 1);}} id="home-icon"/>
          </div>
        }
        {showProgram &&
          <div className="container text-center" id="programs-table-container">
            {weeks && weeks.map && weeks.map((week, index) => (
                <table className="table table-bordered" key={index} id="program-table">
                <thead>
                  <tr>
                    <th className="text-white text-center bg-black" colSpan="7">Week {week.week}</th>
                  </tr>
                  <tr>
                    <th className="text-white text-center bg-black" scope="col">Day</th>
                    <th className="text-white text-center bg-black" scope="col">Exercise</th>
                    <th className="text-white text-center bg-black"scope="col">Warmup Sets</th>
                    <th className="text-white text-center bg-black" scope="col">Working Sets</th>
                    <th className="text-white text-center bg-black" scope="col">Reps</th>
                    <th className="text-white text-center bg-black" scope="col">Percentage/RPE</th>
                    <th className="text-white text-center bg-black" scope="col">Notes</th>
                  </tr>
                </thead>
                <tbody>

                {exercises && exercises.filter(exercise => exercise.week === week.week).sort((a, b) => a.day - b.day).map((exercise, index) => (
                    <tr key={index}>
                      <td id={exercise.day % 2 === 0 ? 'even-row' : 'odd-row'}>{exercise.day}</td>
                      <td id={exercise.day % 2 === 0 ? 'even-row' : 'odd-row'}>{exercise.name}</td>
                      <td id={exercise.day % 2 === 0 ? 'even-row' : 'odd-row'}>{exercise.warmupSets}</td>
                      <td id={exercise.day % 2 === 0 ? 'even-row' : 'odd-row'}>{exercise.workingSets}</td>
                      <td id={exercise.day % 2 === 0 ? 'even-row' : 'odd-row'}>{exercise.reps}</td>
                      <td id={exercise.day % 2 === 0 ? 'even-row' : 'odd-row'}>{exercise.percentage}</td>
                      <td id={exercise.day % 2 === 0 ? 'even-row' : 'odd-row'}>{exercise.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ))}
         </div>
        }
      </div>
    </div>
  );
}


export default Programs;
