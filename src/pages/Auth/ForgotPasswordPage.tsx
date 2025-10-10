import React, { useState } from "react";

const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState<string>("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Here you would handle the logic to send the password reset link, e.g.,
    // sending the email to an API.
    console.log("Forgot password request for:", { email });
    alert("If your email is registered, a password reset link has been sent!");
    // Optionally, navigate to a confirmation page or display a success message
  };

  const backgroundImage =
    "/Images/forgotPass.png"; // You can replace with a more fitting image if desired.

  return (
    <div className="flex h-screen w-screen font-sans">
      {/* Left side: Background Image */}
      <div
        className="relative flex-1 bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-green-100/40 to-green-300/60"></div>
      </div>

      {/* Right side: Forgot Password Form */}
      <div className="flex-shrink-0 w-[560px] bg-white flex flex-col justify-center p-10 shadow-lg">
        <div className="flex items-center mb-8">
          <img
            src="/Images/logo.png"
            alt="Logo"
            className="mt-1 h-auto"
          />
        </div>
        <h2 className="text-4xl font-bold mb-2">Forgot your Password?</h2>
        <p className="text-gray-600 mb-8">
          Enter your email address and we'll send you a link to reset your
          password.
        </p>

        <form className="w-full" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block font-bold text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 mt-6 font-bold text-white rounded-lg nsyrd transition duration-300 ease-in-out"
          >
            Send Link
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
