import React, {Component} from 'react';
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import {Route} from 'react-router-dom';
import ContactData from "./ContactData/ContactData";
import {connect} from 'react-redux';

class Checkout extends Component {
    isEmpty = (ings) => ings.salad === 0 && ings.bacon === 0 && ings.cheese === 0 && ings.meat === 0

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.push('/checkout/contact-data');
    }


    render() {
        return (
                this.isEmpty(this.props.ingredients) ? <h1>Please go to burger builder and add some ingredients!</h1> :
                <div>
                    <CheckoutSummary ingredients={this.props.ingredients}
                                     checkoutCancelled={this.checkoutCancelledHandler}
                                     checkoutContinued={this.checkoutContinuedHandler}/>
                    <Route path={this.props.match.path + '/contact-data'} component={ContactData}/>
                </div>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        ingredients: state.ings.ingredients,
        totalPrice: state.price.totalPrice,
    }
}


export default connect(mapStateToProps)(Checkout);

