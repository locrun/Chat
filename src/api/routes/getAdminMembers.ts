import axios from 'axios';

export const getAdminMembers = async (access_token: string) => {
  return await axios.get(
    `https://keycloak.new-lms.ru/admin/realms/openedx/groups/${process.env.REACT_APP_UUID}/members`,
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
        'Access-Control-Allow-Origin': 'https://chat-deploy-5frh.vercel.app/'
      }
    }
  );
};
