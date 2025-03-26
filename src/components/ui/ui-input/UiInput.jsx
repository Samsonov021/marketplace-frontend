import cl from './UiInput.module.css';
const UiInput = ({ name, value, onChange, placeholder, onKeyDown, type = 'text', disabled = false }) => {
    return(
        <input 
        className={cl.UiInput}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        type={type}
        disabled={disabled}
        onKeyDown={onKeyDown}
        />

    );
};

export default UiInput;