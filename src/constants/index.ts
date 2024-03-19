const MAX_FILE_SIZE_MB = 50;
const SUPPORTED_FILE_FORMATS = [
  '.xls',
  '.xlsx',
  '.doc',
  '.docx',
  '.pdf',
  '.jpg',
  '.png',
  '.pptx',
  '.mp4',
  '.avi',
  '.3gpp'
];

export const INPUT_FILE_FORMATS = [
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/pdf',
  'image/jpg',
  'image/png',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  'video/mp4',
  'video/x-msvideo',
  'video/3gpp'
];

const KEYCLOAK_IP = 'your_keycloak_ip';
const PLATFORM_URL = 'https://keycloak.new-lms.ru';

export default {
  MAX_FILE_SIZE_MB,
  SUPPORTED_FILE_FORMATS,
  KEYCLOAK_IP,
  PLATFORM_URL
};
