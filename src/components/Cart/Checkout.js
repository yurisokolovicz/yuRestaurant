import styles from './Checkout.module.css';
import { useState, useRef } from 'react';

// Helper function to check if a string is empty.
const isEmpty = value => value.trim() === '';
const isThreeChars = value => value.trim().length === 3;

const Checkout = props => {
    const [formInputsValidity, setFormInputsValidity] = useState({
        card: true,
        secureCode: true,
        address: true
    });

    const cardInputRef = useRef();
    const secureCodeInputRef = useRef();
    const addressInputRef = useRef();

    const confirmHandler = event => {
        event.preventDefault();

        const enteredCard = cardInputRef.current.value;
        const enteredSecureCode = secureCodeInputRef.current.value;
        const enteredAddress = addressInputRef.current.value;

        const enteredCardIsValid = !isEmpty(enteredCard);
        const enteredSecureCodeIsValid = isThreeChars(enteredSecureCode);
        const enteredAddressIsValid = !isEmpty(enteredAddress);

        setFormInputsValidity({
            card: enteredCardIsValid,
            secureCode: enteredSecureCodeIsValid,
            address: enteredAddressIsValid
        });

        const formIsValid = enteredCardIsValid && enteredSecureCodeIsValid && enteredAddressIsValid;

        if (!formIsValid) {
            return;
        }

        // Submit cart data
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
            <div className={`${styles.control} ${formInputsValidity.address ? '' : styles.invalid}`}>
                <label htmlFor="address">Address</label>
                <input type="text" id="address" ref={addressInputRef} />
                {!formInputsValidity.card && <p>Please enter a valid address!</p>}
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
