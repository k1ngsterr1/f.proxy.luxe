"use client";

import { useMutation } from "@tanstack/react-query";
import { sendResetEmail } from "../../api/post/send-reset-email.api";

export const useSendResetEmail = () => {
  return useMutation({
    mutationFn: sendResetEmail,
  });
};
