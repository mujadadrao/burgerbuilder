import React, {Component} from 'react';
import CheckoutSummary from "../../components/Order/CheckoutSummary";
import Spinner from "../../components/UI/Spinner/Spinner";

class Checkout extends Component {
    state = {
        ingredients: null,
        loading: true,
    }

    componentDidMount() {
        console.log('Checkout mounted!');
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        for (let param of query.entries()) {
            ingredients[param[0]] = +param[1];
        }
        console.log('Checkout setting state!');
        this.setState({
            ingredients: ingredients,
            loading: false,
        })
    }

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }


    render() {
        return (
            this.state.loading && !this.state.ingredients ? <Spinner/> :
                <div>
                    <CheckoutSummary ingredients={this.state.ingredients}
                                     checkoutCancelled={this.checkoutCancelledHandler}
                                     checkoutContinued={this.checkoutContinuedHandler}/>
                </div>
        );
    }
}

export default Checkout;

