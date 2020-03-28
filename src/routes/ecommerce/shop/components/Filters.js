/**
 * Filters Component
 */
import React, { Component } from 'react';


// Card Component
import { RctCard, RctCardContent } from 'Components/RctCard';

import Filtros from '../../../../apis/Filtros';

import CircularProgress from '@material-ui/core/CircularProgress';
import FiltroAccesorios from './FiltroAccesorios';
import FiltroPartes from './FiltroPartes';
import FiltroBatLen from './FiltroBatLen';



class Filters extends Component {
   state = {
      filtrosRecibidos: {}, 
      loading: true,
      showModels: false,
      brandsToFilter: '',
      colorsToFilter: '',
      qualitysToFilter: '',
      modelsToFilter: '',
      
   }
   componentDidMount(){
      const { categoria } = this.props;
      
      this.cargar(categoria);
   }
   componentWillReceiveProps(nextProps){
      const { categoria } = this.props;
      console.log(categoria + nextProps.categoria);
            
      if(nextProps.categoria !== categoria){
         this.getFilters(nextProps.categoria)
      }
            
   }

   
   cargar(cater) {
      const { marcas, color, quality, chequeados, colorChecked, qualityChecked } = this.state;
      this.getFilters(cater);
      
   }

   async getFilters(categoria){
      this.setState({ loading: true });
      let category = categoria
      if(categoria !== 'accesorios'){
         category = ''
      }
      else {
         category = "/accesories"
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
         console.log(response);
         this.setState( { filtrosRecibidos: response.data, loading: false } );
   }

   
   agreeToFilter(aFiltrar, tipo, borrarModelsToFilter){
      const { brandsToFilter, modelsToFilter, colorsToFilter, qualitysToFilter } = this.state;
      let arrayDeFiltros = [ "", "", "", "" ]
      switch(tipo){
         case "brand": if(borrarModelsToFilter){
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
    
   
   render(){
      const { marcas, chequeados, color, colorChecked, quality, qualityChecked, loading, models, modelChecked, showModels } = this.state;
      const { categoria } = this.props;
      return (
         <div>
         
         {categoria === 'accesorios' ? <FiltroAccesorios 
                                                  filtros={this.state.filtrosRecibidos}
                                                  loading={loading}
                                                  checkFilters={this.checkFilters}
                                                  onAgreeToFilter={this.agreeToFilter.bind(this)} 
                                       /> 
                                     : '' 
         }
         {categoria === 'partes' ? <FiltroPartes 
                                                  filtros={this.state.filtrosRecibidos}
                                                  loading={loading}
                                                  checkFilters={this.checkFilters}
                                                  onAgreeToFilter={this.agreeToFilter.bind(this)} 
                                       /> 
                                     : '' 
         }
         {categoria === 'baterias' || categoria === 'lensun' ? <FiltroBatLen 
                                                                     filtros={this.state.filtrosRecibidos}
                                                                     loading={loading}
                                                                     checkFilters={this.checkFilters}
                                                                     onAgreeToFilter={this.agreeToFilter.bind(this)} 
                                                            /> 
                                                         : '' 
         }
        </div>
      )
   }
}
export default Filters;

