import styles from './Checkout.module.css';
import { useRef } from 'react';

const Checkout = props => {
    const cardInputRef = useRef();
    const secureCodeInputRef = useRef();
    const addressInputRef = useRef();

    const confirmHandler = event => {
        event.preventDefault();

        const enteredCard = cardInputRef.current.value;
        const enteredSecureCode = secureCodeInputRef.current.value;
        const enteredAddress = addressInputRef.current.value;
    };

    return (
        <form className={styles.form} onSubmit={confirmHandler}>
            <div className={styles.control}>
                <label htmlFor="text">PAYMENT</label>
            </div>
            <div className={styles.control}>
                <label htmlFor="card">Card number</label>
                <input type="number" id="card" ref={cardInputRef} />
            </div>
            <div className={styles.control}>
                <label htmlFor="postal">Secure code</label>
                <input type="number" id="postal" ref={secureCodeInputRef} />
            </div>
            <div className={styles.control}>
                <label htmlFor="city">Address</label>
                <input type="text" id="city" ref={addressInputRef} />
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
