import React from 'react';
import Link from 'next/link'
import PropTypes from 'prop-types';
import { CircularProgress } from '@material-ui/core';

const ProductItem = (props) => {
    const { product } = props;
    const data = product.data
    const productItem = Object.keys(data).map((item) => data[item]);


    if (!data ){
        return <CircularProgress />;
    }

    return(
        <div className="product">
            {productItem.slice().map((item) => {
                return (
                    <div className="product-item" key={item.id}>
                        <div className="product-title">{item.title}</div>
                            <div className="product-thumbnail">
                                <img src={item.thumb_img} className="product-img" />
                            </div>
                        <div className="product-price">{item.price}</div>    
                    </div>
                )
            })
            }
        <style jsx>{`
        .product { 
            width: 100%;
            display: flex;
        }
        .product-item { 
            width: 30%;
            background: #fff;
            border-radius: 20px;
            background: #424242;
            box-sizing: border-box;
            margin: 5%;
        }
        .product-title {
            padding: 5% 10%;
            font-size: 2vw;
            border-radius: 20px 20px 0 0;
            color: #fff;
        }
        .product-thumbnail {
            width: 100%;
            height: 30vh;
            display: flex;
            align-items: center;
            overflow: hidden;
        }
        .product-img {
            width: 100%;
        }
        .product-price {
            text-align: right;
            padding: 5% 10%;
            font-size: 2vw;
            border-radius: 0 0 20px 20px;
            color: #fff;
        }
        `}</style>
    </div>
    )
}

ProductItem.propTypes = {
    product: PropTypes.object.isRequired,
}

export default ProductItem;
