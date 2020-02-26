/**
 * Sidebar Content
 */
import React, { Component } from 'react';
import { List, ListItemIcon } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import IntlMessages from 'Util/IntlMessages';

import NavMenuItem from './NavMenuItem';
import { NavLink } from 'react-router-dom';      // Agregado de prueba
import ListItem from '@material-ui/core/ListItem';  // Agregado de prueba

// redux actions
import { onToggleMenu } from 'Actions';

class SidebarContent extends Component {

    toggleMenu(menu, stateCategory) {
        let data = {
            menu,
            stateCategory
        }
        this.props.onToggleMenu(data);
    }

   /*  seleccionarIcono(icon){
        switch(icon){
            case ''
        }
    } */

    render() {
        const { sidebarMenus } = this.props.sidebar;
        return (
            <div className="rct-sidebar-nav">
                <nav className="navigation">
                  { /*  <List
                        className="rct-mainMenu p-0 m-0 list-unstyled"
                        subheader={
                            <ListSubheader className="side-title" component="li">
                                <IntlMessages id="sidebar.general" />
                            </ListSubheader>}
                    >
                        {sidebarMenus.category1.map((menu, key) => (
                            <NavMenuItem
                                menu={menu}
                                key={key}
                                onToggleMenu={() => this.toggleMenu(menu, 'category1')}
                            />
                        ))}
                        </List> */ }
                        <List className="list-unstyled py-0">
                           
                           {sidebarMenus.category1.child_routes.map((subMenu, index) => {
                              return (
                                 <ListItem button component="li" key={index} className= "list-item">
                                    <NavLink to={`${subMenu.path}/${subMenu.categoria}`} activeClassName="item-active" >
                                       <ListItemIcon className="menu-icon" style={{minWidth: 29}}>
                                          <i className={subMenu.menu_icon}></i> 
                                       </ListItemIcon> 
                                       <span className="menu text-capitalize">
                                          <IntlMessages id={subMenu.menu_title} />
                                       </span>
                                       {subMenu.new_item && subMenu.new_item === true ?
                                          <Chip label="new" className="new-item" color="secondary" />
                                          :
                                          ''
                                       }
                                    </NavLink>
                                 </ListItem>
                              )
                           })}
                        </List>
                </nav>
            </div>
        );
    }
}

// map state to props
const mapStateToProps = ({ sidebar }) => {
    return { sidebar };
};

export default withRouter(connect(mapStateToProps, {
    onToggleMenu
})(SidebarContent));
