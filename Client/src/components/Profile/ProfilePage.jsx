import { useState } from "react";
import ProfileForm from "./ProfileForm";
import MessageAlert from "./MessageAlert";

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [formData, setFormData] = useState({
    name: "",
    fatherName: "",
    phone: "",
    location: "",
    website: "",
    jobTitle: "",
    dob: "",
    bio: "",
  });
  const [photoPreview, setPhotoPreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    // Add your form submission logic here
    setTimeout(() => {
      setSaving(false);
      setMessage({ type: "success", text: "Profile updated successfully!" });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <ProfilePage
        formData={formData}
        user={{ email: "user@example.com" }}
        photoPreview={photoPreview}
        imageFile={imageFile}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {activeTab === "profile" && (
        <div className="max-w-4xl mx-auto px-4 py-8">
          {message.text && (
            <MessageAlert type={message.type} message={message.text} />
          )}
          <ProfileForm
            formData={formData}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            handleFileChange={handleFileChange}
            photoPreview={photoPreview}
            imageFile={imageFile}
            saving={saving}
            user={{ email: "user@example.com" }}
          />
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
