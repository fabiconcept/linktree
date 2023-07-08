import Cookies from 'js-cookie';

const SESSION_DURATION = 5; // Duration in minutes

// Function to set the session cookie
export const setSessionCookie = (key, value) => {
  Cookies.set(key, value, { expires: SESSION_DURATION / (24 * 60) }); // Convert duration to days
};

// Function to get the session cookie
export const getSessionCookie = (key) => {
  return Cookies.get(key);
};

// Function to remove the session cookie
export const removeSessionCookie = (key) => {
  Cookies.remove(key);
};
