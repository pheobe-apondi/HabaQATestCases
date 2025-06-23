const { login } = require('./login');
const { default: expect } = require('expect');

describe("Login Function", () => {
  test("should login with valid credentials", () => {
                      //Arrange
          const formData = {
             phone: "+254712345678", pin: "1234"
        }


 //Act
    const result = login(formData);


    //Assert
    expect(result.valid).toBe(true);
     expect(result.errors).toEqual({})
  });


  test("should throw error if fields are missing", () => {
         //Arrange
      const formData = {
             phone: "+254712345678", pin: ""
        }
            //Act
                  const result = login (formData)
                  //Assert
          
                  expect(result.valid).toBe(false)
                  expect(result.errors.inputs).toBe("Phone and PIN are required")


    
  });       

  test("should throw error if PIN is invalid", () => {
        
          const formData = {
             phone: "+254712345678", pin: "abc"
        }
        
        const result = login(formData)
    
                                         expect(result.valid).toBe(false)


                  expect(result.errors.pin).toBe("PIN must be a 4-digit number")

  });

       test("should throw error if phone number is not the correct format", () => {
        
          const formData = {
             phone: "0712345678", pin: "abc"
        }
        
        const result = login(formData)
    
                    
                 expect(result.valid).toBe(false)
                  expect(result.errors.phone).toBe("Phone number must start with +254")

  });



});



  