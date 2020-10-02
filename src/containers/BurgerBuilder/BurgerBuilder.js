import React, {Component, Fragment} from "react";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from "../../axios-orders";
import {connect} from 'react-redux';
import * as ingredientsActions from '../../store/actions/ingredients';
import * as totalPriceActions from '../../store/actions/totalPrice';
import * as purchaseActions from "../../store/actions/purchase";

const INGREDIENT_PRICES = {
    salad: 0.5,
    bacon: 0.4,
    cheese: 1.3,
    meat: 0.7,
}

const getIngredientPrice = ingredient => INGREDIENT_PRICES[ingredient];

const BASE_PRICE = 4;

class BurgerBuilder extends Component {
    state = {
        purchasing: false,
    }

    componentDidMount() {
        this.props.onInitIngredients();
    }

    purchaseHandler = () => {
        this.setState({
            purchasing: true,
        })
    }

    purchaseCancelHandler = () => {
        this.setState({
            purchasing: false,
        })
    }

    purchaseContinuedHandler = () => {
        this.props.onInitPurchase();
        this.props.history.push('/checkout');
    }

    render() {
        const disabledInfo = {
            ...this.props.ingredients,
        }
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        return (
            this.props.ingredients ?
                <Fragment>
                    <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    <OrderSummary ingredients={this.props.ingredients}
                                  purchaseCancelled={this.purchaseCancelHandler}
                                  purchaseContinued={this.purchaseContinuedHandler}
                                  price={this.props.totalPrice}/>

                    </Modal>
                    <Burger ingredients={this.props.ingredients}/>
                    <BuildControls addIngredient={this.props.onIngredientAdded} disabled={disabledInfo}
                                   price={this.props.totalPrice} removeIngredient={this.props.onIngredientRemoved}
                                   ordered={this.purchaseHandler}
                                   purchasable={this.props.totalPrice > BASE_PRICE}/>
                </Fragment> :
                !this.props.error ? <Spinner/> :
                    <p style={{textAlign: "center", fontWeight: "bold"}}>Ingredients could not be loaded!</p>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        ingredients: state.ings.ingredients,
        error: state.ings.error,
        totalPrice: state.price.totalPrice,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onIngredientAdded: (ingredientName) => {
            dispatch(ingredientsActions.addIngredient(ingredientName))
            dispatch(totalPriceActions.addPrice(getIngredientPrice(ingredientName)))
        },
        onIngredientRemoved: (ingredientName) => {
            dispatch(ingredientsActions.removeIngredient(ingredientName))
            dispatch(totalPriceActions.removePrice(getIngredientPrice(ingredientName)))
        },
        onInitIngredients: () => {
            dispatch(ingredientsActions.initIngredients())
            dispatch(totalPriceActions.resetPrice())
        },
        onInitPurchase: () => dispatch(purchaseActions.purchaseInit()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
