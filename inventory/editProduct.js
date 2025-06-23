function editProduct(existingProduct, updates) {
  const errors = {};
  if (!existingProduct || !existingProduct.id) {
    errors.product = "Product not found";
  }
  const { name, sellingPrice, buyingPrice, unitType, quantity } = updates;
  // Check for missing fields
  if (!name) errors.name = "Product name is required";
  if (!unitType) errors.unitType = "Unit type is required";
  if (sellingPrice === undefined) errors.sellingPrice = "Selling price is required";
  if (buyingPrice === undefined) errors.buyingPrice = "Buying price is required";
  if (quantity === undefined) errors.quantity = "Quantity is required";
  // Validate product name
  if (name && (typeof name !== "string" || !/^[A-Za-z\s]+$/.test(name))) {
    errors.name = "Product name must contain only letters";
  }
  // Validate numeric values
  if (sellingPrice !== undefined && (isNaN(sellingPrice) || sellingPrice <= 0)) {
    errors.sellingPrice = "Selling price must be a positive number";
  }
  if (buyingPrice !== undefined && (isNaN(buyingPrice) || buyingPrice <= 0)) {
    errors.buyingPrice = "Buying price must be a positive number";
  }
  if (quantity !== undefined && (isNaN(quantity) || quantity < 0)) {
    errors.quantity = "Quantity must be a number ≥ 0";
  }
  if (Object.keys(errors).length > 0) {
    throw errors;
  }
  // Return the updated product
  return {
    ...existingProduct,
    name,
    sellingPrice,
    buyingPrice,
    unitType,
    quantity
  };
}
module.exports = { editProduct };