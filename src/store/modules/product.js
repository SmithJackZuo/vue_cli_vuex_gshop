import productApi from "../../api/product";

export default {
  namespaced: true,
  state: {
    all: []
  },

  mutations: {
    setProducts(state, products) {
      state.all = products;
    },

    decrementProductInventory(state, {
      id
    }) {
      const product = state.all.find(product => product.id === id);
      product.inventory--;
    }
  },
  actions: {
    async getAllProducts({
      commit
    }) {
      const products = await productApi.getProducts();
      commit("setProducts", products);
    }
  }
};