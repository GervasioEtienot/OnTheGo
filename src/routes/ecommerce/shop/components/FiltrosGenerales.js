import React, { useState, useEffect } from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import { RctCard, RctCardContent } from 'Components/RctCard';
import CircularProgress from '@material-ui/core/CircularProgress';
import Collapse from '@material-ui/core/Collapse';
import './Filters.css';



const FiltrosGenerales = (props) => {
    const [marcasChequeadas, setMarcasChequeadas] = useState([]);
    const [coloresChequeados, setColoresChequeados] = useState([]);
    const [calidadesChequeadas, setCalidadesChequeadas] = useState([]);
    const [modelosChequeados, setModelosChequeados] = useState([]);
    const [mostrarModelos, setMostrarModelos] = useState(false);
    
    useEffect(() => {
      cleanFilters();
      if(props.onCleanFilters){
         props.onCleanFiltersChange();
      }
      return () => props.onAgreeToFilter('borrarFiltros');
    },[props.category, props.onCleanFilters]);
    
    const cleanFilters = () => {
       setMarcasChequeadas(marcasChequeadas.fill(false));
       setColoresChequeados(coloresChequeados.fill(false));
       setCalidadesChequeadas(calidadesChequeadas.fill(false));
       setModelosChequeados(modelosChequeados.fill(false));
    }

    const handleChangeMarca = (index) => {
        let borrarModelsToFilter = false
        let aux = marcasChequeadas;
        aux[index] = !marcasChequeadas[index];
        setMarcasChequeadas(aux);
                     
        let modelos = marcasChequeadas.filter(searchModels);
        if(modelos.length === 1){
            setMostrarModelos(true);
        }
        else {
            setModelosChequeados(modelosChequeados.fill(false));
            console.log(modelosChequeados);
            setMostrarModelos(false);
            borrarModelsToFilter = true;
        }

        let f = props.checkFilters(marcasChequeadas, props.filtros.brand);
        // console.log(f);
        props.onAgreeToFilter(f, 'brand', borrarModelsToFilter);
     }
     
     const searchModels = (dato) => {
        return dato === true;
     }

     const handleChangeModelos = (index) => {
        
        let aux = modelosChequeados;
        aux[index] = !modelosChequeados[index];
        setModelosChequeados(aux)
        
        let f = props.checkFilters(modelosChequeados, props.filtros[`${props.filtros.brand[marcasChequeadas.indexOf(true)].toLowerCase()}`]);
        // console.log(f);
        
        props.onAgreeToFilter(f, 'models');
     }

     const handleChangeColor = (index) => {
        
        let aux = coloresChequeados;
        aux[index] = !coloresChequeados[index];
        setColoresChequeados(aux)
        
        let f = props.checkFilters(coloresChequeados, props.filtros.color);
        // console.log(f);
        
        props.onAgreeToFilter(f, 'color');
     }
    
     const handleChangeCalidad = (index) => {
        
        let aux = calidadesChequeadas;
        aux[index] = !calidadesChequeadas[index];
        setCalidadesChequeadas(aux)
        
        let f = props.checkFilters(calidadesChequeadas, props.filtros.quality);
        // console.log(f);
        
        props.onAgreeToFilter(f, 'quality');
     }
    
    const esUnArray = () => {
       return Array.isArray(props.filtros[`${props.filtros.brand[marcasChequeadas.indexOf(true)].toLowerCase()}`]);
    }

    return(
        
             
            <div>
            <RctCard>
               <RctCardContent>
                  <div style={{ marginBottom:"5px", fontWeight:"700" }} >MARCA</div>
                  <div className='filterContainer'>
                     <FormGroup >
                        
                        { props.loading ? <CircularProgress /> 
                        : ( 
                           
                           props.filtros.brand.map((filtro, index) => {
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
            <Collapse in={mostrarModelos} timeout={500} >
               <RctCard className="brand">
                  <RctCardContent>
                     <div style={{ marginBottom:"5px", fontWeight:"700" }} >MODELO</div>
                     <div className='filterContainer' >
                        <FormGroup >
                           {marcasChequeadas.indexOf(true) !== -1 && esUnArray() ? ( 
                            props.filtros[`${props.filtros.brand[marcasChequeadas.indexOf(true)].toLowerCase()}`].map((filtro, index) => {
                                 return (
                                    <div key={index} >
                                       <input 
                                                   // checked={chequeados[index]} 
                                                   type='checkbox'
                                                   id= {filtro}
                                                   onChange={() => { handleChangeModelos(index) }} 
                                                   value={filtro}
                                                   checked={modelosChequeados[index]} 
                                                />
                                       <label style={{ marginLeft: "5px" }}> {filtro} </label>
                                    </div>
                                 );
                             }) 
                           ) : ''
                           }
                                 
                        </FormGroup>
                     </div>
                  </RctCardContent>
               </RctCard>
            </Collapse>
            {props.category === 'batteries' || props.category === 'lensun' ? '' 
               : (
                  <RctCard>
                     <RctCardContent>
                        <div style={{ marginBottom:"5px", fontWeight:"700" }} >COLOR</div>
                        <div className='filterContainer'>
                           <FormGroup >
                              
                              { props.loading ? <CircularProgress /> 
                              : ( 
                                 
                                 props.filtros.color.map((filtro, index) => {
                                    return (
                                       <div key={index} >
                                          <input 
                                                      type='checkbox'
                                                      id= {filtro}
                                                      onChange={() => { handleChangeColor(index) }} 
                                                      value={filtro}
                                                      checked={coloresChequeados[index]} 
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
                  )
               }
            {props.category === 'batteries' || props.category === 'lensun' ? '' 
               : (
                  <RctCard>
                     <RctCardContent>
                        <div style={{ marginBottom:"5px", fontWeight:"700" }} >CALIDAD</div>
                        <div className='filterContainer'>
                           <FormGroup >
                              
                              { props.loading ? <CircularProgress /> 
                              : ( 
                                 
                                 props.filtros.quality.map((filtro, index) => {
                                    return (
                                       <div key={index} >
                                          <input 
                                                      type='checkbox'
                                                      id= {filtro}
                                                      onChange={() => { handleChangeCalidad(index) }} 
                                                      value={filtro}
                                                      checked={calidadesChequeadas[index]} 
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
                  )
               }
            </div>
            
        
    );
}

export default FiltrosGenerales;