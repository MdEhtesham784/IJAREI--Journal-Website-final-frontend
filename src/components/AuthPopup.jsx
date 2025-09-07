import { useState } from "react";

export default function AuthPopup({ isLoginMode, setIsLoginMode, onClose, onAuthSuccess }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  

  const handleSendOtp = () => {
    if (email) {
      console.log("Sending OTP to", email);
      setOtpSent(true);
    }
  };

  const handleAuth = () => {
    if (isLoginMode) {
      if (email && password) {
        console.log("Logging in:", { email, password });
        onAuthSuccess();
      }
    } else {
      if (firstName && lastName && email && password && otp) {
        console.log("Signing up:", { firstName, lastName, email, password, otp });
        onAuthSuccess();
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50 transition-opacity duration-300" />

      {/* Modal Box */}
      <div className="relative bg-white p-6 rounded-lg shadow-lg w-full max-w-md z-10">
        <h2 className="text-2xl font-semibold text-center mb-4">
          {isLoginMode ? "Login" : "Sign Up"}
        </h2>

        <form className="flex flex-col gap-3" onSubmit={(e) => e.preventDefault()}>
          {/* First and Last Name (Signup only) */}
          {!isLoginMode && (
            <>
              <input
                type="text"
                placeholder="First Name"
                className="border px-3 py-2 rounded focus:outline-none focus:ring"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Last Name"
                className="border px-3 py-2 rounded focus:outline-none focus:ring"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </>
          )}

          {/* Email and Password */}
          <input
            type="email"
            placeholder="Email"
            className="border px-3 py-2 rounded focus:outline-none focus:ring"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="border px-3 py-2 rounded focus:outline-none focus:ring"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* OTP Section (Signup only) */}
          {!isLoginMode && (
            <>
              {otpSent ? (
                <input
                  type="text"
                  placeholder="Enter OTP"
                  className="border px-3 py-2 rounded focus:outline-none focus:ring"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
              ) : (
                <button
                  type="button"
                  disabled={!email}
                  onClick={handleSendOtp}
                  className={`text-sm underline ${
                    email ? "text-blue-600 hover:text-blue-700" : "text-gray-400 cursor-not-allowed"
                  }`}
                >
                  Send OTP
                </button>
              )}
            </>
          )}

          {/* Submit Button */}
          <button
            type="button"
            onClick={handleAuth}
            className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            {isLoginMode ? "Login" : "Sign Up"}
          </button>

          {/* Switch Auth Mode */}
          <p className="text-sm text-center text-gray-600">
            {isLoginMode ? (
              <>
                Don’t have an account?{" "}
                <span
                  className="text-blue-600 cursor-pointer hover:underline"
                  onClick={() => setIsLoginMode(false)}
                >
                  Sign up
                </span>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <span
                  className="text-blue-600 cursor-pointer hover:underline"
                  onClick={() => setIsLoginMode(true)}
                >
                  Login
                </span>
              </>
            )}
          </p>

          {/* Cancel Button */}
          <button
            onClick={onClose}
            className="mt-2 text-sm text-gray-500 hover:underline text-center"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}
