import React from "react";
import BuildControl from "./BuildControl/BuildControl";
import styles from './BuildControls.module.css'

const controls = [
    {label: 'Salad', type: 'salad'},
    {label: 'Bacon', type: 'bacon'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Meat', type: 'meat'},

]

const BuildControls = (props) => {
    return (
        <div className={styles.BuildControls}>
            <p>Current Price: $<strong>{props.price.toFixed(2)}</strong></p>
            {controls.map(({label, type}) => <BuildControl key={type} label={label} type={type}
                                                           disabled={props.disabled[type]}
                                                           added={() => props.addIngredient(type)}
                                                           removed={() => props.removeIngredient(type)}/>)}
            <button className={styles.OrderButton} disabled={!props.purchasable}
                    onClick={props.ordered}>{props.isAuthenticated ? 'ORDER NOW' : 'LOGIN TO CONTINUE'}</button>
        </div>
    );
}

export default BuildControls;