import cl from './UiInput.module.css';
const UiInput = ({placeholder}) => {
    return(
        <input 
        className={cl.UiInput}
        type='text'
        placeholder= {placeholder}
        />

    );
};

export default UiInput;