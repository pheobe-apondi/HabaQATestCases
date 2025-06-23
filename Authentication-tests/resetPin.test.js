const { resetPin, db } = require('./resetPin');
const { default: expect } = require('expect');
describe("Reset PIN Function", () => {
  beforeEach(() => {
    // Reset mock db before each test
    db["+254712345678"] = "1111";
    db["+254798765432"] = "2222";
    delete db["+254700000000"];
  });
  test("should reset PIN if phone exists and input is valid", () => {
    const formData = {
      phone: "+254712345678",
      newPin: "1234",
      confirmPin: "1234"
    };
    const result = resetPin(formData);
    expect(result.valid).toBe(true);
    expect(result.errors).toEqual({});
    expect(db["+254712345678"]).toBe("1234"); // db updated
  });
  test("should return error if phone not in db", () => {
    const formData = {
      phone: "+254700000000", // not in db
      newPin: "1234",
      confirmPin: "1234"
    };
    const result = resetPin(formData);
    expect(result.valid).toBe(false);
    expect(result.errors.phone).toBe("Phone number not found in our system");
  });
  test("should return error if PINs do not match", () => {
    const formData = {
      phone: "+254712345678",
      newPin: "1234",
      confirmPin: "9999"
    };
    const result = resetPin(formData);
    expect(result.valid).toBe(false);
    expect(result.errors.confirmPin).toBe("PINs do not match");
  });
});
