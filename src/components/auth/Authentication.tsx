"use client";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

interface AuthenticationProps {
  handleCloseModal: () => void;
}

const Authentication = () => {
  const [isRegistration, setIsRegistration] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const { signup, login } = useAuth();

  async function handleAuthenticate() {
    if (
      !email ||
      !email.includes("@") ||
      !password ||
      password.length < 6 ||
      isAuthenticating
    ) {
      console.log("email or password do not match requirements");
      return;
    }
    try {
      setIsAuthenticating(true);
      setError(null);

      if (isRegistration) {
        // register a user
        await signup(email, password);
      } else {
        // login a user
        await login(email, password);
      }
      router.back();
      //handleCloseModal();
    } catch (error) {
      console.log((error as Error).message);
      setError((error as Error).message);
    } finally {
      setIsAuthenticating(false);
    }
  }
  return (
    <>
      <h2 className="">{isRegistration ? "Sign Up" : "Login"}</h2>
      <p>
        {isRegistration ? "Create an account!" : "Sign in to your account!"}
      </p>
      {error && <p>❌ {error}</p>}
      <input
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        placeholder="Email"
      />
      <input
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        placeholder="********"
        type="password"
      />
      <button onClick={handleAuthenticate}>
        <p>{isAuthenticating ? "Authenticating..." : "Submit"}</p>
      </button>
      <hr />
      <div className="">
        <p>
          {isRegistration
            ? "Already have an account?"
            : "Don't have an account?"}
        </p>
        <button
          onClick={() => {
            setIsRegistration(!isRegistration);
          }}
        >
          <p>{isRegistration ? "Sign in" : "Sign up"}</p>
        </button>
      </div>
    </>
  );
};

export default Authentication;
