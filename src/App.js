import { Fragment } from "react";
import React, {useState,useEffect} from 'react';
import Formulario  from './components/Formulario';
import axios from 'axios';
import Cancion  from './components/Cancion';
import Info  from './components/Info';


function App() {
  //definimos el state
  const [busquedaLetra, guardarBusquedaLetra] = useState({});//se crea objeto vacio
  const [letra, guardarLetra] = useState('');
  const [info,guardarInfo] = useState({});

  useEffect(() => {
    if(Object.keys(busquedaLetra).length === 0) return;

    const consultarApiLetra = async () =>{
      const {artista,cancion} = busquedaLetra;
      const url =`https://api.lyrics.ovh/v1/${artista}/${cancion}`;
      const url2 = `https://www.theaudiodb.com/api/v1/json/1/search.php?s=${artista}`;

      const [letra,informacion] = await Promise.all([//para consultar de manera paralela
        axios(url),
        axios(url2)
      ]);

     /* const resultado = await axios(url);
      const resultado2 = await axios(url2); 
      consulta ambas apis de manera secuencial*/
        guardarLetra(letra.data.lyrics);
        guardarInfo(informacion.data.artists[0]);
      //guardarLetra(resultado.data.lyrics);
    }

    consultarApiLetra();
    
  }, [busquedaLetra,info]);

  return (
    <Fragment>
        <Formulario
          guardarBusquedaLetra={guardarBusquedaLetra}//se envia el obc vacio a la pantalla fprmulario
        />

        <div className="container mt-5">
          <div className="row">
            <div className="col-md-6">
              <Info
              info={info}
              />
            </div>
            <div className="col-md-6">
            <Cancion
                letra={letra}
            />
            </div>
          </div>
        </div>
    </Fragment>
  );
}

export default App;
