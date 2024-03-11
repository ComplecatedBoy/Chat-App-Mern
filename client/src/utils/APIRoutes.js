import dotenv from "dotenv"
dotenv.config();
export const host=process.env.SERVER_URL;
export const setAvatarRoute=`${host}api/auth/setAvatar`;
export const loginRoute=`${host}api/auth/login`;
export const registerRoute=`${host}api/auth/signup`;
export const getContactsRoute=`${host}api/auth/getAllContacts`;
export const sendMessageRoute=`${host}api/Messages/addMessage`;
export const getAllMessageRoute=`${host}api/Messages/getAllMessage`;
