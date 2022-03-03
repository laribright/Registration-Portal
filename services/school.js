import axios from "axios";

import {
  GET_MATCHES,
  POST_MATCH,
  REGISTER_SCHOOL_API,
  UPDATE_SCHOOL_API,
  USER_LOGIN,
} from "../constants/Apis";

export const registerSchool = async (data) => {
  const result = await axios.post(REGISTER_SCHOOL_API, data);
  return result.data;
};

export const updateSchool = async (schoolId) => {
  await axios.patch(`${UPDATE_SCHOOL_API}/${schoolId}`);
};

export const adminLogin = async (data) => {
  const result = await axios.post(USER_LOGIN, data);

  return result.data;
};

export const fixMatch = async (data, user) => {
  try {
    const result = await axios.post(POST_MATCH, data, {
      headers: {
        Authorization: user,
      },
    });
    return result.data;
  } catch (error) {
    return error;
  }
};

export const getMatches = async () => {
  try {
    const result = await axios.get(GET_MATCHES);
    return result.data;
  } catch (error) {
    console.log(error);
  }
};
