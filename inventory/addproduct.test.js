const { addProduct } = require('./addProduct');
const { default: expect } = require('expect');
describe("addProduct Function", () => {
  test("should add product with valid inputs", () => {
    const formData = {
      name: "Tomatoes",
      sellingPrice: 80,
      buyingPrice: 60,
      unitType: "kg",
      quantity: 10
    };
    const result = addProduct(formData);
    expect(result.valid).toBe(true);
    expect(result.errors).toEqual({});
    expect(result.product.name).toBe("Tomatoes");
  });
  test("should return error for missing fields", () => {
    const formData = {
      name: "",
      sellingPrice: 80,
      buyingPrice: 60,
      unitType: "",
      quantity: undefined
    };
    const result = addProduct(formData);
    expect(result.valid).toBe(false);
    expect(result.errors.inputs).toBe("All fields are required");
  });
  test("should return error for invalid product name", () => {
    const formData = {
      name: "123Tomatoes",
      sellingPrice: 80,
      buyingPrice: 60,
      unitType: "kg",
      quantity: 10
    };
    const result = addProduct(formData);
    expect(result.valid).toBe(false);
    expect(result.errors.name).toBe("Product name must contain only letters");
  });
  test("should return error for non-numeric prices and quantity", () => {
    const formData = {
      name: "Tomatoes",
      sellingPrice: "eighty",
      buyingPrice: "sixty",
      unitType: "kg",
      quantity: "ten"
    };
    const result = addProduct(formData);
    expect(result.valid).toBe(false);
    expect(result.errors.numeric).toBe("Price and quantity must be numbers");
  });
  test("should return error for zero or negative values", () => {
    const formData = {
      name: "Tomatoes",
      sellingPrice: 0,
      buyingPrice: -10,
      unitType: "kg",
      quantity: -2
    };
    const result = addProduct(formData);
    expect(result.valid).toBe(false);
    expect(result.errors.positive).toBe("Price must be > 0 and quantity must be ≥ 0");
  });
});
