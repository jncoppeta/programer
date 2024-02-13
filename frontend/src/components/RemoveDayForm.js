import React, { useState } from 'react';

const RemoveDayForm = ({ onFormSubmit }) => {

    const [input, setInput] = useState({
        weekNum: '',
        dayNum: ''
      })

    const handleInputChange = (inputName, value) => {
        setInput(prevValues => ({
            ...prevValues,
            [inputName]: value,
        }))
      }
    
      const handleSubmit = () => {
        console.log("Submitting exercise: ", input)
        onFormSubmit(input)
      }

      return (
        <div className="exercise-modal">
                <div className="row" id="add-exercise-form-input">
                    <div className="col" id="add-exercise-form-input">
                        <div className="relative h-10 w-full min-w-[200px]" id="add-exercise-form-input">
                            <input
                            className="peer h-full w-full rounded-[7px] border border-teal-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-teal-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-teal-gray-200 placeholder-shown:border-t-teal-gray-200 focus:border-2 focus:border-teal-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-teal-gray-50"
                            placeholder=" "
                            onChange= {(e) => handleInputChange('weekNum', e.target.value)}
                            />
                            <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-teal-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-teal-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-teal-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-teal-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-teal-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-teal-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-teal-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-teal-gray-500">
                            Week Number
                            </label>
                        </div>
                    </div>
                    <div className="col" id="add-exercise-form-input">
                        <div className="relative h-10 w-full min-w-[200px]" id="add-exercise-form-input">
                            <input
                            className="peer h-full w-full rounded-[7px] border border-teal-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-teal-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-teal-gray-200 placeholder-shown:border-t-teal-gray-200 focus:border-2 focus:border-teal-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-teal-gray-50"
                            placeholder=" "
                            onChange= {(e) => handleInputChange('dayNum', e.target.value)}
                            />
                            <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-teal-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-teal-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-teal-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-teal-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-teal-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-teal-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-teal-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-teal-gray-500">
                            Day Number
                            </label>
                        </div>
                    </div>
                </div>  
                <div className="container text-center" id="edit-container">
                    <button className="flex px-3 py-2 bg-blue-400 text-white font-semibold rounded" id="edit-button" onClick={handleSubmit}>Remove Days</button>
                </div>   
        </div>
      );
}

export default RemoveDayForm;
