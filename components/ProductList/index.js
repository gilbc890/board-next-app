import React from 'react';
import Link from 'next/link'
import PropTypes from 'prop-types';
import { CircularProgress } from '@material-ui/core';

const ProductList = (props) => {
    const { product } = props;
    const data = product.data
    const productItem = Object.keys(data).map((item) => data[item]);

    if (!data ){
        return <CircularProgress />;
    }

    const priceWithCommas = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    

    return(
        <div className="product">
            {productItem.slice().map((item) => {
                const productTitle = item.title.toLowerCase().replace(/[^가-힣a-zA-Z0-9]/gi, "-");
                return (
                    <div className="product-item" key={item.id}>
                        <Link 
                            href={`/products/:id/:slug`} 
                            as={`/products/${item.id}/${productTitle}`}
                        >
                            <div className="product-link">
                                <div className="product-title">{item.title}</div>
                                    <div className="product-thumbnail">
                                        <img src={item.thumb_img} className="product-img" />
                                    </div>
                                <div className="product-price">{priceWithCommas(item.price)} 원</div>
                            </div> 
                        </Link>
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
        .product-link {
            cursor: pointer; 
        }
        .product-title {
            padding: 5% 10%;
            font-size: 2vw;
            border-radius: 20px 20px 0 0;
            color: #fff;
            width: 80%;
            height: 3vh;
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
            width: 80%;
            height: 3vh;
        }
        `}</style>
        </div>
    )
}

ProductList.propTypes = {
    product: PropTypes.object.isRequired,
}

export default ProductList;
