/**
 * Filters Component
 */
import React, { Component } from 'react';


// Card Component
import { RctCard, RctCardContent } from 'Components/RctCard';

import { Button, Badge } from 'reactstrap';

import Filtros from '../../../../apis/Filtros';

import CircularProgress from '@material-ui/core/CircularProgress';
import FiltroAccesorios from './FiltroAccesorios';
import FiltrosGenerales from './FiltrosGenerales';



class Filters extends Component {
   state = {
      filtrosRecibidos: {}, 
      loading: true,
      showModels: false,
      brandsToFilter: '',
      colorsToFilter: '',
      qualitysToFilter: '',
      modelsToFilter: '',
      brandAccToFilter: '',
      typesToFilter: '',
      cleanFilters: false
      
   }
   componentDidMount(){
      const { categoria } = this.props;
      
      this.cargar(categoria);
   }
   componentWillReceiveProps(nextProps){
      const { categoria } = this.props;
      // console.log(categoria + nextProps.categoria);
            
      if(nextProps.categoria !== categoria){
         this.getFilters(nextProps.categoria)
      }
            
   }

   cleanFiltersChange(){
      this.setState({ cleanFilters: false });
   }
   
   cargar(cater) {
      const { marcas, color, quality, chequeados, colorChecked, qualityChecked } = this.state;
      this.getFilters(cater);
      
   }

   async getFilters(categoria){
      this.setState({ loading: true });
      let category = categoria
      
      if(categoria !== 'accessories'){
         category = ''
      }
      else {
         category = "/accessories"
      }
      
      const response = await Filtros.get(category /* ,{
         params: {
            // maxResults: 30,
            // q: `${termino}`
            
         },
         headers: {
            "Content-Type": 'application/json',
            "X-Requested-With": "XMLHttpRequest",
         }
      } */);
         // console.log(response.data);
         this.setState( { filtrosRecibidos: response.data, loading: false } );
   }

   
   agreeToFilter(aFiltrar, tipo, borrarModelsToFilter){
      const { brandsToFilter, modelsToFilter, colorsToFilter, qualitysToFilter, brandAccToFilter, typesToFilter } = this.state;
      let arrayDeFiltros = [ "", "", "", "" , "", ""]
      switch(tipo){
         case "brand": if(borrarModelsToFilter){
                           arrayDeFiltros = [ aFiltrar, "", colorsToFilter, qualitysToFilter, brandAccToFilter, typesToFilter ]
                        }
                        else{ arrayDeFiltros = [ aFiltrar, modelsToFilter, colorsToFilter, qualitysToFilter, brandAccToFilter, typesToFilter ] }
                        this.setState({ brandsToFilter: aFiltrar });
                        break;
         case "models": arrayDeFiltros = [ brandsToFilter, aFiltrar, colorsToFilter, qualitysToFilter, brandAccToFilter, typesToFilter ]
                        this.setState({ modelsToFilter: aFiltrar });
                        break;
         case "color": arrayDeFiltros = [ brandsToFilter, modelsToFilter, aFiltrar, qualitysToFilter, brandAccToFilter, typesToFilter ]
                        this.setState({ colorsToFilter: aFiltrar });
                        break;
         case "quality": arrayDeFiltros = [ brandsToFilter, modelsToFilter, colorsToFilter, aFiltrar, brandAccToFilter, typesToFilter ]
                        this.setState({ qualitysToFilter: aFiltrar });
                        break;
         case "brandAcc": arrayDeFiltros = [ brandsToFilter, modelsToFilter, colorsToFilter, qualitysToFilter, aFiltrar, typesToFilter ]
                        this.setState({ brandAccToFilter: aFiltrar });
                        break;
         case "type":   arrayDeFiltros = [ brandsToFilter, modelsToFilter, colorsToFilter, qualitysToFilter, brandAccToFilter, aFiltrar ]
                        this.setState({ typesToFilter: aFiltrar });
                        break;
         default:       arrayDeFiltros = [ "", "", "", "" , "", ""];
                        this.setState({ brandsToFilter: '', modelsToFilter: '', colorsToFilter: '', qualitysToFilter: '', brandAccToFilter: '', typesToFilter: '' });
                        break;
      }
            
      // console.log(arrayDeFiltros);
            
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
    
   
   render(){
      const { marcas, chequeados, color, colorChecked, quality, qualityChecked, loading, models, modelChecked, showModels } = this.state;
      const { categoria } = this.props;
      return (
         <div>
            <div className="cleanFilters">
               <Button color="primary" outline size="sm" block onClick={() => this.setState({ cleanFilters: true }) }>
                  Limpiar filtros
               </Button>
            </div>
            {categoria === 'accessories' ? <FiltroAccesorios 
                                                   filtros={this.state.filtrosRecibidos}
                                                   loading={loading}
                                                   checkFilters={this.checkFilters}
                                                   onAgreeToFilter={this.agreeToFilter.bind(this)}
                                                   onCleanFilters={this.state.cleanFilters}
                                                   onCleanFiltersChange={this.cleanFiltersChange.bind(this)} 
                                          /> 
                                       : '' 
            }
            {categoria !== 'accessories' ? <FiltrosGenerales 
                                                   filtros={this.state.filtrosRecibidos}
                                                   loading={loading}
                                                   checkFilters={this.checkFilters}
                                                   onAgreeToFilter={this.agreeToFilter.bind(this)}
                                                   category={categoria}
                                                   onCleanFilters={this.state.cleanFilters}
                                                   onCleanFiltersChange={this.cleanFiltersChange.bind(this)} 
                                          /> 
                                       : '' 
            }
            
        </div>
      )
   }
}
export default Filters;

