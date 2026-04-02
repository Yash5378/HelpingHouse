export const baseUrl = import.meta.env.VITE_BASE_URL;

export const DonerLogin = `${baseUrl}/signin`;
export const SignupDonerUrl = `${baseUrl}/signup_doner`;
export const GetAllHelpingHouseUrl = (queryparam) =>
  `${baseUrl}/api/helping_house/all${queryparam ? `?${queryparam}` : ""}`;

export const GetHelpingHouseUrlById = (id) =>
  `${baseUrl}/api/helping_house/${id}`;
export const GetHelpingHouseDashboardUrl = (id) =>
  `${baseUrl}/api/helping_house/dashboard/${id}`;
export const CreatePersonUrl = `${baseUrl}/api/helping_house/persons`;
export const DeletePersonUrl = (id) =>
  `${baseUrl}/api/helping_house/persons/${id}`;

export const EditHelpingHouseUrl = (id) => `${baseUrl}/api/helping_house/${id}`;
