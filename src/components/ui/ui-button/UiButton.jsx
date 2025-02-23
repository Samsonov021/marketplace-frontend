import cl from './UiButton.module.css';

const UiButton = ({children, ...props}) => {
    
    
    return (
        <button {...props} className={cl.uiButton}>
            {children}
        </button> 
   
    );
};
export default UiButton;
