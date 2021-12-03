import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { AppDispatch } from "../app/store";
import { Profile } from "../features/profile/types";
import { signOut } from "../features/profile/profileSlice";

export const baseUrl = "/api/";
export const axiosConfig: AxiosRequestConfig = {
  validateStatus: (status: number) => {
    return status < 500;
  },
};

interface GetProfileResponse {
  twitchId: string;
  displayName: string;
  loginName: string;
  balance: number;
  lastTransactionId: number;
  roles: string[];
}

export async function fetchProfile(): Promise<Profile> {
  const response = await axios.get<GetProfileResponse>(baseUrl + "me", axiosConfig);

  if (response.status === 200) {
    return {
      isAuthenticated: true,
      displayName: response.data.displayName,
      balance: response.data.balance,
      roles: response.data.roles,
    } as Profile;
  }
  return {
    isAuthenticated: false,
    displayName: "",
    balance: 0,
  } as Profile;
}

export async function postPresence(dispatch: AppDispatch) {
  const response = await axios.post(baseUrl + "presence", null, axiosConfig);
  if (response.status >= 400) {
    handleErrors(dispatch, response);
  }
}

export async function handleErrors(dispatch: AppDispatch, response: AxiosResponse<any, any>) {
  if (response.status === 401 || response.status === 403) {
    return dispatch(signOut());
  }
}
