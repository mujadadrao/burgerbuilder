import React, {Component, Fragment} from "react";
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Form/Input/Input";
import styles from './Auth.module.css';
import {connect} from 'react-redux';
import * as authActions from '../../store/actions/auth';
import Spinner from "../../components/UI/Spinner/Spinner";
import {Redirect} from 'react-router-dom';

class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Email Address'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true,
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Your Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6,
                },
                valid: false,
                touched: false
            },
        },
        isSignUp: true,
    }

    componentDidMount() {
        if (!this.props.building && this.props.authRedirectPath !== '/') {
            this.props.onSetAuthRedirectPath();
        }
    }

    checkValidity(value, rules) {
        let isValid = true;
        if (!rules) {
            return true;
        }

        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }
        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }


        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }


        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }

        return isValid;
    }

    onChangeHandler = (event, controlName) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true
            }
        };
        this.setState({controls: updatedControls});
    }

    switchAuthMode = () => {
        this.setState((prevState) => ({
            isSignUp: !prevState.isSignUp,
        }))
    }

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignUp);
    }

    render() {
        if (this.props.isAuthenticated) {
            return <Redirect to={this.props.authRedirectPath}/>
        }
        const formElementsArray = [];
        for (let key in this.state.controls) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            });
        }
        return (
            <div className={styles.Auth}>
                {this.props.loading ? <Spinner/> :
                    <Fragment>
                        {this.props.error ? <p style={{color: 'red'}}>Error: {this.props.error.message}</p> : null}
                        <form onSubmit={this.submitHandler}>
                            {formElementsArray.map(formElement => (
                                <Input
                                    key={formElement.id}
                                    elementType={formElement.config.elementType}
                                    elementConfig={formElement.config.elementConfig}
                                    value={formElement.config.value}
                                    shouldValidate={formElement.config.validation}
                                    invalid={!formElement.config.valid}
                                    touched={formElement.config.touched}
                                    changed={(event) => this.onChangeHandler(event, formElement.id)}
                                />
                            ))}
                            <Button btnType="Success">{this.state.isSignUp ? 'Sign Up' : 'Sign In'}</Button>
                        </form>
                        <Button btnType="Danger" clicked={this.switchAuthMode}>
                            {this.state.isSignUp ? 'SWITCH TO SIGN IN' : 'SWITCH TO SIGN UP'}
                        </Button>
                    </Fragment>
                }
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignUp) => dispatch(authActions.authUser(email, password, isSignUp)),
        onSetAuthRedirectPath: () => dispatch(authActions.setAuthRedirectPath('/')),
    };
};

const mapStateToProps = (state) => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        building: state.ings.building,
        authRedirectPath: state.auth.authRedirectPath,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);