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
                {this.props.isAuthenticated ?
                    <NavigationItem link="/logout">Logout</NavigationItem> :
                    <NavigationItem link="/auth">Authenticate</NavigationItem>
                }
            </ul>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.token !== null,
    }
}


export default connect(mapStateToProps)(NavigationItems);