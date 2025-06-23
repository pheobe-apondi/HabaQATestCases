function addProduct({ name, sellingPrice, buyingPrice, unitType, quantity }) {
    const errors = {};
    // Check for missing fields
    if (!name || sellingPrice === undefined || buyingPrice === undefined || !unitType || quantity === undefined) {
      errors.inputs = "All fields are required";
    }
    // Validate name
    if (name && (typeof name !== "string" || !/^[A-Za-z\s]+$/.test(name))) {
      errors.name = "Product name must contain only letters";
    }
    // Validate numeric fields
    if ((sellingPrice !== undefined && isNaN(sellingPrice)) ||
        (buyingPrice !== undefined && isNaN(buyingPrice)) ||
        (quantity !== undefined && isNaN(quantity))) {
      errors.numeric = "Price and quantity must be numbers";
    }
    // Validate positive values
    if (
      sellingPrice !== undefined && sellingPrice <= 0 ||
      buyingPrice !== undefined && buyingPrice <= 0 ||
      quantity !== undefined && quantity < 0
    ) {
      errors.positive = "Price must be > 0 and quantity must be ≥ 0";
    }
    const isValid = Object.keys(errors).length === 0;
    if (!isValid) {
      return {
        valid: false,
        errors,
      };
    }
    // Simulate saving to inventory
    const product = {
      id: Date.now(),
      name,
      sellingPrice,
      buyingPrice,
      unitType,
      quantity,
    };
    return {
      valid: true,
      product,
      errors: {},
    };
  }
  module.exports = { addProduct };  