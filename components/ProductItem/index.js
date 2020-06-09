import React from 'react';
import Link from 'next/link'
import PropTypes from 'prop-types';
import { CircularProgress } from '@material-ui/core';

const ProductItem = (props) => {
    const { product } = props;
    const data = product.data[0]

    if (!data ){
        return <CircularProgress />;
    }
    console.log(data, 'data')

    return(
        <div className="product">
            <div className="product-title">{data.title}</div>
            <img src={data.thumb_img} className="product-img" />
            <div className="product-price">{data.price}</div>
        <style jsx>{`
        .product { 
            width: 30%;
            background: #fff;
            border-radius: 20px;
            background: #424242;
        }
        .product-title {
            padding: 5% 10%;
            font-size: 2vw;
            border-radius: 20px 20px 0 0;
            color: #fff;
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
