import React, { useState } from 'react';

function WeekView() {

    const [exercises, setExercises] = useState([{}])

  return (
    <div className="home-page">
        <div className="container text-center" id="table-container">
            <table className="table table-bordered">
                <thead>
                <tr>
                    <th scope="col">Week #</th>
                    <th scope="col">Exercise</th>
                    <th scope="col">Warmup Sets</th>
                    <th scope="col">Working Sets</th>
                    <th scope="col">Reps</th>
                    <th scope="col">Percentage/RPE</th>
                    <th scope="col">Notes</th>
                    <th scope="col">ID</th>
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
        </div>
    </div>
  );
}

export default WeekView;
