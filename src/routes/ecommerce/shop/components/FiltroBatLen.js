import React, { useState } from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import { RctCard, RctCardContent } from 'Components/RctCard';
import CircularProgress from '@material-ui/core/CircularProgress';
import Collapse from '@material-ui/core/Collapse';




const FiltroBatLen = (props) => {
    const [marcasChequeadas, setMarcasChequeadas] = useState([]);
    const [modelosChequeados, setModelosChequeados] = useState([]);
    const [mostrarModelos, setMostrarModelos] = useState(false);
     
    
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

     
    return(
        
         <div>
            <RctCard>
               <RctCardContent>
                  <div style={{ marginBottom:"5px", fontWeight:"700" }} >MARCA</div>
                  <div style={{ maxHeight: '12em', height: '100%', overflowY: 'auto' }}>
                     <FormGroup >
                        
                        { props.loading ? <CircularProgress /> 
                        : ( 
                           
                           props.filtros.brand.map((filtro, index) => {
                              return (
                                 <div /* className='ui checkbox' */ >
                                    <input 
                                                type='checkbox'
                                                id= {filtro}
                                                onChange={() => { handleChangeMarca(index) }} 
                                                value={marcasChequeadas[index]} 
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
                     <div style={{ maxHeight: '12em', height: '100%', overflowY: 'auto'  }} >
                        <FormGroup >
                           {marcasChequeadas.indexOf(true) !== -1 ? ( 
                            props.filtros[`${props.filtros.brand[marcasChequeadas.indexOf(true)].toLowerCase()}`].map((filtro, index) => {
                                 return (
                                    <div /* className='ui checkbox' */ >
                                       <input 
                                                   // checked={chequeados[index]} 
                                                   type='checkbox'
                                                   id= {filtro}
                                                   onChange={() => { handleChangeModelos(index) }} 
                                                   value={modelosChequeados[index]} 
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
         </div>
            
        
    );
}

export default FiltroBatLen;