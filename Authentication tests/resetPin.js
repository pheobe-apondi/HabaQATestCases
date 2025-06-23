
const db = {
  "+254712345678": "1111",
  "+254798765432": "2222",
};


function resetPin({ phone, newPin, confirmPin }) {
  const errors = {};
  if (!phone || !newPin || !confirmPin) {
    errors.inputs = "Phone, new PIN, and confirm PIN are required";
  }
  if (phone && !phone.startsWith("+254")) {
    errors.phone = "Phone number must start with +254";
  }
  // Check if the phone exists in db
  if (phone && !(phone in db)) {
    errors.phone = "Phone number not found in our system";
  }
  if (newPin && (newPin.length !== 4 || isNaN(newPin))) {
    errors.newPin = "PIN must be a 4-digit number";
  }
  if (newPin && confirmPin && newPin !== confirmPin) {
    errors.confirmPin = "PINs do not match";
  }
  const isValid = Object.keys(errors).length === 0;
  if (isValid) {
    db[phone] = newPin; // update PIN
  }
  return {
    valid: isValid,
    errors
  };
}
module.exports = { resetPin, db };