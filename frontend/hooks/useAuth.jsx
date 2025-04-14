// src/hooks/useAuth.js
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { authAPI } from "../api/apiClient";

export function useAuth() {
  const queryClient = useQueryClient();

  // Query to check auth status
  const { 
    data: user, 
    isLoading: isAuthLoading,
    isError: isAuthError,
    error: authError,
  } = useQuery({
    queryKey: ["auth"],
    queryFn: authAPI.verifyAuth,
    retry: false,
  });

  // Mutation for logout
  const { mutate: logout, isPending: isLoggingOut } = useMutation({
    mutationFn: authAPI.logout,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["auth"] });
    },
  });

  return {
    user,
    isAuthenticated: !!user?.isAuthenticated,
    isAuthLoading,
    isAuthError,
    authError,
    logout,
    isLoggingOut,
  };
}