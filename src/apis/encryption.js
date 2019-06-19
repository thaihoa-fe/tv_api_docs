import axios from 'axios';

export async function getTelcoPublicKey() {
  try {
    const response = await axios({
      baseURL: process.env.GATSBY_API_BASE_URL,
      url: '/isdn-encryption/telcos/get_public_key',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response && response.data.data.public_key;
  } catch (error) {
    return '';
  }
}
