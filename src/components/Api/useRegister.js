import axios from "axios";
import { useMutation } from "@tanstack/react-query";

const useRegister = () => {
  const registerMutation = useMutation(async ({ userData, imageFiles }) => {
    const formData = new FormData();
    console.log(userData);
    console.log(imageFiles);

    if (userData) {
      formData.append("user", JSON.stringify(userData), {
        type: "application/json",
      });
    }

    if (imageFiles) {
      for (const [key, value] of Object.entries(imageFiles)) {
        if (value) {
          formData.append(key, value);
        }
      }
    }

    for (const [key, value] of formData.entries()) {
      console.log(key, value);
    }

    try {
      const response = await axios.post(
        `http://${process.env.REACT_APP_SERVER_IP}/users/signup`,
        formData
      );

      return response.data;
    } catch (error) {
      console.error("An error occurred while registering:", error.response);
      throw new Error("Network response was not ok");
    }
  });

  return registerMutation;
};

export { useRegister };
