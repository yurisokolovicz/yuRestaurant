import React from 'react';

import styles from './Input.module.css';

// This is a functional component that uses React.forwardRef() to forward the ref from MealItemForm to the input element.
const Input = React.forwardRef((props, ref) => {
    return (
        <div className={styles.Input}>
            <label htmlFor={props.input.id} className={styles.label}>
                {props.label}
            </label>
            <input ref={ref} {...props.input} />
        </div>
    );
});

export default Input;
