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
  var returnValue: Profile;

  if (response.status === 200) {
    returnValue = {
      isAuthenticated: true,
      displayName: response.data.displayName,
      balance: response.data.balance,
    } as Profile;
  } else {
    returnValue = {
      isAuthenticated: false,
      displayName: "",
      balance: 0,
    } as Profile;
  }

  return returnValue;
}

export async function postPresence() {
    await axios.post(baseUrl + "presence");
}
