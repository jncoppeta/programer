import React, { useState, useEffect } from 'react';
import Notification from './Notification';
import './Sandbox.css'

const SandboxForm = ({ selectProgram }) => {

  const [pendingPrograms, setPendingPrograms] = useState([])

  const [publishedPrograms, setPublishedPrograms] = useState([])

  const [allPrograms, setAllPrograms] = useState([])

  const [optionsScreen, setOptionsScreen] = useState(true)

  const [notificationMessage, setNotificationMessage] = useState(false)

  const [showPending, setShowPending] = useState(false)

  const [showCreate, setShowCreate] = useState(false)

  const [showDelete, setShowDelete] = useState(false)

  const [showPublish, setShowPublish] = useState(false)

  const [showBacklog, setShowBacklog] = useState(false)

  const handlePageRefresh = () => {
    // Force the browser to reload the current page
    window.location.reload();
  };

  const [input, setInput] = useState({
    name: '',
    description: ''
  })

  const [deleteInput, setDeleteInput] = useState({
    id: ''
  })

  const [publishInput, setPublishInput] = useState({
    id: ''
  })

  useEffect(() => {
    const url1 = "http://localhost:8081/programs/pending"
    const response1 = getFetch(url1)
    response1
      .then(data => {
        console.log("Programs: ", data)
        setPendingPrograms(data)
      })
      .catch(error => {
        console.error("Error: ", error)
      })
    const url2 = "http://localhost:8081/programs/published"
    const response2 = getFetch(url2)
    response2
    .then(data => {
        console.log("Programs: ", data)
        setPublishedPrograms(data)
    })
    .catch(error => {
        console.error("Error: ", error)
    })
    const url3 = "http://localhost:8081/programs"
    const response3 = getFetch(url3)
    response3
    .then(data => {
        console.log("Programs: ", data)
        setAllPrograms(data)
    })
    .catch(error => {
        console.error("Error: ", error)
    })
  }, [])

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

    const handleInputChange = (inputName, value) => {
    setInput(prevValues => ({
        ...prevValues,
        [inputName]: value,
    }))
  }

    const handleDelete = (id) => {
        console.log("deleting program id: ", id)

        const url = "http://localhost:8081/remove/program" 
        const data = {id: encodeURIComponent(id['id'])}
        const response = deleteFetch(url, data)
        response
          .then(data => {
            console.log("Response: ", data)

            setNotificationMessage("Program successfully deleted!")
            var successPopup = document.getElementById("success-popup")
            successPopup.style.display = "flex"

            setShowPublish(false)
            setOptionsScreen(true)
          })
          .catch(error => {
            console.error("Error: ", error)
            var successPopup = document.getElementById("success-popup")
            successPopup.style.display = "flex"
            setNotificationMessage("Error:", error)
          })   
        
    }

  const handleDeleteInputChange = (inputName, value) => {
    setDeleteInput(prevValues => ({
        ...prevValues,
        [inputName]: value,
    }))
  }

  const handlePublish = (id) => {
    console.log(id)
    const url = "http://localhost:8081/publish/program" 
    const data = {
        id: encodeURIComponent(id['id'])
    }
    const response = putFetch(url, data)
    response
        .then(data => {
            console.log("Response: ", data)
            
            setNotificationMessage("Program successfully published!")
            var successPopup = document.getElementById("success-popup")
            successPopup.style.display = "flex"
            setShowPublish(false)
            setOptionsScreen(true)
        })
        .catch(error => {
            console.error("Error: ", error)
            var successPopup = document.getElementById("success-popup")
            successPopup.style.display = "flex"
            setNotificationMessage("Error:", error)
        })

  }

  const handleBacklog = (id) => {
    console.log(id)
    const url = "http://localhost:8081/backlog/program" 
    const data = {
        id: encodeURIComponent(id['id'])
    }
    const response = putFetch(url, data)
    response
        .then(data => {
            console.log("Response: ", data)
            
            setNotificationMessage("Program successfully published!")
            var successPopup = document.getElementById("success-popup")
            successPopup.style.display = "flex"

            setShowPublish(false)
            setOptionsScreen(true)
        })
        .catch(error => {
            console.error("Error: ", error)
            var successPopup = document.getElementById("success-popup")
            successPopup.style.display = "flex"
            setNotificationMessage("Error: ", error)
        })
  }

  const handlePublishInputChange = (inputName, value) => {
    setPublishInput(prevValues => ({
        ...prevValues,
        [inputName]: value,
    }))
  }

  const handleProgramSelected = (program) => {
    console.log(program)
    selectProgram(program)
  }

  const handleSubmit = () => {
    console.log("Submitting exercise: ", input)
    const url = "http://localhost:8081/create/program"
    const data = {
        name: input['name'],
        description: input['description']
    }
    const response = postFetch(url, data)
    response
    .then(data => {
      console.log("Response: ", data)
      const url2 = "http://localhost:8081/add/week"
      const data2 = {
        weekNum: 1,
        dayNum: 1,
        program: input['name']
      }
      const response2 = postFetch(url2, data2)
      .then(data2 => {
        const url3 = "http://localhost:8081/create/exercise"
        const data3 = {
          name: '-',
          warmupSets: '-',
          workingSets: '-',
          reps: '-',
          percentage: '-',
          notes: '-',
          week: 1,
          day: 1,
          programName: encodeURIComponent(input['name'])
        }
        const response3 = postFetch(url3, data3)
        .then(data3 => {
          console.log(data3)
        })
        .catch(error => {
          console.error("error: ", error)
        })
      })
      .catch(error => {
        console.error("error: ", error)
      })
      setNotificationMessage("Program successfully created!")
      var successPopup = document.getElementById("success-popup")
      successPopup.style.display = "flex"

      setShowCreate(false)
      setOptionsScreen(true)
    })
    .catch(error => {
      console.error("Error: ", error)
      var successPopup = document.getElementById("success-popup")
      successPopup.style.display = "flex"
      setNotificationMessage("Error: ", error)
    })
    setInput({
        name: '',
        description: ''
    })
    
    // selectProgram(input)
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

  return (
    <div className="sandbox-form">
        <div className='justify-center min-h-screen bg-gradient-to-br'id="form-container">
            <div className='w-full max-w-lg px-10 py-8 mx-auto bg-white rounded-lg shadow-xl'>
                <div className='max-w-md mx-auto space-y-6' id="rough-draft-div"> 
                    { optionsScreen &&
                        <div className="flex flex-col">
                            <h1 className="mb-3 text-3xl font-extrabold text-center text-black">Sanbox Options</h1>

                            <button className="h-10 px-5 m-2 text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded-lg hover:bg-indigo-800" onClick={() => {setShowCreate(true); setOptionsScreen(false)}}>Create New Program</button>

                            <button className="h-10 px-5 m-2 text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded-lg hover:bg-indigo-800" onClick={() => {setShowPending(true); setOptionsScreen(false);}}>Edit Backlogged Program</button>

                            <button className="h-10 px-5 m-2 text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded-lg hover:bg-indigo-800" onClick={() => {setShowPublish(true); setOptionsScreen(false);}}>Publish Program</button>

                            <button className="h-10 px-5 m-2 text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded-lg hover:bg-indigo-800" onClick={() => {setShowBacklog(true); setOptionsScreen(false);}}>Backlog Program</button>

                            <button className="h-10 px-5 m-2 text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded-lg hover:bg-indigo-800" onClick={() => {setShowDelete(true); setOptionsScreen(false);}}>Delete Program</button>
                        </div>
                    }
                    { showPending && 
                        <div className="flex flex-col" id="pending-div">
                            <h1 className="mb-3 text-3xl font-extrabold text-center text-black">Load Rough Draft</h1>

                            {pendingPrograms.map((program, index) => (
                                <button className="h-10 px-5 m-2 text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded-lg hover:bg-indigo-800" key={index} onClick={() => handleProgramSelected(program)}> 
                                    {program.name}
                                </button>
                            ))}

                            <button className="h-5 px-5 m-2 text-black transition-colors duration-150 rounded-lg" onClick={() => {setShowPending(false); setOptionsScreen(true);}}>Back</button>
                        </div>
                    }
                    { showCreate &&
                        <div className="flex flex-col" id="create-div">
                            <h1 className="mb-3 text-3xl font-extrabold text-center text-black">Create Program</h1>

                            <div className="row" id="create-program-form-input">
                                <div className="col" id="create-program-form-input">
                                    <div className="relative h-10 w-full min-w-[200px]" id="create-program-form-input">
                                        <input
                                        className="peer h-full w-full rounded-[7px] border border-teal-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-black outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-teal-gray-200 placeholder-shown:border-t-teal-gray-200 focus:border-2 focus:border-teal-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-teal-gray-50"
                                        placeholder=" "
                                        onChange= {(e) => handleInputChange('name', e.target.value)}
                                        />
                                        <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-teal-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-teal-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-teal-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-teal-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-teal-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-teal-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-teal-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-teal-gray-500">
                                        Program Name
                                        </label>
                                    </div>
                                </div>
                            </div>  
                            <div className="row" id="create-program-form-input">
                                <div className="col" id="create-program-form-input">
                                    <div className="relative h-10 w-full min-w-[200px]" id="create-program-form-input">
                                        <input
                                        className="peer h-full w-full rounded-[7px] border border-teal-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-black outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-teal-gray-200 placeholder-shown:border-t-teal-gray-200 focus:border-2 focus:border-teal-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-teal-gray-50"
                                        placeholder=" "
                                        onChange= {(e) => handleInputChange('description', e.target.value)}
                                        />
                                        <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-teal-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-teal-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-teal-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-teal-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-teal-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-teal-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-teal-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-teal-gray-500">
                                        Program Description
                                        </label>
                                    </div>
                                </div>
                            </div>  
                            <div className="container text-center" id="edit-container">
                                <button className="h-10 px-5 m-2 text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded-lg hover:bg-indigo-800" onClick={() => {handleSubmit(); handlePageRefresh()}}>Create</button>
                            </div>   

                            <button className="h-5 px-5 m-2 text-black transition-colors duration-150 rounded-lg" onClick={() => {setShowCreate(false); setOptionsScreen(true);}}>Back</button>
                        </div>
                    }
                    { showDelete &&
                        <div className="flex flex-col" id="delete-div">
                            <h1 className="mb-3 text-3xl font-extrabold text-center text-black">Remove Program</h1>

                            <table className="table table-bordered">
                                <tbody>
                                    <tr>
                                        <td className="text-white text-center bg-black">Program Name</td>
                                        <td className="text-white text-center bg-black">Program ID</td>
                                    </tr>
                                    {allPrograms.map((program, index) => (
                                        <tr key={index}>
                                            <td className="text-black text-center">{program.name}</td>
                                            <td className="text-black text-center">{program.id}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            <div className="row" id="delete-program-form-input">
                                <div className="col" id="delete-program-form-input">
                                    <div className="relative h-10 w-full min-w-[200px]" id="delete-program-form-input">
                                        <input
                                        className="peer h-full w-full rounded-[7px] border border-teal-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-black outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-teal-gray-200 placeholder-shown:border-t-teal-gray-200 focus:border-2 focus:border-teal-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-teal-gray-50"
                                        placeholder=" "
                                        onChange= {(e) => handleDeleteInputChange('id', e.target.value)}
                                        />
                                        <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-teal-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-teal-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-teal-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-teal-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-teal-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-teal-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-teal-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-teal-gray-500">
                                        Program ID
                                        </label>
                                    </div>
                                </div>
                            </div>  
                            <div className="container text-center" id="edit-container">
                                <button className="h-10 px-5 m-2 text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded-lg hover:bg-indigo-800" id="edit-button" onClick={() => {handleDelete(deleteInput); setShowDelete(false); handlePageRefresh()}}>Remove</button>
                            </div>  
                            <button className="h-5 px-5 m-2 text-black transition-colors duration-150 rounded-lg" onClick={() => {setShowDelete(false); setOptionsScreen(true);}}>Back</button>
                        </div>
                    }
                    { showPublish &&
                        <div className="flex flex-col" id="publish-div">
                            <h1 className="mb-3 text-3xl font-extrabold text-center text-black">Publish Program</h1>

                            <table className="table table-bordered">
                                <tbody>
                                    <tr>
                                        <td className="text-white text-center bg-black">Program Name</td>
                                        <td className="text-white text-center bg-black">Program ID</td>
                                    </tr>
                                    {pendingPrograms.map((program, index) => (
                                        <tr key={index}>
                                            <td className="text-black text-center">{program.name}</td>
                                            <td className="text-black text-center">{program.id}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            <div className="row" id="delete-program-form-input">
                                <div className="col" id="delete-program-form-input">
                                    <div className="relative h-10 w-full min-w-[200px]" id="delete-program-form-input">
                                        <input
                                        className="peer h-full w-full rounded-[7px] border border-teal-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-black outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-teal-gray-200 placeholder-shown:border-t-teal-gray-200 focus:border-2 focus:border-teal-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-teal-gray-50"
                                        placeholder=" "
                                        onChange= {(e) => handlePublishInputChange('id', e.target.value)}
                                        />
                                        <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-teal-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-teal-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-teal-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-teal-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-teal-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-teal-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-teal-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-teal-gray-500">
                                        Program ID
                                        </label>
                                    </div>
                                </div>
                            </div>  
                            <div className="container text-center" id="edit-container">
                                <button className="h-10 px-5 m-2 text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded-lg hover:bg-indigo-800" id="edit-button" onClick={() => {handlePublish(publishInput); handlePageRefresh()}}>Publish</button>
                            </div>  
                            <button className="h-5 px-5 m-2 text-black transition-colors duration-150 rounded-lg" onClick={() => {setShowPublish(false); setOptionsScreen(true); handlePageRefresh();}}>Back</button>
                        </div>
                    }
                    { showBacklog && 
                        <div className="flex flex-col" id="backlog-div">
                            <h1 className="mb-3 text-3xl font-extrabold text-center text-black">Backlog Program</h1>

                            <table className="table table-bordered">
                                <tbody>
                                    <tr>
                                        <td className="text-white text-center bg-black">Program Name</td>
                                        <td className="text-white text-center bg-black">Program ID</td>
                                    </tr>
                                    {publishedPrograms.map((program, index) => (
                                        <tr key={index}>
                                            <td className="text-black text-center">{program.name}</td>
                                            <td className="text-black text-center">{program.id}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            <div className="row" id="delete-program-form-input">
                                <div className="col" id="delete-program-form-input">
                                    <div className="relative h-10 w-full min-w-[200px]" id="delete-program-form-input">
                                        <input
                                        className="peer h-full w-full rounded-[7px] border border-teal-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-black outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-teal-gray-200 placeholder-shown:border-t-teal-gray-200 focus:border-2 focus:border-teal-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-teal-gray-50"
                                        placeholder=" "
                                        onChange= {(e) => handlePublishInputChange('id', e.target.value)}
                                        />
                                        <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-teal-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-teal-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-teal-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-teal-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-teal-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-teal-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-teal-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-teal-gray-500">
                                        Program ID
                                        </label>
                                    </div>
                                </div>
                            </div>  
                            <div className="container text-center" id="edit-container">
                                <button className="h-10 px-5 m-2 text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded-lg hover:bg-indigo-800" id="edit-button" onClick={() => {handleBacklog(publishInput); setShowBacklog(false); handlePageRefresh();}}>Backlog</button>
                            </div>  
                            <button className="h-5 px-5 m-2 text-black transition-colors duration-150 rounded-lg" onClick={() => {setShowBacklog(false); setOptionsScreen(true);}}>Back</button>
                        </div>
                    }
                    <Notification message={notificationMessage}></Notification>
                </div>
            </div>
        </div>
    </div>
  );
};

export default SandboxForm;
