import React, { useState, useEffect } from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import { RctCard, RctCardContent } from 'Components/RctCard';
import CircularProgress from '@material-ui/core/CircularProgress';




const FiltroAccesorios = (props) => {
    const [marcasChequeadas, setMarcasChequeadas] = useState([]);
    const [tiposChequeados, setTiposChequeados] = useState([]);
     
    useEffect(() => {
      return () => props.onAgreeToFilter('borrarFiltros');
    },[]);

    const handleChangeMarca = (index) => {
        
        let aux = marcasChequeadas;
        aux[index] = !marcasChequeadas[index];
        setMarcasChequeadas(aux)
        
        let f = props.checkFilters(marcasChequeadas, props.filtros.marca);
        console.log(f);
        
        props.onAgreeToFilter(f, 'brandAcc');
     }

     const handleChangeTipo = (index) => {
        
        let aux = tiposChequeados;
        aux[index] = !tiposChequeados[index];
        setTiposChequeados(aux)
        
        let f = props.checkFilters(tiposChequeados, props.filtros.tipo);
        console.log(f);
        
        props.onAgreeToFilter(f, 'type');
     }
    
    
    return(
        
             
            <div>
            <RctCard>
               <RctCardContent>
                  <div style={{ marginBottom:"5px", fontWeight:"700" }} >MARCA</div>
                  <div style={{ maxHeight: '12em', height: '100%', overflowY: 'auto' }}>
                     <FormGroup >
                        
                        { props.loading ? <CircularProgress /> 
                        : ( 
                           
                           props.filtros.marca.map((filtro, index) => {
                              return (
                                 <div key={index} >
                                    <input 
                                                type='checkbox'
                                                id= {filtro}
                                                onChange={() => { handleChangeMarca(index) }} 
                                                value={filtro}
                                                checked={marcasChequeadas[index]} 
                                             />
                                    <label style={{ marginLeft: "5px" }}> {filtro.charAt(0) + filtro.toLowerCase().substring(1)} </label>
                                 </div>
                              );
                           }) 
                        ) 
                        }
                              
                     </FormGroup>
                  </div>
               </RctCardContent>
            </RctCard>
            <RctCard>
               <RctCardContent>
                  <div style={{ marginBottom:"5px", fontWeight:"700" }} >TIPO</div>
                  <div style={{ maxHeight: '12em', height: '100%', overflowY: 'auto' }}>
                     <FormGroup >
                        
                        { props.loading ? <CircularProgress /> 
                        : ( 
                           
                           props.filtros.tipo.map((filtro, index) => {
                              return (
                                 <div key={index} >
                                    <input 
                                                type='checkbox'
                                                id= {filtro}
                                                onChange={() => { handleChangeTipo(index) }} 
                                                value={filtro}
                                                checked={tiposChequeados[index]} 
                                             />
                                    <label style={{ marginLeft: "5px" }}> {filtro.charAt(0) + filtro.toLowerCase().substring(1)} </label>
                                 </div>
                              );
                           }) 
                        ) 
                        }
                              
                     </FormGroup>
                  </div>
               </RctCardContent>
            </RctCard>
            </div>
            
        
    );
}

export default FiltroAccesorios;