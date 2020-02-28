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


class Filters extends Component {
   state = { filtros: {
                     marca:[
                           "SAMSUNG","MOTOROLA","APPLE","ALCATEL","BLACKBERRY","LUMIA\/MICROSOFT","SONY","LG","HUAWEI"
                     ],
                     calidad:[
                             "ORIGINAL","ALTA COPIA","COPIA AAA","COPIA AA"
                     ]
             },
             loading: false,
             chequeados: [ false, false, false, false, false, false, false, false, false ]
   }
   
   handleChange(index){
      const { chequeados, filtros } = this.state;
      let auxChequeados = chequeados;
      auxChequeados[index] = !chequeados[index];
      this.setState({ chequeados: auxChequeados });
      let filtrar = [];
      chequeados.map((check, index) => {
         if(check === true){
             filtrar.push(filtros.marca[index])
         }
         else{
            filtrar.splice(index, 1)
         }
      } )
      console.log(filtrar);
      

   }
   
   render(){
      const { filtros, chequeados, chequeado, loading } = this.state;
      console.log(chequeados);
      
      return (
         <div className="filters-wrapper">
            <RctCard>
               <RctCardContent>
                  <FormGroup column>
                     { loading === true ? 'cargando...' 
                     : ( 
                        filtros.marca.map( (filtro, index) => {
                           return (
                              <FormControlLabel 
                                    key={index} 
                                    control={
                                          <Checkbox checked={chequeados[index]} 
                                                   onChange={ () => {this.handleChange(index)} } 
                                                   value= {chequeados[index]} 
                                          />
                                    }
                                    label={filtro} 
                              /> 
                                
                              
                           );
                        } ) 
                      ) 
                     }
                           
                  </FormGroup>
               
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

