"use client";

import React, { useEffect, useRef, useState } from "react";
import { User as UserIcon, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export default function AuthButton() {
  const { user, loading, configured, signInWithGoogle, signOut } = useAuth();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close the dropdown when clicking outside of it.
  useEffect(() => {
    if (!open) return;
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

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
    <div ref={ref} style={{ position: "relative", display: "inline-block" }}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label="Account menu"
        aria-haspopup="menu"
        aria-expanded={open}
        style={{
          width: 36,
          height: 36,
          padding: 0,
          borderRadius: "50%",
          border: "1px solid #ddd",
          background: "#fff",
          cursor: "pointer",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {avatar ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={avatar}
            alt=""
            width={36}
            height={36}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : (
          <UserIcon size={20} color="#555" />
        )}
      </button>

      {open && (
        <div
          role="menu"
          style={{
            position: "absolute",
            top: "calc(100% + 8px)",
            right: 0,
            minWidth: 220,
            background: "#fff",
            border: "1px solid #eee",
            borderRadius: 12,
            boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
            padding: 8,
            zIndex: 1000,
          }}
        >
          <div style={{ padding: "8px 10px" }}>
            <div
              style={{
                fontSize: 14,
                fontWeight: 600,
                color: "#222",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {name}
            </div>
            {user.email && (
              <div
                style={{
                  fontSize: 12,
                  color: "#777",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {user.email}
              </div>
            )}
          </div>

          <div style={{ height: 1, background: "#eee", margin: "6px 0" }} />

          <button
            type="button"
            role="menuitem"
            onClick={() => {
              setOpen(false);
              signOut();
            }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              width: "100%",
              padding: "8px 10px",
              border: "none",
              background: "transparent",
              borderRadius: 8,
              cursor: "pointer",
              fontSize: 14,
              color: "#222",
              textAlign: "left",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#f5f5f5")}
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = "transparent")
            }
          >
            <LogOut size={16} />
            Sign out
          </button>
        </div>
      )}
    </div>
  );
}
