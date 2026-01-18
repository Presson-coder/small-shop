import { query } from "../config/database.js";

export const itemService = {

  addItem: async (itemData) => {
    const { name, description, price, category, stock_quantity } = itemData;

    const insertQuery = `
      INSERT INTO items (name, description, price, category, stock_quantity, created_at, updated_at)
      VALUES ($1, $2, $3, $4, $5, NOW(), NOW())
      RETURNING *
    `;

    const values = [name, description, price, category, stock_quantity];

    try {
      const result = await query(insertQuery, values);
      return result.rows[0];
    } catch (error) {
      throw new Error(`Error adding item: ${error.message}`);
    }
  },

  listItems: async (limit = 50, offset = 0) => {
    const selectQuery = `
      SELECT id, name, description, price, category, stock_quantity, created_at, updated_at
      FROM items
      ORDER BY created_at DESC
      LIMIT $1 OFFSET $2
    `;

    try {
      const result = await query(selectQuery, [limit, offset]);
      return result.rows;
    } catch (error) {
      throw new Error(`Error retrieving items: ${error.message}`);
    }
  },

  getItemDetails: async (itemId) => {
    const selectQuery = `
      SELECT id, name, description, price, category, stock_quantity, created_at, updated_at
      FROM items
      WHERE id = $1
    `;

    try {
      const result = await query(selectQuery, [itemId]);

      if (result.rows.length === 0) {
        return null;
      }

      return result.rows[0];
    } catch (error) {
      throw new Error(`Error retrieving item details: ${error.message}`);
    }
  },

  getItemsCount: async () => {
    const countQuery = "SELECT COUNT(*) FROM items";

    try {
      const result = await query(countQuery);
      return parseInt(result.rows[0].count);
    } catch (error) {
      throw new Error(`Error getting items count: ${error.message}`);
    }
  },

  updateStock: async (itemId, newQuantity) => {
    const updateQuery = `
      UPDATE items
      SET stock_quantity = $1, updated_at = NOW()
      WHERE id = $2
      RETURNING *
    `;

    try {
      const result = await query(updateQuery, [newQuantity, itemId]);

      if (result.rows.length === 0) {
        return null;
      }

      return result.rows[0];
    } catch (error) {
      throw new Error(`Error updating stock: ${error.message}`);
    }
  },
};
