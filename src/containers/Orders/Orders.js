import React, {Component} from 'react';

import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as ordersActions from "../../store/actions/orders";
import {connect} from 'react-redux';
import Spinner from "../../components/UI/Spinner/Spinner";

class Orders extends Component {
    componentDidMount() {
        this.props.onFetchOrders();
    }

    isEmpty(array) {
        return !Array.isArray(array) || !array.length
    }

    render() {
        return (
            this.props.loading ? <Spinner/> :
                this.isEmpty(this.props.orders) ?
                    this.props.error ? <p>{this.props.error}</p> : <h2><strong>No orders found...</strong></h2> :
                    <div>
                        {this.props.orders.map(order => (
                            <Order
                                key={order.id}
                                order={order}/>
                        ))}
                    </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        orders: state.orders.orders,
        loading: state.orders.loading,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onFetchOrders: () => dispatch(ordersActions.fetchOrders()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));