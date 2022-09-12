import { useState, useEffect } from 'react'
import styled from '@emotion/styled'
import Formulario from "./componentes/Formulario"
import Resultado from './componentes/Resultado'
import Spinner from './componentes/Spinner'
import ImagenCripto from './img/fondo.jpg'

const Contenedor = styled.div`
  max-width: 900px;
  margin: 0 auto;
  width: 90%;
  display: flex;
  justify-content: center;

`
const Imagen = styled.img`
  max-width: 400px;
  width: 80%;
  margin: 100px auto 0 auto;
  display: block;
`

const Heading = styled.h1`
  font-family: 'Lato', sans-serif;
  color: #FFF;
  text-align: center;
  font-weight: 700;
  margin-top: 80px;
  margin-bottom: 50px;
  font-size: 34px;

  &::after {
    content: '';
    width: 400px;
    height: 6px;
    background-color: #9497FF;
    display: block;
    margin: 10px auto 0 auto;
  }
` 

function App() {

  const [ monedas, setMonedas ] = useState({})
  const [ resultado, setResultado ] = useState({})
  const [ cargando, setCargando ] = useState(false)

  useEffect(() => {
      if(Object.keys(monedas).length > 0) {
          
        const cotizarCripto = async () => {
            setCargando(true)
            setResultado({})

            const { moneda, criptomoneda } = monedas
            const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`

            const respuesta = await fetch(url)
            const resultado = await respuesta.json()

            setResultado(resultado.DISPLAY[criptomoneda][moneda])

            setCargando(false)
        }

        cotizarCripto()
      }
  }, [monedas])

  return (
      <Contenedor>
          <div>
              <Heading>Cotizar Criptomonedas</Heading>
              <Formulario 
                setMonedas={setMonedas}
              />

              {cargando && <Spinner />}
              {resultado.PRICE && <Resultado resultado={resultado} />} 
          </div>

      </Contenedor>
  )
}

export default App
