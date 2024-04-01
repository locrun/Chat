import axios from 'axios';

export const LMSAccounts = async () => {
  return await axios.get('https://new-lms.ru/api/user/v1/accounts', {
    headers: {
      Accept: 'application/json',
      authorization: `Bearer ${process.env.REACT_APP_LMS_APP_TOKEN}`
    }
  });
};
