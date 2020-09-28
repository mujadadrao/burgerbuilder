import React, {Component, Fragment} from "react";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from "../../axios-orders";


const INGREDIENT_PRICES = {
    salad: 0.5,
    bacon: 0.4,
    cheese: 1.3,
    meat: 0.7,
}

const BASE_PRICE = 4;

class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        totalPrice: BASE_PRICE,
        purchasing: false,
        loading: false,
        error: false,
    }

    componentDidMount() {
        axios.get('/ingredients.json').then((response) => {
            this.setState({ingredients: response.data})
        }).catch((error) => {
            console.log('Error: ', error);
            this.setState({
                error: true,
            })
        })
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

    enableLoading = () => {
        this.setState({
            loading: true,
        })
    }

    disableLoading = () => {
        this.setState({
            loading: false,
        })
    }

    purchaseContinuedHandler = () => {
        const queryParams = [];
        for (let i in this.state.ingredients) {
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        }
        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString,
        });
    }

    addIngredientHandler = (type) => {
        this.setState((prevState) => ({
            ingredients: {
                ...prevState.ingredients,
                [type]: prevState.ingredients[type] + 1,
            },
            totalPrice: prevState.totalPrice + INGREDIENT_PRICES[type]
        }))
    }

    removeIngredientHandler = (type) => {
        this.setState((prevState) => {
            if (prevState.ingredients[type] === 0) {
                return
            }
            return {
                ingredients: {
                    ...prevState.ingredients,
                    [type]: prevState.ingredients[type] - 1,
                },
                totalPrice: prevState.totalPrice - INGREDIENT_PRICES[type]
            }
        })
    }


    render() {
        const disabledInfo = {
            ...this.state.ingredients,
        }
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        return (
            this.state.ingredients ?
                    <Fragment>
                    <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                        {this.state.loading ? <Spinner/> :
                            <OrderSummary ingredients={this.state.ingredients}
                                          purchaseCancelled={this.purchaseCancelHandler}
                                          purchaseContinued={this.purchaseContinuedHandler}
                                          price={this.state.totalPrice}/>}

                    </Modal>
                        <Burger ingredients={this.state.ingredients}/>
                        <BuildControls addIngredient={this.addIngredientHandler} disabled={disabledInfo}
                                       price={this.state.totalPrice} removeIngredient={this.removeIngredientHandler}
                                       ordered={this.purchaseHandler}
                                       purchasable={this.state.totalPrice > BASE_PRICE}/>
                    </Fragment> :
                !this.state.error ? <Spinner/> :
                    <p style={{textAlign: "center", fontWeight: "bold"}}>Ingredients could not be loaded!</p>
        );
    }
}

export default withErrorHandler(BurgerBuilder, axios);