const isEmpty = (prop) => {
    return prop.length === 0;
}

const isValidCardNumber = (number) => {
    if (number.length !== 16) return false;

    if (!/^\d{16}$/.test(number)) return false;

    // Luhn Algorithm for card number validation
    let sum = 0;
    let shouldDouble = false;

    for (let i = number.length - 1; i >= 0; i--) {
        let digit = parseInt(number[i]);

        if (shouldDouble) {
            digit *= 2;
            if (digit > 9) digit -= 9;
        }

        sum += digit;
        shouldDouble = !shouldDouble;
    }

    // Valid if sum is a multiple of 10
    return sum % 10 === 0;
};

const isValidExpiryDate = (expiryDate) => {
    const regex = /^(0[1-9]|1[0-2])\/\d{2}$/;
    if (!regex.test(expiryDate)) return 1;

    const [month, year] = expiryDate.split('/').map(num => parseInt(num));
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear() % 100;
    const currentMonth = currentDate.getMonth() + 1;

    if (year < currentYear || (year === currentYear && month < currentMonth)) {
        return 2;
    }

    return 3;
};

const isValidCVV = (cvv) => {
    return /^\d{3,4}$/.test(cvv);
};


module.exports = { isEmpty, isValidCardNumber, isValidExpiryDate, isValidCVV };