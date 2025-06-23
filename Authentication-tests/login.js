function login({ phone, pin }) {
    const errors = {}
  if (!phone || !pin) {
       errors.inputs= "Phone and PIN are required"
  }
  if(phone && !phone.startsWith("+254")){
    errors.phone = "Phone number must start with +254"
  }
  if (pin.length !== 4 || isNaN(pin)) {
    errors.pin = "PIN must be a 4-digit number"
  }
  const isValid = Object.keys (errors).length === 0;
  return{
    valid:isValid,
    errors,
  };
}
module.exports = { login };
