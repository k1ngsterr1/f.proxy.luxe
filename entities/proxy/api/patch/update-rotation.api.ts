import { apiClient } from "@/shared/config/apiClient";

export interface UpdateRotationRequest {
  package_key: string;
  rotation: number; // in seconds, -1 to 3600
}

export interface UpdateRotationResponse {
  success: boolean;
  message?: string;
}

export const updateRotation = async (
  data: UpdateRotationRequest
): Promise<UpdateRotationResponse> => {
  const response = await apiClient.patch(
    "/api/v1/products/update-rotation",
    data
  );
  return response.data;
};
