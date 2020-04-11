/**
 * Top Selling Widget
 */
import React, { Component } from "react";
import Slider from "react-slick";
import StarIcon from '@material-ui/icons/Star';
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
			{/* <div>
				<Slider {...settings}>
					{props.products && props.products.map((product, key) => (
						<div key={key}>
							<div className="top-selling">
								<div className="product-img mb-20">
									<img src={Foto} width="600" alt="headphone device" className="img-fluid d-block" />
								</div>
								<div className="product-content text-center">
									<h3>{product.code}</h3>
									<h5>{product.des_sale || product.des_offer}</h5>
									{props.category === 'offers' ? (
										<h5 style={{ textDecorationLine:"line-through" }}>
											${Math.round(product.price_offer/(1-product.percent_offer/100)*100)/100}
										</h5>
										) : ''
									}
									<h3 className="text-pink">${product.price_sale || product.price_offer}</h3>
								</div>
							</div>
							<div className="rct-block-footer clearfix">
								{props.category === 'offers' ? (
									<div className="float-left">
										<h6><IntlMessages id="widgets.discount" /></h6>
										<h3>-{product.percent_offer}%</h3>
									</div>) 
									: ''
								}
								{props.category === 'sales' ? (
									<div className="float-left">
										<h6><IntlMessages id="widgets.units" /></h6>
										<h3>{product.qty_sale}</h3>
									</div>) 
									: ''
								}
								<div className="float-right">
									<StarIcon color="secondary" fontSize="large"/>
								</div> 
							</div>
						</div>
					))}
				</Slider>
			</div> */}
			
							<div className="top-selling">
								<div className="product-img mb-20">
									<img src={Foto} width="600" alt="headphone device" className="img-fluid d-block" />
								</div>
								<div className="product-content text-center">
									<h3>{props.product.code}</h3>
									<h5>{props.product.des_sale || props.product.des_offer}</h5>
									{props.category === 'offers' ? (
										<h5 style={{ textDecorationLine:"line-through" }}>
											${Math.round(props.product.price_offer/(1-props.product.percent_offer/100)*100)/100}
										</h5>
										) : ''
									}
									<h3 className="text-pink">${props.product.price_sale || props.product.price_offer}</h3>
								</div>
							</div>
							<div className="rct-block-footer clearfix">
								{props.category === 'offers' ? (
									<div className="float-left">
										<h6><IntlMessages id="widgets.discount" /></h6>
										<h3>-{props.product.percent_offer}%</h3>
									</div>) 
									: ''
								}
								{props.category === 'sales' ? (
									<div className="float-left">
										<h6><IntlMessages id="widgets.units" /></h6>
										<h3>{props.product.qty_sale}</h3>
									</div>) 
									: ''
								}
								<div className="float-right">
									<StarIcon color="secondary" fontSize="large"/>
								</div> 
							</div>
						</div>
		);
	
}

export default TopSelling;