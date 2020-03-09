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
import Collapse from '@material-ui/core/Collapse';
import CircularProgress from '@material-ui/core/CircularProgress';



class Filters extends Component {
   state = {
      filtrosRecibidos: {}, 
      marcas: [],
      color: [],
      quality: [],
      chequeados: [],
      colorChecked: [],
      qualityChecked: [],
      models: [],
      modelChecked: [],
      loading: true,
      showModels: false,
      brandsToFilter: '',
      colorsToFilter: '',
      qualitysToFilter: '',
      modelsToFilter: ''
      
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
      this.setState({ chequeados: auxMarcas, colorChecked: auxColor, qualityChecked: auxQuality });
      console.log(chequeados);
      console.log(colorChecked);
      console.log(qualityChecked);
   }

   agreeToFilter(aFiltrar, tipo, borrarModelsToFilter){
      const { brandsToFilter, modelsToFilter, colorsToFilter, qualitysToFilter } = this.state;
      let arrayDeFiltros = [ "", "", "", "" ]
      switch(tipo){
         case "marcas": if(borrarModelsToFilter){
                           arrayDeFiltros = [ aFiltrar, "", colorsToFilter, qualitysToFilter ]
                        }
                        else{ arrayDeFiltros = [ aFiltrar, modelsToFilter, colorsToFilter, qualitysToFilter ] }
                        this.setState({ brandsToFilter: aFiltrar });
                        break;
         case "models": arrayDeFiltros = [ brandsToFilter, aFiltrar, colorsToFilter, qualitysToFilter ]
                        this.setState({ modelsToFilter: aFiltrar });
                        break;
         case "color": arrayDeFiltros = [ brandsToFilter, modelsToFilter, aFiltrar, qualitysToFilter ]
                        this.setState({ colorsToFilter: aFiltrar });
                        break;
         case "quality": arrayDeFiltros = [ brandsToFilter, modelsToFilter, colorsToFilter, aFiltrar ]
                        this.setState({ qualitysToFilter: aFiltrar });
                        break;
         
      }
            
      console.log(arrayDeFiltros);
            
      this.props.onFiltrarTermino(arrayDeFiltros);

   }
   
   checkFilters(checkeds, valores){
      let filtrar = ''
      checkeds.map((check, index) => {
         if(check === true){
             filtrar = `${filtrar}-${valores[index]}` 
         }
         
      } )
      return filtrar;
   }
   handleChange(index) {
      const { chequeados, marcas, filtrosRecibidos, modelChecked, models } = this.state;
      let borrarModelsToFilter = false
      let auxChequeados = chequeados;
      auxChequeados[index] = !chequeados[index];
      this.setState({ chequeados: auxChequeados });
      let modelos = auxChequeados.filter(this.searchModels);
      if(modelos.length === 1){
         this.setState({ showModels: true, models: filtrosRecibidos[`${marcas[auxChequeados.indexOf(true)].toLowerCase()}`] });
         let auxModels = [];
         for (let i=0; i < filtrosRecibidos[`${marcas[auxChequeados.indexOf(true)].toLowerCase()}`].length; i++) {
            auxModels[i] = false;
         }
         this.setState({ modelChecked: auxModels });
         console.log(auxModels);
         
         // this.setState({ modelChecked: auxModels });
      }
      else{
         borrarModelsToFilter = true
         let auxParaBorrar = modelChecked;
         modelChecked.map((item, indice) => {
            if(item === true){
               auxParaBorrar[indice] = false; 
            }
         } )
         
         this.setState( (prevState) => { return { showModels: false, models: prevState.models !== [null] ? [null] : prevState.models, modelChecked: auxParaBorrar, modelsToFilter: ""}});
      }
      let f = this.checkFilters(chequeados, marcas);
      console.log(f);
      console.log(models);
      
      this.agreeToFilter(f, 'marcas', borrarModelsToFilter);
   }

   searchModels(dato){
      return dato === true;
   }

   handleChangeModels(index) {
      const { modelChecked, models } = this.state;
      let aux = modelChecked;
      aux[index] = !modelChecked[index];
      this.setState({ modelChecked: aux });
      
      let f = this.checkFilters(modelChecked, models);
      console.log(f);
      // this.props.onFiltrarTermino(filtrar);
      this.agreeToFilter(f, 'models');
   }

