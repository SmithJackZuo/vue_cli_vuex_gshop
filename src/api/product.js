import axios from "axios";

export default {
  async getProducts() {
    const response = await axios.get(
      "https://www.fastmock.site/mock/a9b15cd4db90d4e03ed76cd3c76d9197/f6/products"
    );
    return response.data
  }
};