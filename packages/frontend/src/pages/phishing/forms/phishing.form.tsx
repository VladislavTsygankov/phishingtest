import { Box, Button, styled, SxProps, TextField, Typography } from "@mui/material";
import { getPhishingFormSchema } from "./phishing.schema";
import { useYupValidationResolver } from "../../../hooks/useYupValidationResolver";
import { useForm } from "@refinedev/react-hook-form";
import { IPhishingAttempt } from "../../../interfaces/phishing-attempt.interface";
import { HttpError, useInvalidate } from "@refinedev/core";
import { ReactNode } from "react";

export const PhishingForm: React.FC<{ closeModal: () => void }> = ({ closeModal }) => {
  const schema = getPhishingFormSchema();
  const resolver = useYupValidationResolver(schema);
  const invalidate = useInvalidate();
  const {
    refineCore: { onFinish },
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<IPhishingAttempt, HttpError>({
    resolver,
    defaultValues: {
      email: "",
    },
    refineCoreProps: {
      action: "create",
      resource: "phishing/send",
      redirect: false,
      queryOptions: { retry: 3 },
      onMutationSuccess: () => {
        invalidate({
          resource: "phishing",
          invalidates: ["all"],
        });
        closeModal();
      },
      successNotification: () => {
        return { type: "success", message: "Attempt created successfully", description: "Success" };
      },
      errorNotification: (error) => {
        return {
          message: error?.response.data.message!,
          description: error?.response.data.error,
          type: "error",
        };
      },
    },
  });

  return (
    <Box id="phishing-form" component="form" onSubmit={handleSubmit(onFinish)}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        <TextField
          fullWidth
          variant="filled"
          label="Email"
          InputProps={{ ...register("email") }}
          error={!!errors["email"]?.message}
        />
        <Button type="submit" variant="contained">
          Create Attempt
        </Button>
      </Box>
    </Box>
  );
};
