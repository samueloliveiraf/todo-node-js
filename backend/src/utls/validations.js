function validateBrazilianPhoneNumber(phoneNumber) {
    const phoneRegex = /^(?:(?:\+|00)55|0?\d{2})[9]?[6789]\d{8}$/;

    return phoneRegex.test(phoneNumber);
}


function validateEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    return emailRegex.test(email);
}


module.exports = {
    validateBrazilianPhoneNumber,
    validateEmail
};