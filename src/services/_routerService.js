
import Dashboard from 'Routes/dashboard';
import Crm from 'Routes/crm';
import Ecommerce from 'Routes/ecommerce';


export default [
   {
      path: 'dashboard',
      component: Dashboard
   },
   {
      path: 'crm',
      component: Crm
   },
   {
      path: 'ecommerce',
      component: Ecommerce
   }
]