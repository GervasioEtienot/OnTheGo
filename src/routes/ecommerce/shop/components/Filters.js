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
      // filtros: {
      //    marca:[
      //       "SAMSUNG",
      //       "MOTOROLA",
      //       "APPLE",
      //       "ALCATEL",
      //       "BLACKBERRY",
      //       "LUMIA\/MICROSOFT",
      //       "SONY",
      //       "LG",
      //       "HUAWEI"
      //    ],
      //    calidad:[
      //       "ORIGINAL",
      //       "ALTA COPIA",
      //       "COPIA AAA",
      //       "COPIA AA"
      //    ]
      // },
      marcas: [],
      loading: true,
      chequeados: []
   }
   
   componentDidMount() {
      const { marcas, chequeados } = this.state;
      this.getFilters();
      let aux = [];
      for (let i=0; i < marcas.length; i++) {
         aux[i] = false;
      }
      this.setState({ chequeados: aux });
      console.log(chequeados);
      
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
      

   }

   async getFilters(){
      // const { match } = this.props;
	  
      // const { termino } = this.state;
      // console.log("lo que recibo: " + categoria);
      this.setState({ loading: true });
      
      const response = await Filtros.get('partes',{
         params: {
            // maxResults: 30,
            // q: `${termino}`
            
         }
      });
         console.log(response.data);
         this.setState( { marcas: response.data.brand, loading: false } );
   }
   
   render(){
      const { marcas, chequeados, chequeado, loading } = this.state;
      return (
         <div className="filters-wrapper">
            <RctCard>
               <RctCardContent>
                  <div style={{ marginBottom:"5px", fontWeight:"bold" }} >Marca</div>
                  <div style={{ maxHeight: '12em', height: '100%', overflowY: 'scroll'  }} >
                     <FormGroup >
                        
                        { loading ? 'cargando...' 
                        : ( 
                           
                           marcas.map((filtro, index) => {
                              return (
                                 <div className='ui checkbox' >
                                    <input 
                                                // checked={chequeados[index]} 
                                                type='checkbox'
                                                id= {filtro}
                                                onChange={() => { this.handleChange(index) }} 
                                                value={chequeados[index]} 
                                             />
                                    <label> {filtro} </label>
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
                  {/* <Panel header="Category">
                     <HierarchicalMenu
                        attributes={[
                           'hierarchicalCategories.lvl0',
                           'hierarchicalCategories.lvl1',
                           'hierarchicalCategories.lvl2',
                        ]}
                     />
                  </Panel> */}
               </RctCardContent>
            </RctCard>
            <RctCard className="price">
               <RctCardContent>
                  {/* <Panel
                     header="Price"
                     className="mb-20"
                  >
                     <NumericMenu
                        attribute="price"
                        items={[
                           { end: 10, label: 'Below $10' },
                           { start: 10, end: 100, label: '$10 - $100' },
                           { start: 100, end: 500, label: '$100 - $500' },
                           { start: 500, label: 'Above $500' },
                        ]}
                     />
                  </Panel>
                  <Panel header="Enter Price Range">
                     <RangeInput
                        attribute="price"
                        className="py-2"
                        translations={{
                           submit: 'Go',
                           separator: '-'
                        }}
                     />
                  </Panel> */}
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

