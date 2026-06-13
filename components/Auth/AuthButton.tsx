"use client";

import React from "react";
import { useAuth } from "@/contexts/AuthContext";

export default function AuthButton() {
  const { user, loading, configured, signInWithGoogle, signOut } = useAuth();

  if (!configured) return null;
  if (loading) return null;

  if (!user) {
    return (
      <button
        type="button"
        onClick={signInWithGoogle}
        style={{
          padding: "8px 14px",
          borderRadius: 8,
          border: "1px solid #ddd",
          background: "#fff",
          cursor: "pointer",
          fontSize: 14,
        }}
      >
        Sign in with Google
      </button>
    );
  }

  const name =
    (user.user_metadata?.full_name as string) || user.email || "Account";
  const avatar = user.user_metadata?.avatar_url as string | undefined;

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      {avatar && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={avatar}
          alt=""
          width={28}
          height={28}
          style={{ borderRadius: "50%" }}
        />
      )}
      <span
        style={{
          fontSize: 14,
          maxWidth: 140,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {name}
      </span>
      <button
        type="button"
        onClick={signOut}
        style={{
          padding: "6px 12px",
          borderRadius: 8,
          border: "1px solid #ddd",
          background: "#fff",
          cursor: "pointer",
          fontSize: 13,
        }}
      >
        Sign out
      </button>
    </div>
  );
}
