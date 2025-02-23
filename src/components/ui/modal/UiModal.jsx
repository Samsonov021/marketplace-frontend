
import cl from './UiModal.module.css';
const UiModal = ({children, visible, setVisible}) => {
    
    const rootClasses = [cl.UiModal]
    if (visible) {
        rootClasses.push(cl.active);
    }
    
    return(
        <div className={rootClasses.join(' ')} onClick={() => setVisible(false)}>
            <div className={cl.UiModal__content} onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};

export default UiModal;