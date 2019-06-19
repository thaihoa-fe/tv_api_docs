import jwtDecode from 'jwt-decode';

import { RESPONSES_STORAGE_KEY } from '../constants/keys';
import { loadData, removeData, saveData } from './localStorage';

export const AUTH_TOKEN = 'AUTH_TOKEN';

export const isExpired = () => {
  const encryptedToken = loadData(AUTH_TOKEN);

  if (!encryptedToken) {
    return true;
  }

  const decryptedToken = jwtDecode(encryptedToken);

  return new Date(decryptedToken.exp * 1000) < Date.now();
};

export const persistAuthToken = token => {
  saveData(AUTH_TOKEN, token);
  const currentResponses = loadData(RESPONSES_STORAGE_KEY);
  saveData(RESPONSES_STORAGE_KEY, {
    ...currentResponses,
    login: { data: { data: { access_token: token } } },
  });
};

export const clearAuthToken = () => {
  removeData(AUTH_TOKEN);
};
