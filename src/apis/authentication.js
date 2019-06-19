import axios from 'axios';

export async function login(data) {
  const response = await axios({
    baseURL:
      process.env.NODE_ENV === 'development' ? '/proxy-api' : process.env.GATSBY_API_BASE_URL,
    url: '/authentication/users/login',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data,
  });

  return response && response.data.data.access_token;
}
