export function validateEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

export function validatePassword(password) {
    const lengthRegex = /.{8,}/; // At least 8 characters long
    const uppercaseRegex = /[A-Z]/; // Contains at least one uppercase letter
    const lowercaseRegex = /[a-z]/; // Contains at least one lowercase letter
    const numberRegex = /\d/; // Contains at least one number
    const specialCharRegex = /[^A-Za-z0-9]/; // Contains at least one special character

    let errorMessage = '';

    if (!lengthRegex.test(password)) {
        errorMessage += 'Password should be at least 8 characters long. ';
    }

    if (!uppercaseRegex.test(password)) {
        errorMessage += 'Password should contain at least one uppercase letter. ';
    }

    if (!lowercaseRegex.test(password)) {
        errorMessage += 'Password should contain at least one lowercase letter. ';
    }

    if (!numberRegex.test(password)) {
        errorMessage += 'Password should contain at least one number. ';
    }

    if (!specialCharRegex.test(password)) {
        errorMessage += 'Password should contain at least one special character. ';
    }

    return errorMessage === '' ? true : errorMessage;
}

export function generateId() {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let myId = 'user';
  
    // Generate a random 4-digit number
    const randomNumber = Math.floor(Math.random() * 10000);
    myId += randomNumber.toString().padStart(4, '0');
  
    // Add two random letters
    for (let i = 0; i < 2; i++) {
      const randomIndex = Math.floor(Math.random() * letters.length);
      myId += letters[randomIndex];
    }
  
    return myId;
}

export function realEscapeString(str) {
    // List of characters to escape
    const escapeChars = {
      '\x00': '\\0',
      '\x08': '\\b',
      '\x09': '\\t',
      '\x1a': '\\Z',
      '\n': '\\n',
      '\r': '\\r',
      '\"': '\\"',
      '\'': '\\\'',
      '\\': '\\\\',
    };
  
    // Replace special characters with their escaped counterparts
    return str.replace(/[\x00\x08\x09\x1a\n\r"\'\\]/g, (char) => escapeChars[char]);
}

export function testPromiseStatus(promise) {
    let status = 102;

    promise
        .then(() => {
            status = 200;
        })
        .catch(() => {
            status = 400;
        })
        .finally(() => {
            return status
        });
}

export function isValidURL(text) {
    // Regular expression pattern to match a valid URL format
    const urlPattern = /^(https?:\/\/)?([\w-]+(\.[\w-]+)+)([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?$/;
    
    return urlPattern.test(text);
  }
  