import React, { useState } from "react";
import AuthPopup from "./components/AuthPopup";
import AuthPopup from "./components/AuthPopup";

function App() {
  const [showAuthPopup, setShowAuthPopup] = useState(false);
  const [isLoginMode, setIsLoginMode] = useState(true); // default to login

  return (
    <div className="App">
      <Navbar
        onAuthOpen={() => setShowAuthPopup(true)}
        setIsLoginMode={setIsLoginMode}
      />
      {showAuthPopup && (
        <AuthPopup
          isLoginMode={isLoginMode}
          setIsLoginMode={setIsLoginMode}
          onClose={() => setShowAuthPopup(false)}
          onAuthSuccess={() => setShowAuthPopup(false)}
        />
      )}
    </div>
  );
}

export default App;
