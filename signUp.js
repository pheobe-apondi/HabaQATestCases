function validateSignUpForm(data){
  const errors = {}

  if(!data.firstName){
    errors.firstName = "First Name is required"
  }

  if (data.pin !== data.confirmPin){
    errors.confirmPin = 'Pins do not match';
  }


  const isValid = Object.keys (errors).length === 0;
  return{
    valid:isValid,
    errors,
  };

}


module.exports = {validateSignUpForm}