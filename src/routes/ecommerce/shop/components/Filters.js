/**
 * Filters Component
 */
import React, { Component } from 'react';
import { Panel, RefinementList, SearchBox, HierarchicalMenu, RatingMenu, ClearRefinements, NumericMenu, RangeInput } from 'react-instantsearch-dom';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
// Card Component
import { RctCard, RctCardContent } from 'Components/RctCard';
import { Button } from '@material-ui/core';
import Filtros from '../../../../apis/Filtros';


class Filters extends Component {
   state = { 
      marcas: [],
      color: [],
      quality: [],
      loading: true,
      chequeados: [],
      colorChecked: [],
      qualityChecked: []
   }
   
   componentDidMount() {
      const { marcas, color, quality, chequeados, colorChecked, qualityChecked } = this.state;
      this.getFilters();
      let auxMarcas = [];
      for (let i=0; i < marcas.length; i++) {
         auxMarcas[i] = false;
      }
      let auxColor = [];
      for (let i=0; i < color.length; i++) {
         auxColor[i] = false;
      }
      let auxQuality = [];
      for (let i=0; i < quality.length; i++) {
         auxQuality[i] = false;
      }
      this.setState({ chequeados: auxMarcas, color: auxColor, quality: auxQuality });
      console.log(chequeados);
      console.log(color);
      console.log(quality);
      
      
      
   }
   
   handleChange(index) {
      const { chequeados, marcas } = this.state;
      let auxChequeados = chequeados;
      auxChequeados[index] = !chequeados[index];
      this.setState({ chequeados: auxChequeados });
      let filtrar = [];
      chequeados.map((check, index) => {
         if(check === true){
             filtrar.push(marcas[index])
         }
         else{
            filtrar.splice(index, 1)
         }
      } )
      console.log(filtrar);
      this.props.onFiltrarTermino(filtrar);

   }

   async getFilters(){
      
      this.setState({ loading: true });
      
      const response = await Filtros.get('partes',{
         params: {
            // maxResults: 30,
            // q: `${termino}`
            
         }
      });
         console.log(response.data);
         this.setState( { marcas: response.data.brand, color: response.data.color, quality: response.data.quality, loading: false } );
   }
   
   render(){
      const { marcas, chequeados, color, colorChecked, quality, qualityChecked, loading } = this.state;
      return (
         <div className="filters-wrapper">
            <RctCard>
               <RctCardContent>
                  <div style={{ marginBottom:"5px", fontWeight:"700" }} >MARCA</div>
                  <div style={{ maxHeight: '12em', height: '100%', overflowY: 'scroll'  }} >
                     <FormGroup >
                        
                        { loading ? 'cargando...' 
                        : ( 
                           
                           marcas.map((filtro, index) => {
                              return (
                                 <div /* className='ui checkbox' */ >
                                    <input 
                                                // checked={chequeados[index]} 
                                                type='checkbox'
                                                id= {filtro}
                                                onChange={() => { this.handleChange(index) }} 
                                                value={chequeados[index]} 
                                             />
                                    <label style={{ marginLeft: "5px" }}> {filtro.toLowerCase().charAt(0).toUpperCase() + filtro.toLowerCase().substring(1)} </label>
                                 </div>
                              );
                           }) 
                        ) 
                        }
                              
                     </FormGroup>
                  </div>
               </RctCardContent>
            </RctCard>
            <RctCard className="brand">
               <RctCardContent>
                  {/* <Panel header="Brand">
                     <RefinementList attribute="brand" limit={5} />
                  </Panel> */}
               </RctCardContent>
            </RctCard>
            <RctCard className="categories">
               <RctCardContent>
                  <div style={{ marginBottom:"5px", fontWeight:"700" }} >COLOR</div>
                  <div style={{ maxHeight: '12em', height: '100%', overflowY: 'scroll'  }} >
                     <FormGroup >
                        
                        { loading ? 'cargando...' 
                        : ( 
                           
                           color.map((filtro, index) => {
                              return (
                                 <div /* className='ui checkbox' */ >
                                    <input 
                                                // checked={chequeados[index]} 
                                                type='checkbox'
                                                id= {filtro}
                                                onChange={() => { this.handleChange(index) }} 
                                                value={colorChecked[index]} 
                                             />
                                    <label style={{ marginLeft: "5px" }}> {filtro.toLowerCase().charAt(0).toUpperCase() + filtro.toLowerCase().substring(1)} </label>
                                 </div>
                              );
                           }) 
                        ) 
                        }
                              
                     </FormGroup>
                  </div>
               </RctCardContent>
            </RctCard>
            <RctCard className="price">
               <RctCardContent>
                  <div style={{ marginBottom:"5px", fontWeight:"700" }} >CALIDAD</div>
                  <div style={{ maxHeight: '12em', height: '100%', overflowY: 'scroll'  }} >
                     <FormGroup >
                        
                        { loading ? 'cargando...' 
                        : ( 
                           
                           quality.map((filtro, index) => {
                              return (
                                 <div /* className='ui checkbox' */ >
                                    <input 
                                                // checked={chequeados[index]} 
                                                type='checkbox'
                                                id= {filtro}
                                                onChange={() => { this.handleChange(index) }} 
                                                value={qualityChecked[index]} 
                                             />
                                    <label style={{ marginLeft: "5px" }}> {filtro.toLowerCase().charAt(0).toUpperCase() + filtro.toLowerCase().substring(1)} </label>
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
                  {/* <Panel header="Rating Menu">
                     <RatingMenu
                        attribute="rating"
                        min={1}
                        max={5}
                        translations={{
                           ratingLabel: ""
                        }}
                     />
                  </Panel> */}
               </RctCardContent>
            </RctCard>
            <RctCard>
               <RctCardContent>
               {/* <ClearRefinements /> */}
               </RctCardContent>
            </RctCard> 
         </div>
      )
   }
}
export default Filters;

