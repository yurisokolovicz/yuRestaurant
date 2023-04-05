import styles from './Checkout.module.css';
import { useState, useRef } from 'react';

// Helper function to check if a string is empty.
const isEmpty = value => value.trim() === '';
const isThreeChars = value => value.trim().length === 3;
const isSixteenChars = value => value.trim().length === 16;

const Checkout = props => {
    const [formInputsValidity, setFormInputsValidity] = useState({
        card: true,
        secureCode: true,
        name: true
    });

    const cardInputRef = useRef();
    const secureCodeInputRef = useRef();
    const nameInputRef = useRef();

    const confirmHandler = event => {
        event.preventDefault();

        const enteredCard = cardInputRef.current.value;
        const enteredSecureCode = secureCodeInputRef.current.value;
        const enteredName = nameInputRef.current.value;

        const enteredCardIsValid = isSixteenChars(enteredCard);
        const enteredSecureCodeIsValid = isThreeChars(enteredSecureCode);
        const enteredNameIsValid = !isEmpty(enteredName) && enteredName.trim().length > 5;

        setFormInputsValidity({
            card: enteredCardIsValid,
            secureCode: enteredSecureCodeIsValid,
            name: enteredNameIsValid
        });

        const formIsValid = enteredCardIsValid && enteredSecureCodeIsValid && enteredNameIsValid;

        if (!formIsValid) {
            return;
        }

        // Submit cart data - In this way, we can pass data from a child component(Checkout.js) to a parent component (Cart.js).
        props.onOrder({
            card: enteredCard,
            secureCode: enteredSecureCode,
            name: enteredName
        });
    };

    return (
        <form className={styles.form} onSubmit={confirmHandler}>
            <div className={styles.control}>
                <label htmlFor="text">PAYMENT</label>
            </div>
            <div className={`${styles.control} ${formInputsValidity.card ? '' : styles.invalid}`}>
                <label htmlFor="card">Card number</label>
                <input type="number" id="card" ref={cardInputRef} />
                {!formInputsValidity.card && <p>Please enter a valid card number!</p>}
            </div>
            <div className={`${styles.control} ${formInputsValidity.secureCode ? '' : styles.invalid}`}>
                <label htmlFor="secure-code">Secure code</label>
                <input type="number" id="secure-code" ref={secureCodeInputRef} />
                {!formInputsValidity.card && <p>Please enter a valid secure code!</p>}
            </div>
            <div className={`${styles.control} ${formInputsValidity.name ? '' : styles.invalid}`}>
                <label htmlFor="name">Full Name</label>
                <input type="text" id="name" ref={nameInputRef} />
                {!formInputsValidity.card && <p>Please enter a valid name!</p>}
            </div>
            <div className={styles.actions}>
                <button type="button" onClick={props.onCancel}>
                    Cancel
                </button>
                <button className={styles.submit}>Confirm</button>
            </div>
        </form>
    );
};

export default Checkout;

// Button type button does not submit the form. It is the default type for buttons.
