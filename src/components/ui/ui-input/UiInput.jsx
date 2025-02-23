import cl from './UiInput.module.css';
const UiInput = ({ name, value, onChange, placeholder, type = 'text' }) => {
    return(
        <input 
        className={cl.UiInput}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        type={type}
        />

    );
};

export default UiInput;