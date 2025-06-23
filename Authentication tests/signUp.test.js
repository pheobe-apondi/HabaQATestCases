const { beforeEach } = require('node:test');
const {validateSignUpForm} = require ('./signUp');
const { default: expect } = require('expect');
const { format } = require('path/posix');

describe ('validateSignUpForm',()=>{

    beforeEach(()=>{
    })

    it('returns true for valid inputs',()=>{

        //Arrange

        const formData = {
               firstName:'Alice',
               lastName: 'Ann',
               phoneNumber: '+254113456787',
               pin: '3002',
               confirmPin: '3002'
        }

        //Act

        const result = validateSignUpForm(formData);

        //Assert
          expect (result.valid).toBe(true);
          expect(result.errors).toEqual({})
    });

    it('returns error if pin do not match',()=>{

        //Arrange
          const formData = {
               firstName:'Alice',
               lastName: 'Ann',
               phoneNumber: '+254113456787',
               pin: '3002',
               confirmPin: '2003'

        }

        //Act

         const result = validateSignUpForm(formData);

         //Assert
          expect (result.valid).toBe(false);
          expect(result.errors.confirmPin).toBe('Pins do not match')

    })

        it('returns error if input field is left blank',()=>{
          const formData = {
               firstName:'',
               lastName: 'Vendor Name',
               phoneNumber: '+254113456787',
               pin: '3002',
               confirmPin: '3002'
        }

         const result = validateSignUpForm(formData);
          expect (result.valid).toBe(false);

          expect(result.errors.firstName).toBe('First Name is required')

    })


    it('returns error if phone number already in database',()=>{

                //Arrange
          const formData = {
               firstName:'Ann',
               lastName: 'Shiro',
               phoneNumber: '+2541234567898',
               pin: '3002',
               confirmPin: '3002'
        }

        //Act
        const result = validateSignUpForm(formData)


         //Assert

        expect(result.valid).toBe(false)

        expect(result.errors.phoneNumber).toBe('Phone number is already registered')

    });

})



