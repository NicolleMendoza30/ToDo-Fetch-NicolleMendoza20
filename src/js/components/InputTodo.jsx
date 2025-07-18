import React, { useState } from 'react';
import { useEffect } from 'react';


function InputTodo() {
    const [tareas, setTareas] = useState([]);
    const [inputV, setInput] = useState('');


    
    
    useEffect(() => {
        fetch("https://playground.4geeks.com/todo/todos/Nicolle")
            .then(respuesta => respuesta.json())
            .then(data => {
                if (data.todos) {
                    const API = data.todos.map(todo => todo.label);
                    setTareas(API);
                }
            })
            .catch(err => console.error("Error cargando tareas:", err));
    }, []);

    const agregarTarea = () => {
        const espacio = inputV.trim();
        if (espacio === '') return;
        setTareas([...tareas, espacio]);
        setInput('');
    

        fetch("https://playground.4geeks.com/todo/todos/Nicolle", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ label: espacio, done: false }),
        })
            .then(respuesta => {
                if (!respuesta.ok) throw new Error("Error agregando tarea");
                return respuesta.json();
            })
            .then(() => {
            })
            .catch(err => console.error(err));
    
        
        
    };

    const eliminarTareas = (indexDelete) => {
        setTareas(tareas.filter((_, index) => index !== indexDelete


        ));
        
        

    };
    fetch("https://playground.4geeks.com/todo/todos/Nicolle",{
        method:"DELETE",
        headers: {'Content-Type': 'application.json'},
        body: JSON.stringify(Tareas)

    })
    
    return (
        <div className="list-group  ">
            <h1 className='fw-lighter'>todos</h1>
            <input className='input-group shadow-lg'
                type="text"
                placeholder='¿Que hacer?'
                value={inputV}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && agregarTarea()
                }
            />
            <ul className='tareas  '>
                {tareas.map((tarea, index) => (
                    <li className='list-group-item shadow-lg' key={index}>{tarea}
                        <div className='boton'>
                            <span><button onClick={() => eliminarTareas(index)}>✖️</button></span>
                        </div>

                    </li>
                ))}
            </ul>
            <p className='input-group'>{tareas.length} item{tareas.length !== 1 ? 's' : ''} </p>
        </div>
    )

}

export default InputTodo;