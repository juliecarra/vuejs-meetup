import { helpers } from "vuelidate/lib/validators";

export const supportedFileType = value => {
  if (!helpers.req(value)) return true; //check if value is required

  //check formats and if formats includes the right extensions
  const allowedFormats = ["jpg", "png", "jpeg"];
  const extension = value.split(".").pop();
  return allowedFormats.includes(extension);
};
