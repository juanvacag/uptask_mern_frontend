import {useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import Alerta from '../components/Alerta'
import clienteAxios from '../config/clienteAxios'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [alerta, setAlerta] = useState({})

    const handleSubmit = async e=> {
        e.preventDefault()

        if([email, password].includes('')) {
            setAlerta({
                msg: 'Todos los campos son obligatorios',
                error: true
            })
            return
        }
        try {
            const {data} = await clienteAxios.post('/usuarios/login', {email, password})
            //console.log(data)
            setAlerta({})
            localStorage.setItem('token', data.token)
        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true
            })
        }
    }

    const {msg} = alerta

  return (
   <>
    <h1 className="text-sky-600 font-black text-5xl capitalize text-center">Inicia sesión y administra tus {''}
        <span className="text-slate-700">proyectos</span>
    </h1>

    {msg && <Alerta alerta={alerta} />}
    <form 
        className="my-10 bg-white shadow rounded-lg p-10"
        onSubmit={handleSubmit}
        >
        <div className="my-5">
            <label 
                className="uppercase text-gray-600 block text-xl font-bold"
                htmlFor="email"
                >Email</label>
            <input 
                id="email"
                type="email"
                placeholder="Email de Registro"
                className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                value={email}
                onChange={e => setEmail(e.target.value)}
            />
        </div>

        <div className="my-5">
            <label 
                className="uppercase text-gray-600 block text-xl font-bold"
                htmlFor="email"
                >Password</label>
            <input 
                id="password"
                type="password"
                placeholder="Password de Registro"
                className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                value={password}
                onChange={e => setPassword(e.target.value)}
            />
        </div>
        <input
            type="submit"
            value="iniciar sesión"
            className="bg-sky-700 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors"
        />
    </form>
    <nav className="lg:flex lg:justify-between px-5">
            <Link
                className="block text-center my-5 text-slate-500 uppercase text-sm"
                to="/registrar"
            >¿No tienes una cuenta? Registrate</Link>

            <Link
                className="block text-center my-5 text-slate-500 uppercase text-sm"
                to="/olvide-password"
            >Olvide mi Password</Link>
    </nav>
   </>
  )
}

export default Login