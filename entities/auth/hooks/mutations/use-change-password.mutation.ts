"use client";

import { useMutation } from "@tanstack/react-query";
import { changePassword } from "../../api/post/change-password.api";

export const useChangePassword = () => {
  return useMutation({
    mutationFn: changePassword,
  });
};
