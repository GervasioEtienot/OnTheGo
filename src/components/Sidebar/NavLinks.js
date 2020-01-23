// sidebar nav links
export default {
   category1: [
      {
         "menu_title": "sidebar.dashboard",
         "menu_icon": "zmdi zmdi-view-dashboard",
         "new_item": true,
         "type_multi": null,
         "child_routes": [
            {
               "menu_title": "sidebar.ecommerce",
               "new_item": false,
               "path": "/app/dashboard/ecommerce",
            },
            {
               "path": "/dashboard/crm/dashboard",
               "new_item": true,
               "menu_title": "sidebar.crm"
            },
            {
               "path": "/horizontal/dashboard/saas",
               "new_item": false,
               "menu_title": "sidebar.saas"
            },
            {
               "path": "/agency/dashboard/agency",
               "new_item": false,
               "menu_title": "sidebar.agency"
            },
            {
               "path": "/boxed/dashboard/news",
               "new_item": false,
               "menu_title": "sidebar.news"
            },
         ]
      },
      {
         "menu_title": "sidebar.ecommerce",
         "menu_icon": "zmdi zmdi-shopping-cart",
         "type_multi": null,
         "new_item": false,
         "child_routes": [
            {
               "path": "/app/ecommerce/shop",
               "new_item": false,
               "menu_title": "sidebar.shop"
            },
            {
               "path": "/app/ecommerce/cart",
               "new_item": false,
               "menu_title": "sidebar.cart"
            },
            {
               "path": "/app/ecommerce/checkout",
               "new_item": false,
               "menu_title": "sidebar.checkout"
            },
            {
               "path": "/app/ecommerce/shop-list",
               "new_item": false,
               "menu_title": "sidebar.shopList"
            },
            {
               "path": "/app/ecommerce/shop-grid",
               "new_item": false,
               "menu_title": "sidebar.shopGrid"
            },
            {
               "path": "/app/ecommerce/invoice",
               "new_item": false,
               "menu_title": "sidebar.invoice"
            }
         ]
      }
   ]
}
