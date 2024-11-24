import * as Yup from "yup";

export const getPhishingFormSchema = (): Yup.ObjectSchema<any> =>
  Yup.object().shape({
    email: Yup.string().email("Must be a valid email address").required("Must not be empty"),
  });
