// sidebar nav links
export default {
   category1: 
      {
         "menu_title": "sidebar.ecommerce",
         "menu_icon": "zmdi zmdi-shopping-cart",
         "type_multi": null,
         "new_item": false,
         "child_routes":  [
             {
               "path": "/app/ecommerce/accessories",
               "new_item": false,
               "menu_title": "sidebar.accessories",
               "menu_icon": "zmdi zmdi-headset",
               "categoria": "accessories"
            }, 
            {
               "path": "/app/ecommerce/parts",
               "new_item": false,
               "menu_title": "sidebar.parts",
               "menu_icon": "zmdi zmdi-smartphone-iphone",
               "categoria": "parts"
            },
            {
               "path": "/app/ecommerce/batteries",
               "new_item": false,
               "menu_title": "sidebar.batteries",
               "menu_icon": "zmdi zmdi-battery-flash",
               "categoria": "batteries"
            },
            {
               "path": "/app/ecommerce/Lensun",
               "new_item": false,
               "menu_title": "sidebar.lensun",
               "menu_icon": "zmdi zmdi-bookmark",
               "categoria": "lensun"
            }, 
            {
               "path": "/app/ecommerce/offers",
               "new_item": false,
               "menu_title": "sidebar.offers",
               "menu_icon": "zmdi zmdi-star",
               "categoria": "offers"
            }, 
            {
               "path": "/app/ecommerce/sales",
               "new_item": false,
               "menu_title": "sidebar.sales",
               "menu_icon": "zmdi zmdi-local-offer",
               "categoria": "sales"
            } 
         ]
      }
   
}
