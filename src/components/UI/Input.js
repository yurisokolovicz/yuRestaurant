import styles from './Input.module.css';

const Input = props => {
    return (
        <div className={styles.Input}>
            <label htmlFor={props.input.id} className={styles.label}>
                {props.label}
            </label>
            <input {...props.input} />
        </div>
    );
};

export default Input;
