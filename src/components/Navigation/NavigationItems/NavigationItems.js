import React from 'react';
import styles from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';
import {connect} from 'react-redux';

class NavigationItems extends React.Component {
    render() {
        return (
            <ul className={styles.NavigationItems}>
                <NavigationItem link="/">Burger Builder</NavigationItem>
                <NavigationItem link="/orders">Orders</NavigationItem>
                <NavigationItem link="/auth">{this.props.token && this.props.userId ? 'Sign Out' : 'Authenticate'}</NavigationItem>
            </ul>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        userId: state.auth.userId,
        token: state.auth.token,
    }
}


export default connect(mapStateToProps)(NavigationItems);