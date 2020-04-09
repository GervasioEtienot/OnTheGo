/**
 * Top Selling Widget
 */
import React, { Component } from "react";
import Slider from "react-slick";

// api
import axios from 'axios';

// intl messages
import IntlMessages from 'Util/IntlMessages';
import Foto from "../shop/components/Foto";
import  Arrow from "./Arrow";



const TopSelling = (props) => {

	
        	
		const settings = {
			dots: false,
			infinite: true,
			speed: 500,
			slidesToShow: 1,
			slidesToScroll: 1,
			autoplay: true,
            // arrows: true,
            nextArrow: <Arrow />,
            prevArrow: <Arrow />,
			rtl: false
		};
		
		return (
			<div>
				<Slider {...settings}>
					{props.products && props.products.map((product, key) => (
						<div key={key}>
						<div className="top-selling">
							<div className="product-img mb-20">
								<img src={Foto} width="600" alt="headphone device" className="img-fluid d-block" />
							</div>
							<div className="product-content text-center">
								<h3>{product.codigo}</h3>
                                <h5 style={{ textDecorationLine:"line-through" }}>${product.precio_producto}</h5>
                                <h3 className="text-pink">${Math.round((parseFloat(product.descuento)+100)*product.precio_producto)/100}</h3>
							</div>
						</div>
						<div className="rct-block-footer clearfix">
							<div className="float-left">
								<h6><IntlMessages id="widgets.units" /></h6>
								<h3>{product.cantidad_paquete}</h3>
							</div>
							<div className="float-right">
								<h6>Descuento</h6>
								<h3>{product.descuento}</h3>
							</div>
						</div>
						</div>
					))}
				</Slider>
			</div>
		);
	
}

export default TopSelling;