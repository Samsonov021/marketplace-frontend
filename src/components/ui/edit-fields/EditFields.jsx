import { useState } from "react";
import UiInput from "../../../components/ui/ui-input/UiInput";
import cl from "./EditFields.module.css";

const EditFields = ({ label, value, onSave, inputType = "text", placeholder }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [inputValue, setInputValue] = useState(value);

    const handleChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleSave = () => {
        onSave(inputValue);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setInputValue(value);
        setIsEditing(false);
    };

    return (
        <div className={cl.editableField}>
            <h3 className={cl.label}>{label}</h3>
            {isEditing ? (
                <div className={cl.editWrapper}>
                    <UiInput
                        type={inputType}
                        value={inputValue}
                        placeholder={placeholder}
                        onChange={handleChange}
                        className={cl.input}
                    />
                    <button onClick={handleSave} className={cl.saveButton}>Сохранить</button>
                    <button onClick={handleCancel} className={cl.cancelButton}>Отменить</button>
                </div>
            ) : (
                <div className={cl.viewWrapper}>
                    <p className={cl.value}>{value || "Не указано"}</p>
                    <button onClick={() => setIsEditing(true)} className={cl.editButton}>Редактировать</button>
                </div>
            )}
        </div>
    );
};

export default EditFields;
