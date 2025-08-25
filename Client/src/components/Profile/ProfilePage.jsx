import ProfileHeader from "./ProfileHeader";
import Navigation from "./Navigation";
export default function ProfilePage({
  formData,
  user,
  photoPreview,
  imageFile,
}) {
  return (
    <>
      <Navigation />
      <div>
        <ProfileHeader
          formData={formData}
          user={user}
          photoPreview={photoPreview}
          imageFile={imageFile}
        />
      </div>
    </>
  );
}
