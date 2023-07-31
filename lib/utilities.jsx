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

// For Link Items
export function generateRandomId() {
    const hex = '0123456789abcdef';
    let id = '';
    for (let i = 0; i < 8; i++) {
        id += hex.charAt(Math.floor(Math.random() * hex.length));
    }
    return `${id}-${id}-${id}-${id}-${id}${hex.charAt(Math.floor(Math.random() * hex.length))}`;
}

export function capitalizeFirstLetter(text) {
    if (typeof text !== 'string' || text.length === 0) {
        return text;
    }

    return text.charAt(0).toUpperCase() + text.slice(1);
}

export function isValidHexCode(text) {
    const hexCodeRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
    return hexCodeRegex.test(text);
}

export function generateUniqueId() {
    const timestamp = new Date().getTime();
    const randomString = Math.random().toString(25).substring(2, 15);
    return `${randomString}-${timestamp}`;
}

export function makeValidUrl(url) {
    if (url.startsWith('https://') || url.startsWith('http://')) {
        return url;
    } else {
        return `https://${url}`;
    }
}

export function hexToRgba(hex, alpha) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);

    if (alpha) {
        return `rgb(${r},${g},${b},${alpha})`;
    } else {
        return `rgb(${r},${g},${b})`;
    }
}

export function isSuitableForWhiteText(backgroundColor) {
    const r = parseInt(backgroundColor.slice(1, 3), 16);
    const g = parseInt(backgroundColor.slice(3, 5), 16);
    const b = parseInt(backgroundColor.slice(5, 7), 16);

    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

    return luminance > 0.5;
}
  

export function darkenColor(hexColor, amount) {
    hexColor = hexColor.replace('#', '');

    const r = parseInt(hexColor.substring(0, 2), 16);
    const g = parseInt(hexColor.substring(2, 4), 16);
    const b = parseInt(hexColor.substring(4, 6), 16);

    const darkR = Math.max(r - amount, 0);
    const darkG = Math.max(g - amount, 0);
    const darkB = Math.max(b - amount, 0);

    const darkHex = `#${(darkR).toString(16).padStart(2, '0')}${(darkG).toString(16).padStart(2, '0')}${(darkB).toString(16).padStart(2, '0')}`;

    return darkHex;
}