import React, { useEffect, useState } from 'react';

function InputTodo() {
    const [tasks, setTasks] = useState([]);
    const [data, setData] = useState('');

    // Obtener todos los todos del usuario
    const getTodos = () => {
        fetch("https://playground.4geeks.com/todo/users/Nicolle", {
            method: 'GET',
            headers: { "Content-Type": "application/json" },
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.todos) {
                    setTasks(data.todos);
                }
            })
            .catch((error) => console.log(error));
    };

    // Crear el usuario si no existe
    const createUser = () => {
        fetch("https://playground.4geeks.com/todo/users/Nicolle", {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
        })
            .then((response) => {
                if (!response.ok) {
                    console.log("El usuario ya existe o error al crearlo");
                }
                getTodos();
            })
            .catch((error) => console.log(error));
    };

    // Crear una nueva tarea
    const createTodo = () => {
        if (data.trim() === '') return;

        fetch("https://playground.4geeks.com/todo/todos/Nicolle", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                label: data,
                is_done: false
            }),
        })
            .then((response) => response.json())
            .then(() => {
                setData('');
                getTodos();
            })
            .catch((error) => console.log(error));
    };

    // Eliminar una tarea
    const deleteTodo = (id) => {
        fetch("https://playground.4geeks.com/todo/todos/" + id, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" }
        })
            .then((response) => {
                if (response.ok) {
                    getTodos();
                }
            })
            .catch((error) => console.log(error));
    };

    useEffect(() => {
        createUser();
    }, []);

    return (
        <div className="list-group">
            <h1 className='fw-lighter'>todos</h1>
            <input
                className='input-group shadow-lg'
                type="text"
                placeholder='¿Qué hacer?'
                value={data}
                onChange={(e) => setData(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && createTodo()}
            />
            <ul className='tareas'>
                {tasks.map((task, index) => (
                    <li className='list-group-item shadow-lg d-flex justify-content-between' key={task.id}>
                        {task.label}
                        <button onClick={() => deleteTodo(task.id)}>✖️</button>
                    </li>
                ))}
            </ul>
            <p className='input-group'>{tasks.length} item{tasks.length !== 1 ? 's' : ''}</p>
        </div>
    );
}

export default InputTodo;