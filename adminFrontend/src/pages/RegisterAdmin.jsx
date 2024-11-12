import React, { useState } from "react";
import BlueButton from "../components/BlueButton.jsx";
import InputBox from "../components/InputBox.jsx";
import RegisterHeader from "../components/RegisterHeader.jsx";
import { useNavigate } from "react-router-dom";
import { createAdmin, checkAdminExists } from "../utils/api.js";
import Popup from "../components/Popup.jsx";

const RegisterAdmin = () => {
  // State variables for each input
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  
  const navigate = useNavigate();

  const usernameRegex = /^[a-zA-Z0-9]{4,30}$/; // Alphanumeric, 4-30 characters
  const phoneRegex = /^\+?[1-9 ]\d{1,14}$/; // E.164 format for international phone numbers
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email validation
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; // Minimum 8 chars, 1 letter, 1 number

  const handleRegister = async () => {
    // Validate required fields
    if (!username || !firstName || !lastName || !contactNumber || !email || !password || !confirmPassword) {
      setErrorMessage("Please complete all information");
      return;
    }

    // Validate individual field formats
    if (!usernameRegex.test(username)) {
      setErrorMessage("Username must be 4-30 characters, and only contain letters and numbers.");
      return;
    }
    if (!phoneRegex.test(contactNumber)) {
      setErrorMessage("Please enter a valid contact number in international format (e.g., +123456789).");
      return;
    }
    if (!emailRegex.test(email)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }
    if (!passwordRegex.test(password)) {
      setErrorMessage("Password must be at least 8 characters long, with at least one letter and one number.");
      return;
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    // Check if username already exists
    const usernameCheck = await checkAdminExists(username);
    if (usernameCheck.success && usernameCheck.exists) {
      setErrorMessage("Username already exists. Please choose a different one.");
      return;
    }

    // Prepare admin data
    const adminData = {
      username,
      password,
      first_name: firstName,
      last_name: lastName,
      contact_number: contactNumber,
      email
    };

    // Call createAdmin API
    const response = await createAdmin(adminData);

    if (response.success) {
      // Show success popup and store credentials in local storage
      setShowPopup(true);
      localStorage.setItem("newAdminCredentials", JSON.stringify({ username, password }));
    } else {
      // Display error message if registration failed
      setErrorMessage(response.message || "Registration failed");
    }
  };

  const handlePopupClose = () => {
    setShowPopup(false);
    navigate("/login");
  };

  return (
    <div className="bg-periwinkle flex flex-col items-center w-full h-screen">
      <div className="w-full flex items-center justify-center w-full h-[100%] mt-10 mb-20">
        <div className="w-full flex flex-col items-center bg-periwinkle w-full px-4 gap-16">
          <RegisterHeader text={"Admin registration"} />
          <div className="w-full flex flex-col items-center gap-8">
            {errorMessage && (
              <div className="text-red-500 text-center w-full">{errorMessage}</div>
            )}
            <InputBox number={username} setNumber={setUsername} hasError={!!errorMessage} title={"Username"} />
            <InputBox number={firstName} setNumber={setFirstName} hasError={!!errorMessage} title={"First name"} />
            <InputBox number={lastName} setNumber={setLastName} hasError={!!errorMessage} title={"Last name"} />
            <InputBox number={contactNumber} setNumber={setContactNumber} hasError={!!errorMessage} title={"Contact number"} />
            <InputBox number={email} setNumber={setEmail} hasError={!!errorMessage} title={"Email"} />
            <InputBox number={password} setNumber={setPassword} hasError={!!errorMessage} title={"Password"} />
            <InputBox number={confirmPassword} setNumber={setConfirmPassword} hasError={!!errorMessage} title={"Confirm password"} />
          </div>
          <BlueButton title="Register" onClick={handleRegister} />
        </div>
      </div>
      {showPopup && (
        <Popup
              message={"Registration successful!"}
              onClose={handlePopupClose} // Just hide the popup on "No"
            />
      )}
    </div>
  );
};

export default RegisterAdmin;
