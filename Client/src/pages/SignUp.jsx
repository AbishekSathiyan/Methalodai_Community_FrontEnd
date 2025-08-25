import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const toastConfig = {
  position: "top-center",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  theme: "colored",
};

const VillageSignUp = () => {
  const navigate = useNavigate();
  const { signup } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    dob: "",
    fathersName: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Email is invalid";

    if (!formData.phone.trim()) newErrors.phone = "Phone is required";
    else if (!/^\d{10,15}$/.test(formData.phone))
      newErrors.phone = "Phone is invalid";

    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    if (!formData.dob) newErrors.dob = "Date of birth is required";
    if (!formData.fathersName.trim())
      newErrors.fathersName = "Father's name is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setErrors({});

    try {
      const firebaseUser = await signup(formData.email, formData.password, {
        name: formData.name,
        fatherName: formData.fathersName,
        dob: formData.dob,
        phone: formData.phone,
      });

      setSuccess(true);
      toast.success("Signup successful! OTP sent to your email.", toastConfig);

      setTimeout(() => {
        navigate(`/verify-email?email=${encodeURIComponent(formData.email)}`);
      }, 1500);
    } catch (error) {
      setErrors({ firebase: error.message || "Signup failed. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50 p-4">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold text-green-800 mb-2 text-center">
          ML Community Village
        </h1>
        <p className="text-green-600 text-center mb-6">
          Join our growing community of learners and farmers
        </p>

        {success ? (
          <div className="text-center py-8">
            <h2 className="text-2xl font-bold text-green-800 mb-2">
              Signup Successful!
            </h2>
            <p className="text-green-600">
              OTP sent to your email. Redirecting...
            </p>
          </div>
        ) : (
          <>
            {errors.firebase && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                {errors.firebase}
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <InputField
                label="Full Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                error={errors.name}
              />
              <InputField
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
                type="email"
              />
              <InputField
                label="Phone Number"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                error={errors.phone}
              />
              <InputField
                label="Father's Name"
                name="fathersName"
                value={formData.fathersName}
                onChange={handleChange}
                error={errors.fathersName}
              />
              <InputField
                label="Date of Birth"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                error={errors.dob}
                type="date"
              />
              <InputField
                label="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                error={errors.password}
                type="password"
              />
              <InputField
                label="Confirm Password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                error={errors.confirmPassword}
                type="password"
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition"
              >
                {loading ? "Processing..." : "Join the Village"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

const InputField = ({ label, name, value, onChange, error, type = "text" }) => (
  <div>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={label}
      autoComplete={type === "password" ? "new-password" : "on"}
      className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
        error ? "border-red-500 focus:ring-red-200" : "border-green-300 focus:ring-green-200"
      }`}
    />
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
);

export default VillageSignUp;
