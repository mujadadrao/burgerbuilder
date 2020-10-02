import React from 'react';

import styles from './Order.module.css';

const Order = ( props ) => {
    const {ingredients, price} = props.order;
    const {name, street, zipCode, country, email, deliveryMethod} = props.order.orderData;
    const transformedIngredients = [];
    for ( let ingredientName in ingredients ) {
        transformedIngredients.push(
            {
                name: ingredientName,
                amount: ingredients[ingredientName]
            }
        );
    }

    const ingredientOutput = transformedIngredients.map(ig => {
        return <span 
            style={{
                textTransform: 'capitalize',
                display: 'inline-block',
                margin: '0 8px',
                border: '1px solid #ccc',
                padding: '5px'
                }}
            key={ig.name}>{ig.name} ({ig.amount})</span>;
    });

    return (
        <div className={styles.Order}>
            <p>Ingredients: {ingredientOutput}</p>
            <p>Customer Name: {name}</p>
            <p>Customer Email: {email}</p>
            <p>Customer Address: {street}, {zipCode}, {country}</p>
            <p>Delivery Method: <strong>{deliveryMethod}</strong></p>
            <p>Price: <strong>${Number.parseFloat( price ).toFixed( 2 )}</strong></p>
        </div>
    );
};

export default Order;