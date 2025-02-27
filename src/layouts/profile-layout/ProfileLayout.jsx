import ProfileSidebar from "../../components/ui/profile-sidebar/ProfileSidebar";
import cl from './ProfileLayout.module.css';

const ProfileLayout = ({children}) => {
    return (
        <div className={cl.profile__container}>
            <ProfileSidebar />
            {children}
        </div>
    );
};

export default ProfileLayout;