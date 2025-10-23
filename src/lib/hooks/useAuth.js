"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { loginRequest } from "@/lib/auth";
import { saveAuth, clearAuth } from "@/lib/auth";

export function useAuth() {
  // Always call useQueryClient - hooks must be called unconditionally
  const queryClient = useQueryClient();

  // diagnostic logs for debugging
  console.log("useAuth: queryClient:", queryClient);
  console.log(
    "useAuth: has defaultMutationOptions:",
    typeof queryClient?.defaultMutationOptions
  );
  console.log(
    "useAuth: getDefaultOptions:",
    typeof queryClient?.getDefaultOptions
  );

  if (queryClient && typeof queryClient.defaultMutationOptions !== "function") {
    // add a safe fallback to avoid MutationObserver calling undefined
    // This should be temporary — ideally the QueryClient should be created
    // with defaultOptions or the correct package versions should be used.
    console.warn(
      "queryClient.defaultMutationOptions missing — adding fallback"
    );
    queryClient.defaultMutationOptions = (opts) => {
      return {
        ...(queryClient.getDefaultOptions
          ? queryClient.getDefaultOptions("mutation")
          : {}),
        ...opts,
      };
    };
  }

  const mutation = useMutation({
    mutationFn: (payload) => loginRequest(payload),
    onSuccess: (data) => {
      // Expecting structure: { access, refresh, user }
      const access = data.access || data.token || data.access_token;
      const refresh = data.refresh || data.refresh_token;
      const user = data.user || null;
      saveAuth({ access, refresh, user });
    },
    onError: (err) => {
      // leave for caller to handle
      console.error("Login error:", err);
    },
  });

  const logout = () => {
    clearAuth();
    // optionally invalidate queries here if needed
  };

  return { ...mutation, logout };
}
