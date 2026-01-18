class ItemModel {
  constructor(db) {
    this.db = db;
  }

  async addItem(item) {
    const { name, price, description } = item;
    const query =
      "INSERT INTO items (name, price, description) VALUES ($1, $2, $3) RETURNING *";
    const values = [name, price, description];
    const result = await this.db.query(query, values);
    return result.rows[0];
  }

  async listItems() {
    const query = "SELECT * FROM items";
    const result = await this.db.query(query);
    return result.rows;
  }

  async getItemDetails(id) {
    const query = "SELECT * FROM items WHERE id = $1";
    const values = [id];
    const result = await this.db.query(query, values);
    return result.rows[0];
  }
}

export default ItemModel;
