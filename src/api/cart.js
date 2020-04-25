import axios from "axios";

export default {
  async buyProducts(products) {
    const response = await axios.post(
      "https://www.fastmock.site/mock/a9b15cd4db90d4e03ed76cd3c76d9197/f6/buyproducts", {
        products
      }
    );
    return response.data;
  }
};