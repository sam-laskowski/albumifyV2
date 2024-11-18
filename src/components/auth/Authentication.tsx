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
    <div className="flex flex-col justify-center items-center mt-10 gap-3">
      <h2 className="font-bold text-xl">
        {isRegistration ? "Sign Up" : "Login"}
      </h2>
      <p>
        {isRegistration ? "Create an account!" : "Sign in to your account!"}
      </p>
      {error && <p>❌ {error}</p>}
      <input
        className="text-black text-lg rounded-sm pt-2 pb-2 pl-6 pr-6"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        placeholder="Email"
      />
      <input
        className="text-black text-lg rounded-sm pt-2 pb-2 pl-6 pr-6 mb-2"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        placeholder="********"
        type="password"
      />
      <button
        className="bg-zinc-700 rounded-md pt-2 pb-2 pl-4 pr-4 hover:ring-2 hover:ring-blue-600"
        onClick={handleAuthenticate}
      >
        <p>{isAuthenticating ? "Authenticating..." : "Submit"}</p>
      </button>
      <hr />
      <div className="flex flex-col items-center">
        <p className="mb-2">
          {isRegistration
            ? "Already have an account?"
            : "Don't have an account?"}
        </p>
        <button
          className="bg-zinc-700 rounded-md pt-2 pb-2 pl-4 pr-4 hover:ring-2 hover:ring-blue-600"
          onClick={() => {
            setIsRegistration(!isRegistration);
          }}
        >
          <p>{isRegistration ? "Sign in" : "Sign up"}</p>
        </button>
      </div>
    </div>
  );
};

export default Authentication;
