"use client";

import React, { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/contexts/ToastContext";

export default function LoginPage() {
  const { user, configured, signInWithGoogle } = useAuth();
  const { showToast } = useToast();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.get("error")) {
      showToast("Sign-in failed. Please try again.", "error");
    }
  }, [searchParams, showToast]);

  return (
    <main
      style={{
        minHeight: "60vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 16,
        padding: 24,
      }}
    >
      <h1 style={{ fontSize: 24 }}>Sign in</h1>
      {!configured ? (
        <p>Authentication is not configured yet.</p>
      ) : user ? (
        <p>You are signed in as {user.email}.</p>
      ) : (
        <button
          type="button"
          onClick={signInWithGoogle}
          style={{
            padding: "10px 18px",
            borderRadius: 8,
            border: "1px solid #ddd",
            background: "#fff",
            cursor: "pointer",
            fontSize: 15,
          }}
        >
          Sign in with Google
        </button>
      )}
    </main>
  );
}
