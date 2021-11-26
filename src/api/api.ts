import axios from "axios";
import { Profile } from "../features/profile/types";

const baseUrl = "/api/";

interface GetProfileResponse {
  twitchId: string;
  displayName: string;
  loginName: string;
  balance: number;
  lastTransactionId: number;
}

export async function fetchProfile(): Promise<Profile> {
  const response = await axios.get<GetProfileResponse>(baseUrl + "me");

  if (response.status === 200) {
    return {
      isAuthenticated: true,
      displayName: response.data.displayName,
      balance: response.data.balance,
    } as Profile;
  }
  return {
    isAuthenticated: false,
    displayName: "",
    balance: 0,
  } as Profile;
}

export async function postPresence() {
  await axios.post(baseUrl + "presence");
}

export async function fetchCurrentBettingGame() {
  const response = await axios.get(baseUrl + "betting");

  if(response.status === 200) {
    return response.data;
  }
}
