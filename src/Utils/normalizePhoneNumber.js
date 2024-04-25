export function normalizePhoneNumber(phoneNumber) {
    if (phoneNumber.startsWith("+92")) {
        return phoneNumber;
    } else {
        return "+92" + phoneNumber.slice(1);
    }
}
    

  