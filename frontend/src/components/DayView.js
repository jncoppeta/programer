import React, { useState, useEffect, useRef } from 'react';
import AddExerciseForm from './AddExerciseForm';
import RemoveExerciseForm from './RemoveExerciseForm';
import RemoveWeekForm from './RemoveWeekForm'
import EditExerciseForm from './EditExercise';
import Notification from './Notification';
import { FaRegArrowAltCircleRight } from "react-icons/fa";
import { FaRegArrowAltCircleLeft } from "react-icons/fa";
import AddDayForm from './AddDayForm';
import RemoveDayForm from './RemoveDayForm';
import AddWeekForm from './AddWeekForm';

const DayView = (programName) => {

    const [editExercise, setEditExercise] = useState(false)

    const [addExercise, setAddExercise] = useState(false)

    const [addDay, setAddDay] = useState(false)

    const [removeDay, setRemoveDay] = useState(false)

    const [addWeek, setAddWeek] = useState(false)

    const [removeWeek, setRemoveWeek] = useState(false)
    
    const [removeExercise, setRemoveExercise] = useState(false)
    
    const [notificationMessage, setNotificationMessage] = useState("")

    const [exercises, setExercises] = useState([{}])

    const [weekNumber, setWeekNumber] = useState(1)

    const [dayNumber, setDayNumber] = useState(1)

    const [daysInCurrentWeek, setDaysInCurrentWeek] = useState(7)

    const [weeksInProgram, setWeeksInProgram] = useState(1);

    const [edgeCase, setEdgeCase] = useState(false)

    const [modifyDay, setModifyDay] = useState(false)

    const [modifyStructure, setModifyStructure] = useState(false)

    const [modifyOptions, setModifyOptions] = useState(true)

    const [rightArrowHover, setRightArrowHover] = useState(false)

    const [leftArrowHover, setLeftArrowHover] = useState(false)

useEffect(() => {
    console.log("PROGRAM IS: ", programName['program'])
    fetchWeek();
    if(dayNumber > daysInCurrentWeek) {        
        if(weekNumber < weeksInProgram) {
            setWeekNumber(weekNumber + 1)
            setDayNumber(1)
        } else {
            setDayNumber(dayNumber - 1)
            showNotification("End of program reached. Add more days to continue.")
        }
    }
    fetchDay();
}, [dayNumber] ) 

useEffect(() => {
    setDayNumber(1)
    fetchWeek();
    fetchDay();
    fetchWeekCount();
}, [weekNumber])

useEffect(() => {
    if(edgeCase) {
        console.log("Updating to: ", daysInCurrentWeek)
        setDayNumber(daysInCurrentWeek)
        setEdgeCase(false)
    }
}, [daysInCurrentWeek])

const fetchWeek = () => {
    const url = "http://localhost:8081/weeks?week=" + weekNumber + "&program=" + programName['program']
    const response = getFetch(url)
    response
      .then(data => {
        console.log(url)
        console.log(data)
        console.log("Days in week: ", data[0]['numDay'])
        setDaysInCurrentWeek(data[0]['numDay'])
      })
      .catch(error => {
        console.error("Error: ", error)
      })
}

const fetchWeekCount = () => {
    const url = "http://localhost:8081/weeks/total" + "?program=" + programName['program']
    const response = getFetch(url)
    response
      .then(data => {
        console.log("Total weeks: ", data.lenth)
        setWeeksInProgram(data.length)
      })
      .catch(error => {
        console.error("Error: ", error)
      })
}

const fetchDay = () => {
    const url = "http://localhost:8081/exercises/day?week=" + weekNumber + "&day=" + dayNumber + "&programName=" + programName['program']
    console.log(url)
    const response = getFetch(url)
    response
      .then(data => {
        setExercises(data)
        console.log("Exercises: ", data)
      })
      .catch(error => {
        console.error("Error: ", error)
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

const postFetch = async (url, params) => {
  try {
    console.log(url)
    console.log(params)
    const response = await fetch(url, {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params)
    });
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

const deleteFetch = async (url, params) => {
  try {
    console.log(url)
    console.log(params)
    const response = await fetch(url, {
      method: 'DELETE', 
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params)
    });
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

const putFetch = async (url, params) => {
    try {
      console.log(url)
      console.log(params)
      const response = await fetch(url, {
        method: 'PUT', 
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(params)
      });
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

const createExercise = (formData) => {
  console.log(formData)
  const curUrl = "http://localhost:8081/exercises/day?day=" + dayNumber + "&week=" + weekNumber + "&programName=" + programName['program']
  console.log(curUrl)
  const res = getFetch(curUrl)
  res
    .then(data => {
      if(data.length == 1 && data[0]['name'] == "-") {
        console.log("Updating placeholder exercise...")
        const updateData = {}
        for (const key in formData) {
          updateData[key] = formData[key]
        }
        updateData.id = data[0]['id']
        console.log(updateData)
        updateExercise(updateData)
      } else {
        const url = "http://localhost:8081/create/exercise"
        const data = {
          name: encodeURIComponent(formData['name']),
          warmupSets: encodeURIComponent(formData['warmupSets']),
          workingSets: encodeURIComponent(formData['workingSets']),
          reps: encodeURIComponent(formData['reps']),
          percentage: encodeURIComponent(formData['percentage']),
          notes: encodeURIComponent(formData['notes']),
          week: encodeURIComponent(weekNumber),
          day: encodeURIComponent(dayNumber),
          programName: encodeURIComponent(programName['program'])
        }
        const response = postFetch(url, data)
        response
          .then(data => {
            setExercises(data)
            console.log("Exercises: ", data)
            fetchDay()
            showNotification("Exercise added!")
          })
          .catch(error => {
            console.error("Error: ", error)
          })
      }
    })
    .catch(error => {
      console.error("error: ", error)
    })
}

const fullDeleteExercise = (id) => {
  const url = "http://localhost:8081/remove/exercise" 
  const data = {id: encodeURIComponent(id['id'])}
  const response = deleteFetch(url, data)
  response
    .then(data => {
      console.log(data)
    })
    .catch(error => {
      console.error("Error: ", error)
    })
}

const deleteExercise = (id) => {
  console.log("sandbox: ", id)

  const getExerciseUrl = "http://localhost:8081/exercises/id?id=" + encodeURIComponent(id['id'])
  const res = getFetch(getExerciseUrl)
  res
    .then(data => {
      console.log(data)
      const reqDay = data[0]['day']
      const reqWeek = data[0]['week']
      console.log(reqDay)
      console.log(reqWeek)
      const url = "http://localhost:8081/exercises/day?week=" + reqWeek + "&day=" + reqDay + "&programName=" + programName['program']
      console.log(url)
      const response = getFetch(url)
      response
        .then(data => {
          console.log("Exercises on same day: ", data)
          console.log(data.length)
          if (data.length == 1) {
              if (data[0]['name'] != "-") {
                console.log(data[0])
                const updatedFields = {}
                for (const key in data[0]) {
                  if(key == 'id' || key == 'day' || key == 'week' || key == 'programName') {
                    updatedFields[key] = data[0][key]
                  } else {
                    updatedFields[key] = "-"
                  }
                }
                updateExercise(updatedFields)
              } else {
                showNotification("No exercises left to remove")
              }
          } else {
            const url = "http://localhost:8081/remove/exercise" 
            const data = {id: encodeURIComponent(id['id'])}
            const response = deleteFetch(url, data)
            response
              .then(data => {
                setExercises(data)
                console.log("Exercises: ", data)
                fetchDay()
                showNotification("Exercise removed!")
              })
              .catch(error => {
                console.error("Error: ", error)
              })
          }
        })
        .catch(error => {
          console.error("Error: ", error)
        })
    })
    .catch(error => {
      console.error("error: ", error)
    })
}

const updateExercise = (formData) => {
  console.log(formData)
    var count = 0
    var body = ""
    for (const key in formData) {
        if(formData.hasOwnProperty(key) && formData[key] !== "" && key !== "id") {
            if (count == 0) {
                body = "\`" + key + "\` = '" + formData[key] + "'"
                count++;
            } else {
                body += ", \`" + key + "\` = '" + formData[key] + "'"
            }
        } 
    }
    const url = "http://localhost:8081/update/exercise" 
    const data = {
        body: encodeURIComponent(body),
        id: encodeURIComponent(formData['id'])
    }
    const response = putFetch(url, data)
    response
        .then(data => {
        setExercises(data)
        fetchDay()
        showNotification("Exercise updated!")
        })
        .catch(error => {
        console.error("Error: ", error)
        })
    console.log(body)
}

const leftEdgeHelper = () => {
    setWeekNumber(weekNumber - 1)
    setEdgeCase(true)
    setDayNumber(daysInCurrentWeek)
}

const closeWindows = (modifyingDay) => {
  setAddExercise(false)
  setRemoveExercise(false)
  setEditExercise(false)
  setAddDay(false)
  setRemoveDay(false)
  setAddWeek(false)
  setRemoveWeek(false)
  if (modifyingDay) {
    setModifyDay(true)
    setModifyStructure(false)
  } else {
    setModifyStructure(true)
    setModifyDay(false)
  }
}

const resetWindows = () => {
  setAddExercise(false)
  setRemoveExercise(false)
  setEditExercise(false)
  setAddDay(false)
  setRemoveDay(false)
  setAddWeek(false)
  setModifyDay(false)
  setModifyStructure(false)
  setRemoveWeek(false)
}

const showNotification = (message) => {
    setNotificationMessage(message)
    var successPopup = document.getElementById("success-popup")
    successPopup.style.display = "flex"
}

const addDays = (params) => {
  const url1 = "http://localhost:8081/weeks?week=" + params['weekNum'] + "&program=" + programName['program']
    console.log(url1)
    const response1 = getFetch(url1)
    response1
      .then(res => {
        const daysInWeek = res[0]['numDay']
        const url = "http://localhost:8081/weeks/modify-days" 
        console.log()

        const data = {
            numDays: encodeURIComponent(parseInt(params['dayNum']) + parseInt(daysInWeek)),
            weekNum: encodeURIComponent(params['weekNum']),
            programName: encodeURIComponent(programName['program'])
        }
        const response2 = putFetch(url, data)
        response2
            .then(res => {
              console.log(res)

              const url3 = "http://localhost:8081/create/exercise"
              for (var i = 1; i <= params['dayNum']; i++) {
                const data = {
                  name: '-',
                  warmupSets: '-',
                  workingSets: '-',
                  reps: '-',
                  percentage: '-',
                  notes: '-',
                  week: encodeURIComponent(params['weekNum']),
                  day: encodeURIComponent(i + parseInt(daysInWeek)),
                  programName: encodeURIComponent(programName['program'])
                }
                const response3 = postFetch(url3, data)
                response3
                  .then(data => {
                    setExercises(data)
                  })
                  .catch(error => {
                    console.error("Error: ", error)
                  })
              }
              
            fetchDay()
            showNotification("Day count updated!")
            })
            .catch(error => {
            console.error("Error: ", error)
            })
      })
      .catch(error => {
        return error
      })
}
    // 1. retrieve all exercises that match the day and the week
    // 2. hit the delete endpoint with each exercise in that list using its ID
    // 3. retrieve all exercises in the week
    // 4. find all exercises in week whose day number is greater than the one removed
    // 5. Update all exercises greater by decrementing their day num by 1
    // 6. update weeks table to decrement day num by 1
  const removeDayHandler = (params) => {
    console.log("Remove Day Params: ", params)
    const url1 = "http://localhost:8081/exercises/day?week=" + params['weekNum'] + "&day=" + params['dayNum'] + "&programName=" + programName['program']
    console.log(url1)
    const response1 = getFetch(url1)
    response1
      .then(data => {
        console.log("Removing exercises: ", data)
        if(data.length != 0) {
          const idList = []
          data.forEach(obj => {
              Object.keys(obj).forEach(key => {
                  if(key == 'id') {
                    idList.push(obj[key])
                  }
              });
          });
          console.log(idList)
          idList.forEach(val => {
            console.log(val)
            fullDeleteExercise({id: `${val}`})
          })
        }
        const url2 = "http://localhost:8081/exercises/week?week=" + params['weekNum'] + "&programName=" + programName['program']
        const response2 = getFetch(url2)
        response2
          .then(data => {
            console.log(data)
            const daysToUpdate = []
            data.forEach(obj => {
              console.log(parseInt(obj['day']))
              if(parseInt(obj['day']) > parseInt(params['dayNum'])) {
                daysToUpdate.push(obj)
              }
            });
            const url3 = "http://localhost:8081/weeks" + "?program=" + programName['program'] + "&week=" + params['weekNum']
            const response3 = getFetch(url3)
            response3
              .then(res => {
                daysToUpdate.forEach(exercise => {
                  const newForm = {}
                  newForm.id = exercise['id']
                  newForm.day = parseInt(exercise['day']) - 1
                  updateExercise(newForm)
                })
                // decrement day count for week
                const url = "http://localhost:8081/weeks/modify-days" 
                console.log()
    
                const updateData = {
                    numDays: encodeURIComponent(res[0]['numDay'] - 1),
                    weekNum: encodeURIComponent(params['weekNum']),
                    programName: encodeURIComponent(programName['program'])
                }
                const r2 = putFetch(url, updateData)
                r2
                .then(res => {
                  console.log(res)
                }).
                catch(error => {
                  console.error("error: ", error)
                })
              })
              .catch(error => {
                console.error("Error: ", error)
              })
            
            console.log(daysToUpdate)
          })
          .catch(error => {
            console.log("Error: ", error)
          })
      })
      .catch(error => {
        console.error("Error: ", error)
      })
  }

  const addWeekHandler = (param) => {
    const url = "http://localhost:8081/add/week"
    const newWeekCount = weeksInProgram + 1
    const data = {
      program: programName['program'],
      weekNum: newWeekCount,
      dayNum: param['numDay']
    }
    const response = postFetch(url, data)
    response.then(data => {
      console.log(data)
      const url3 = "http://localhost:8081/create/exercise"
      for (var i = 1; i <= parseInt(param['numDay']); i++) {
        const data = {
          name: '-',
          warmupSets: '-',
          workingSets: '-',
          reps: '-',
          percentage: '-',
          notes: '-',
          week: newWeekCount,
          day: i,
          programName: encodeURIComponent(programName['program'])
        }
        const response3 = postFetch(url3, data)
        response3
          .then(data => {
            setExercises(data)
            console.log(data)
          })
          .catch(error => {
            console.error("Error: ", error)
          })
      }
      fetchWeekCount()
    })
    .catch(error => {
      console.error("error: ", error)
    })
    console.log(data)
  }

  const handleRemoveWeek = (param) => {
    console.log("week to remove: ", param['weekNum'])
    // 1. Get all exercises with corresponding week number --DONE
    // 2. Delete all these exercises --DONE
    // 3. Delete this week from the weeks table --DONE
    // 4. Get all weeks from week table that are greater than this week
    // 5. Get all exercises for those weeks
    // 5. Update all exercises to decrement their week number by 1
    // 6. Decrement all weeks in week table by 1
    const url1 = "http://localhost:8081/exercises/week?week=" + param['weekNum'] + "&programName=" + programName['program']
    const response1 = getFetch(url1)
    .then(data1 => {
      console.log(data1)
      const originalExerciseIDs = []
      for (var i = 0; i < data1.length; i++) {
        originalExerciseIDs.push({id: data1[i]['id']})
      }
      for (var i = 0; i < originalExerciseIDs.length; i++) {
        const urlD = "http://localhost:8081/remove/exercise"
        const body = {
          id: originalExerciseIDs[i]['id']
        }
        const responseD = deleteFetch(urlD, body)
        .then(data => {
          console.log(data)
        })
        .catch(error => {
          console.error("error: ", error)
        })
      }
      const url2 = "http://localhost:8081/weeks/info?week=" + param['weekNum'] + "&program=" + programName['program']
      const response2 = getFetch(url2)
      .then(data => {
        const url3 = "http://localhost:8081/remove/week"
        const body3 = {
          id: data[0]['id']
        }
        deleteFetch(url3, body3)
        const url4 = "http://localhost:8081/exercises"
        const response4 = getFetch(url4)
        .then(data4 => {
          console.log(data4)
          const exercisesToDrecementWeek = data4.filter(item => item.week > param['weekNum']);
          const url5 = "http://localhost:8081/weeks/program?program=" + programName['program']
          const response5 = getFetch(url5)
          .then(data5 => {
            const weeksToDecrement = data5.filter(item => item.week > param['weekNum'])
            // update exercises
            for (var i = 0; i < exercisesToDrecementWeek.length; i++) {
              const body = {
                week: parseInt(exercisesToDrecementWeek[i]['week']) - 1,
                id: exercisesToDrecementWeek[i]['id']
              }
              updateExercise(body)
            }
            for (var i = 0; i < weeksToDecrement.length; i++) {
              const body = {
                week: parseInt(weeksToDecrement[i]['week']) - 1,
                id: weeksToDecrement[i]['id']
              }
              const url6 = "http://localhost:8081/weeks/week"
              const response6 = putFetch(url6, body)
              .then(data6 => {
                console.log(data6)
              })
              .catch(error => {
                console.error("error: ", error)
              })
            }
            console.log(exercisesToDrecementWeek)
            console.log(weeksToDecrement)
          })
          .catch(error => {
            console.error("error: ", error)
          })
          console.log(exercisesToDrecementWeek)
        })
        .catch(error => {
          console.error("error: ", error)
        })
      })
      .catch(error => {
        console.error("error: ", error)
      })
    })
    .catch(error => {
      console.error("erorr: ", error)
    })
    
  }

  return (
    <div className="day-view-page">
        <div className="container text-center" id="table-container">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th className="text-white text-center bg-black" scope="col">#</th>
                <th className="text-white text-center bg-black" scope="col">Exercise</th>
                <th className="text-white text-center bg-black"scope="col">Warmup Sets</th>
                <th className="text-white text-center bg-black" scope="col">Working Sets</th>
                <th className="text-white text-center bg-black" scope="col">Reps</th>
                <th className="text-white text-center bg-black" scope="col">Percentage/RPE</th>
                <th className="text-white text-center bg-black" scope="col">Notes</th>
                <th className="text-white text-center bg-black" scope="col">ID</th>
              </tr>
            </thead>
            <tbody>
              {exercises && exercises.map && exercises.map((exercise, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{exercise.name}</td>
                  <td>{exercise.warmupSets}</td>
                  <td>{exercise.workingSets}</td>
                  <td>{exercise.reps}</td>
                  <td>{exercise.percentage}</td>
                  <td>{exercise.notes}</td>
                  <td>{exercise.id}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="container text-center" id="page-container">
            <FaRegArrowAltCircleLeft  size={28} style={{ cursor: leftArrowHover ? 'pointer' : 'hand' }} onMouseEnter={() => setLeftArrowHover(true)} onMouseLeave={() => setLeftArrowHover(false)}  className="page-arrow" onClick={() => {
                dayNumber > 1 
                    ? setDayNumber(dayNumber - 1) 
                    : weekNumber > 1 
                        ? leftEdgeHelper()
                        : showNotification("Can't go back further.");
                    }}/>
            <span id="current-day-marker">Day {dayNumber}</span>
            <FaRegArrowAltCircleRight size={28} style={{ cursor: rightArrowHover ? 'pointer' : 'hand' }} onMouseEnter={() => setRightArrowHover(true)} onMouseLeave={() => setRightArrowHover(false)} className="page-arrow" onClick={() => {dayNumber > daysInCurrentWeek ? setDayNumber(dayNumber) : setDayNumber(dayNumber + 1)}}/>
          </div>
          <div className="container text-center" id="page-container">
            <FaRegArrowAltCircleLeft  size={28} style={{ cursor: leftArrowHover ? 'pointer' : 'hand' }} onMouseEnter={() => setLeftArrowHover(true)} onMouseLeave={() => setLeftArrowHover(false)} className="page-arrow" onClick={() => {weekNumber > 1 ? setWeekNumber(weekNumber - 1) : showNotification("Can't go back further.")}}/>
            <span id="current-day-marker">Week {weekNumber}</span>
            <FaRegArrowAltCircleRight size={28} style={{ cursor: rightArrowHover ? 'pointer' : 'hand' }} onMouseEnter={() => setRightArrowHover(true)} onMouseLeave={() => setRightArrowHover(false)} className="page-arrow" onClick={() => {weekNumber == weeksInProgram ? showNotification("End of program reached. Add more days to continue.") : setWeekNumber(weekNumber + 1)}}/>
          </div>
          
          <div className="container text-center" id="modify-container">
            {modifyOptions && 
              <>
                <button className="flex px-3 py-2 bg-blue-400 mr-1 text-white font-semibold rounded" id="edit-button" onClick={() => {resetWindows(); modifyDay ? setModifyDay(false) : setModifyDay(true);}}> Modify Exercises </button>
                <button className="flex px-3 py-2 bg-blue-400 mr-1 text-white font-semibold rounded" id="edit-button" onClick={() => {resetWindows(); modifyStructure ? setModifyStructure(false) : setModifyStructure(true);}}> Modify Structure </button>
              </>
            }
          </div>
          <div className="container text-center" id="edit-container">
            {modifyDay && 
              <>
                <button className="flex px-3 py-2 bg-blue-400 mr-1 text-white font-semibold rounded" id="edit-button"  onClick={() => {closeWindows(true); addExercise ? setAddExercise(false) : setAddExercise(true);}}> Add Exercise </button>
                <button className="flex px-3 py-2 bg-blue-400 mr-1 text-white font-semibold rounded" id="edit-button" onClick={() => {closeWindows(true);  editExercise ? setEditExercise(false) : setEditExercise(true)}}> Edit Exercise </button>
                <button className="flex px-3 py-2 bg-blue-400 mr-1 text-white font-semibold rounded" id="edit-button" onClick={() => {closeWindows(true);  removeExercise ? setRemoveExercise(false) : setRemoveExercise(true)}}> Remove Exercise </button> 
              </>
            }
            {modifyStructure && 
              <>
                <button className="flex px-3 py-2 bg-blue-400 mr-1 text-white font-semibold rounded" id="edit-button"  onClick={() => {closeWindows(false); addDay ? setAddDay(false) : setAddDay(true);}}> Add Day </button>
                <button className="flex px-3 py-2 bg-blue-400 mr-1 text-white font-semibold rounded" id="edit-button" onClick={() => {closeWindows(false);  removeDay ? setRemoveDay(false) : setRemoveDay(true)}}> Remove Day </button>
                <button className="flex px-3 py-2 bg-blue-400 mr-1 text-white font-semibold rounded" id="edit-button" onClick={() => {closeWindows(false);  addWeek ? setAddWeek(false) : setAddWeek(true)}}> Add Week </button>
                <button className="flex px-3 py-2 bg-blue-400 mr-1 text-white font-semibold rounded" id="edit-button" onClick={() => {closeWindows(false);  removeWeek ? setRemoveWeek(false) : setRemoveWeek(true)}}> Remove Week </button>
              </>
            }       
          </div>
          <div className="container text-center" id="edit-options">
            {addExercise && <AddExerciseForm onFormSubmit={createExercise}></AddExerciseForm>}
            {removeExercise && <RemoveExerciseForm onFormSubmit={deleteExercise}></RemoveExerciseForm>}
            {editExercise && <EditExerciseForm onFormSubmit={updateExercise}></EditExerciseForm>}
            {addDay && <AddDayForm onFormSubmit={addDays}></AddDayForm>}
            {removeDay && <RemoveDayForm onFormSubmit={removeDayHandler}></RemoveDayForm>}
            {addWeek && <AddWeekForm onFormSubmit={addWeekHandler}></AddWeekForm>}
            {removeWeek && <RemoveWeekForm onFormSubmit={handleRemoveWeek}></RemoveWeekForm>}
            <Notification message={notificationMessage}></Notification>
          </div>
        </div>
    </div>
  );
}

export default DayView;
