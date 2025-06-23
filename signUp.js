const db = {
    users: [
        {firstName:'Ann',
         lastName:'John',
         phoneNumber: '+2541234567898',
         pin: '2002'
        }
    ]
}



function validateSignUpForm(data){
  const errors = {}

  if(!data.firstName){
    errors.firstName = "First Name is required"
  }

  if (data.pin !== data.confirmPin){
    errors.confirmPin = 'Pins do not match';
  }

  if(db.users.find(user => user.phoneNumber ===data.phoneNumber)){
    errors.phoneNumber = 'Phone number is already registered'

  }


  if(data.phoneNumber  !== '+254'){
    errors.phoneNumber = 'Phone number must start with +254'
  }


  db.users.push({
    firstName:data.firstName,
         lastName:data.lastName,
         phoneNumber: data.phoneNumber,
         pin: data.pin
  })

  const isValid = Object.keys (errors).length === 0;
  return{
    valid:isValid,
    errors,
  };

}


module.exports = {validateSignUpForm,db}