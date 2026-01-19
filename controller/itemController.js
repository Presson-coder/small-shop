import { itemService } from "../service/itemService.js";

export const itemController = {
  addItem: async (req, res) => {
    try {
      const { name, description, price, category, stock_quantity } = req.body;

      if (!name || !price) {
        return res.status(400).json({
          message: "Name and price are required",
        });
      }

      const itemData = {
        name,
        description: description || "",
        price: parseFloat(price),
        category: category || "general",
        stock_quantity: parseInt(stock_quantity) || 0,
      };

      const newItem = await itemService.addItem(itemData);
      res.status(201).json({
        message: "Item added successfully",
        item: newItem,
      });
    } catch (error) {
      res.status(500).json({
        message: "Error adding item",
        error: error.message,
      });
    }
  },

  listItems: async (req, res) => {
    try {
      const limit = parseInt(req.query.limit) || 50;
      const offset = parseInt(req.query.offset) || 0;

      const items = await itemService.listItems(limit, offset);
      const totalCount = await itemService.getItemsCount();

      res.status(200).json({
        items,
        pagination: {
          total: totalCount,
          limit,
          offset,
          hasMore: offset + limit < totalCount,
        },
      });
    } catch (error) {
      res.status(500).json({
        message: "Error retrieving items",
        error: error.message,
      });
    }
  },

  getItemDetails: async (req, res) => {
    try {
      const itemId = parseInt(req.params.id);

      if (isNaN(itemId)) {
        return res.status(400).json({
          message: "Invalid item ID",
        });
      }

      const item = await itemService.getItemDetails(itemId);

      if (!item) {
        return res.status(404).json({
          message: "Item not found",
        });
      }

      res.status(200).json(item);
    } catch (error) {
      res.status(500).json({
        message: "Error retrieving item details",
        error: error.message,
      });
    }
  },
};
