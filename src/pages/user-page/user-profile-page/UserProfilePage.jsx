import { useDispatch, useSelector } from "react-redux";
import cl from './UserProfilePage.module.css';
import UiButton from "../../../components/ui/ui-button/UiButton";
import UiInput from "../../../components/ui/ui-input/UiInput";
import { useEffect, useState } from "react";
import { editUserInfo } from "../../../store/authActions";
import ProfileLayout from "../../../layouts/profile-layout/ProfileLayout";

const UserProfilePage = () => {
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.auth);
    const [isEditing, setIsEditing] = useState(false);
    const [initialValues, setInitialValues] = useState({});
    const [formValues, setFormValues] = useState({
        name: '',
        phone: '',
        email: ''
    });

    useEffect(() => {
        if (user){
            setFormValues({
                name: user.name,
                phone: user.phone,
                email: user.email
            })
        }
        }, [user])

    const inputChangeHandler = (event) => {
        const {name, value} = event.target;
        setFormValues(({
            ...formValues,
            [name]: value
        }));
    };

    const handleEditClick = () => {
        setInitialValues(formValues);
        setIsEditing(true);
    };

    const handleSaveClick = () => {
        dispatch(editUserInfo(formValues));
        setIsEditing(false);
    }
    const handleCancelClick = () => {
        setFormValues(initialValues);
        setIsEditing(false);
    }
        
    if (!user) {
        return <h1 style={{textAlign: 'center', fontSize: '70px'}}>Загрузка страницы...</h1>;
    }
    return(
        <ProfileLayout>
            <div className={cl.user__info}>
                <h1 style={{marginBottom: '20px'}}>Данные о пользователе</h1>
                <div className={cl.userInfo__edit}>
                    <label className={cl.input__label}>Имя</label>
                    <UiInput 
                        name="name"
                        value={formValues.name}
                        onChange={inputChangeHandler}
                        disabled={!isEditing}
                    />
                    <label className={cl.input__label}>Телефон</label>
                    <UiInput 
                        name="phone"
                        value={formValues.phone}
                        onChange={inputChangeHandler}
                        disabled={!isEditing}
                    />
                    <label className={cl.input__label}>Email</label>
                    <UiInput
                        name="email"
                        value={formValues.email}
                        onChange={inputChangeHandler}
                        disabled={!isEditing}
                    />
                    {isEditing ? (
                        <>
                            <UiButton onClick={handleSaveClick}>Сохранить изменения</UiButton>
                            <UiButton onClick={handleCancelClick}>Отменить изменения</UiButton>
                        </>
                    ) : (
                        <UiButton onClick={handleEditClick}>Редактировать</UiButton>
                    )}
                </div>

                <h1 style={{marginBottom: '20px'}}>Сменить пароль</h1>
                <div className={cl.userPassword__edit}>
                    <label className={cl.input__label}>Введите старый пароль:</label>
                    <div className={cl.inp}>
                    <UiInput />
                    </div>
                    <label className={cl.input__label}>Введите новый пароль:</label>
                    <UiInput />
                    <label className={cl.input__label}>Повторите новый пароль:</label>
                    <UiInput />
                    <UiButton>Изменить пароль</UiButton>
                </div>
            </div>
        </ProfileLayout>
    );
};

export default UserProfilePage;