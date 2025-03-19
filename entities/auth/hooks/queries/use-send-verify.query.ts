"use client";

import { useMutation } from "@tanstack/react-query";
import { sendVerifyCode } from "../../api/post/send-verify-code.api";

export const useSendVerifyCode = () => {
  return useMutation({
    mutationFn: sendVerifyCode,
  });
};
