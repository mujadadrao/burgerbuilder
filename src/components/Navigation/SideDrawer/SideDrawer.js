import React, {Fragment} from 'react';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import styles from './SideDrawer.module.css';
import Backdrop from '../../UI/Backdrop/Backdrop';

const SideDrawer = (props) => {
    let attachedClasses = [styles.SideDrawer, styles.Close];
    if (props.open) {
        attachedClasses = [styles.SideDrawer, styles.Open];
    }
    return (
        <Fragment>
            <Backdrop show={props.open} clicked={props.closed}/>
            <div className={attachedClasses.join(' ')} onClick={props.closed}>
                <div className={styles.Logo}>
                    <Logo/>
                </div>
                <nav>
                    <NavigationItems/>
                </nav>
            </div>
        </Fragment>
    );
};

export default SideDrawer;