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
import Divider from '@material-ui/core/Divider';
import classNames from 'classnames';

import './Sidebar.css';

// redux actions
import { onToggleMenu } from 'Actions';


import SidebarFilters from './sidebarFilters/SidebarFilters';

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
        const { location } = this.props;
        const path = location.pathname.substr(1);
        const subPath = path.split('/');
        // subPath.splice(1,1);
        console.log(subPath[2]);
        
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
                                 <ListItem button component="li" key={index} className={`list-item ${classNames({ 'item-active': subMenu.open })}`} >
                                    <NavLink id="sidebarItem" to={`${subMenu.path}`} activeClassName="item-active" activeStyle={{
                                        fontWeight: "bold"
                                      }} >
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
                <div style={{ marginRight: "2em", marginTop: "2em" }} >
                    <h5 className="ui horizontal divider header" >Filtros</h5>
                    <SidebarFilters categoria={subPath[2]} />
                </div>
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