   handleChangeColor(index) {
      const { colorChecked, color } = this.state;
      let aux = colorChecked;
      aux[index] = !colorChecked[index];
      this.setState({ colorChecked: aux });
      
      let f = this.checkFilters(colorChecked, color);
      console.log(f);
      // this.props.onFiltrarTermino(filtrar);
      this.agreeToFilter(f, 'color');
   }

   handleChangeQuality(index) {
      const { qualityChecked, quality } = this.state;
      let aux = qualityChecked;
      aux[index] = !qualityChecked[index];
      this.setState({ qualityChecked: aux });
      
      let f = this.checkFilters(qualityChecked, quality);
      console.log(f);
      // this.props.onFiltrarTermino(filtrar);
      this.agreeToFilter(f, 'quality');
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
         this.setState( { filtrosRecibidos: response.data, marcas: response.data.brand, color: response.data.color, quality: response.data.quality, loading: false } );
   }
   
   render(){
      const { marcas, chequeados, color, colorChecked, quality, qualityChecked, loading, models, modelChecked, showModels } = this.state;
      return (
         <div className="filters-wrapper">
            <RctCard>
               <RctCardContent>
                  <div style={{ marginBottom:"5px", fontWeight:"700" }} >MARCA</div>
                  <div style={{ maxHeight: '12em', height: '100%', overflowY: 'scroll'  }} >
                     <FormGroup >
                        
                        { loading ? <CircularProgress /> 
                        : ( 
                           
                           marcas.map((filtro, index) => {
                              return (
                                 <div /* className='ui checkbox' */ >
                                    <input 
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
            <Collapse in={showModels} timeout={500} >
               <RctCard className="brand">
                  <RctCardContent>
                     <div style={{ marginBottom:"5px", fontWeight:"700" }} >MODELO</div>
                     <div style={{ maxHeight: '12em', height: '100%', overflowY: 'scroll'  }} >
                        <FormGroup >
                           { 
                             models.map((filtro, index) => {
                                 return (
                                    <div /* className='ui checkbox' */ >
                                       <input 
                                                   // checked={chequeados[index]} 
                                                   type='checkbox'
                                                   id= {filtro}
                                                   onChange={() => { this.handleChangeModels(index) }} 
                                                   value={modelChecked[index]} 
                                                />
                                       <label style={{ marginLeft: "5px" }}> {filtro/* .toLowerCase().charAt(0).toUpperCase() + filtro.toLowerCase().substring(1) */} </label>
                                    </div>
                                 );
                             }) 
                            
                           }
                                 
                        </FormGroup>
                     </div>
                  </RctCardContent>
               </RctCard>
            </Collapse>
            <RctCard className="categories">
               <RctCardContent>
                  <div style={{ marginBottom:"5px", fontWeight:"700" }} >COLOR</div>
                  <div style={{ maxHeight: '12em', height: '100%', overflowY: 'scroll'  }} >
                     <FormGroup >
                        
                        { loading ? <CircularProgress /> 
                        : ( 
                           
                           color.map((filtro, index) => {
                              return (
                                 <div /* className='ui checkbox' */ >
                                    <input 
                                                // checked={chequeados[index]} 
                                                type='checkbox'
                                                id= {filtro}
                                                onChange={() => { this.handleChangeColor(index) }} 
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
            <RctCard className="categories">
               <RctCardContent>
                  <div style={{ marginBottom:"5px", fontWeight:"700" }} >CALIDAD</div>
                  <div style={{ maxHeight: '12em', height: '100%', overflowY: 'scroll'  }} >
                     <FormGroup >
                        
                        { loading ? <CircularProgress /> 
                        : ( 
                           
                           quality.map((filtro, index) => {
                              return (
                                 <div /* className='ui checkbox' */ >
                                    <input 
                                                // checked={chequeados[index]} 
                                                type='checkbox'
                                                id= {filtro}
                                                onChange={() => { this.handleChangeQuality(index) }} 
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
            {
            // <RctCard>
            //    <RctCardContent>
            //       {/* <Panel header="Rating Menu">
            //          <RatingMenu
            //             attribute="rating"
            //             min={1}
            //             max={5}
            //             translations={{
            //                ratingLabel: ""
            //             }}
            //          />
            //       </Panel> */}
            //    </RctCardContent>
            // </RctCard>
            // <RctCard>
            //    <RctCardContent>
            //    {/* <ClearRefinements /> */}
            //    </RctCardContent>
            // </RctCard> 
               }
         </div>
      )
   }
}
export default Filters;

