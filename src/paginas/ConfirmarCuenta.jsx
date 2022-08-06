import { useEffect, useState } from 'react'
import {useParams, Link } from 'react-router-dom'
import clienteAxios from '../config/clienteAxios'
import Alerta from '../components/Alerta'

const ConfirmarCuenta = () => {

  const [alerta, setAlerta] = useState({})
  const [cuentaComfirmada, setCuentaComfirmada] = useState(false)

  const params = useParams()
  //console.log(params)
  const {id} = params

  useEffect(() => {
    const confirmarCuenta = async () => {
      try {
        const url = `/usuarios/confirmar/${id}`
        const {data} = await clienteAxios(url)

        setAlerta({
          msg: data.msg,
          error: false
        })
        setCuentaComfirmada(true)

      } catch (error) {
        //console.log(error)
        setAlerta({
          msg: error.response.data.msg,
          error: true
        })
      }
    }
    confirmarCuenta()
  },[])

  const {msg} = alerta

  return (
    <>
        <h1 className="text-sky-600 font-black text-5xl capitalize text-center">Confirma tu cuenta y comienza a crear tus {''}
            <span className="text-slate-700">proyectos</span>
        </h1>
        <div className='mt-20 md:mt-10 shadow-lg px-5 py-10 roumded-xl bg-white'>
          {msg && <Alerta alerta={alerta} />}

          {cuentaComfirmada && (
            <Link
                className="block text-center my-5 text-slate-500 uppercase text-sm"
                to="/"
            >Inicia Sesión</Link>
          )}
        </div>
    </>
  )
}

export default ConfirmarCuenta