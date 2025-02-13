import cl from './UiButton.module.css';

const UiButton = ({text}) => {
    
    
    return (
        <button className={cl.uiButton}>
            {text}
        </button> 
   
    );
};

export default UiButton;
