export function generateUniqueCode() {
    let code = '';
    const possibleChars = '0123456789';
    for (let i = 0; i < 6; i++) {
        code += possibleChars.charAt(Math.floor(Math.random() * possibleChars.length));
    }
    return code;
}