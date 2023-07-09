import Cookies from 'js-cookie';


// Function to set the session cookie
export const setSessionCookie = (key, value, timeout) => {
  const SESSION_DURATION = timeout ? timeout : 5; // Duration in minutes
  Cookies.set(key, value, { expires: SESSION_DURATION / (24 * 60) }); // Convert duration to days
  return true;
};

// Function to get the session cookie
export const getSessionCookie = (key) => {
  return Cookies.get(key);
};

// Function to remove the session cookie
export const removeSessionCookie = (key) => {
  Cookies.remove(key);
};
