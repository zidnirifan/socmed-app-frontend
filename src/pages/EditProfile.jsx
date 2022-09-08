import ChangeProfilePhoto from '../components/ChangeProfilePhoto';
import EditProfileBar from '../components/EditProfileBar';
import EditProfileForm from '../components/EditProfileForm';

export default function EditProfile() {
  return (
    <>
      <EditProfileBar />
      <ChangeProfilePhoto sx={{ mt: 5 }} />
      <EditProfileForm />
    </>
  );
}
