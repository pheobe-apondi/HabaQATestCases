const { editProduct } = require('./editProduct');
describe("editProduct", () => {
  const existingProduct = {
    id: 1,
    name: "Tomato",
    sellingPrice: 30,
    buyingPrice: 20,
    unitType: "kg",
    quantity: 100
  };
  test("should return updated product with valid input", () => {
    const updates = {
      name: "Onion",
      sellingPrice: 40,
      buyingPrice: 25,
      unitType: "kg",
      quantity: 50
    };
    const result = editProduct(existingProduct, updates);
    expect(result.name).toBe("Onion");
    expect(result.sellingPrice).toBe(40);
    expect(result.quantity).toBe(50);
  });
  test("should throw errors for missing required fields", () => {
    const updates = {
      name: "",
      sellingPrice: undefined,
      buyingPrice: undefined,
      unitType: "",
      quantity: undefined
    };
    try {
      editProduct(existingProduct, updates);
    } catch (errors) {
      expect(errors.name).toBe("Product name is required");
      expect(errors.unitType).toBe("Unit type is required");
      expect(errors.sellingPrice).toBe("Selling price is required");
      expect(errors.buyingPrice).toBe("Buying price is required");
      expect(errors.quantity).toBe("Quantity is required");
    }
  });
  test("should throw error for invalid name format", () => {
    const updates = {
      name: "123Beans",
      sellingPrice: 20,
      buyingPrice: 10,
      unitType: "kg",
      quantity: 50
    };
    try {
      editProduct(existingProduct, updates);
    } catch (errors) {
      expect(errors.name).toBe("Product name must contain only letters");
    }
  });
  test("should throw errors for invalid price and quantity values", () => {
    const updates = {
      name: "Cabbage",
      sellingPrice: -5,
      buyingPrice: "not-a-number",
      unitType: "kg",
      quantity: -1
    };
    try {
      editProduct(existingProduct, updates);
    } catch (errors) {
      expect(errors.sellingPrice).toBe("Selling price must be a positive number");
      expect(errors.buyingPrice).toBe("Buying price must be a positive number");
      expect(errors.quantity).toBe("Quantity must be a number ≥ 0");
    }
  });
  test("should throw product not found error when product is missing", () => {
    const updates = {
      name: "Mango",
      sellingPrice: 50,
      buyingPrice: 35,
      unitType: "kg",
      quantity: 10
    };
    try {
      editProduct(null, updates);
    } catch (errors) {
      expect(errors.product).toBe("Product not found");
    }
  });
});