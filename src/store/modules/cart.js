import cartApi from "../../api/cart";

export default {
  namespaced: true,
  state: {
    items: [],
    checkoutStatus: null
  },
  mutations: {
    pushProductToCart(state, {
      id
    }) {
      state.items.push({
        id,
        quantity: 1
      });
    },

    incrementItemQuantity(state, {
      id
    }) {
      const cartItem = state.items.find(item => item.id === id);
      cartItem.quantity++;
    },

    setCartItems(state, {
      items
    }) {
      state.items = items;
    },

    setCheckoutStatus(state, status) {
      state.checkoutStatus = status;
    }
  },
  actions: {
    async checkout({
      commit,
      state
    }, products) {
      const savedCartItems = [...state.items];
      commit("setCheckoutStatus", null);
      // empty cart
      commit("setCartItems", {
        items: []
      });

      const result = await cartApi.buyProducts(products);
      if (result.success) {
        commit("setCheckoutStatus", "successful");
      } else {
        commit("setCheckoutStatus", "failed");
        commit("setCartItems", {
          items: savedCartItems
        });
      }
    },

    addProductToCart({
      state,
      commit
    }, product) {
      commit("setCheckoutStatus", null);
      if (product.inventory <= 0) {
        return;
      }
      const cartItem = state.items.find(item => item.id === product.id);
      if (!cartItem) {
        commit("pushProductToCart", {
          id: product.id
        });
      } else {
        commit("incrementItemQuantity", cartItem);
      }
      // remove 1 item from stock
      commit(
        "product/decrementProductInventory", {
          id: product.id
        }, {
          root: true
        }
      );
    }
  },
  getters: {
    cartProducts(state, getters, rootState) {
      return state.items.map(({
        id,
        quantity
      }) => {
        //rootState 可以获取其他模块state
        console.log(rootState.product)
        let data = rootState.product.all.find(item => item.id = id);
        return {
          id,
          title: data.title,
          price: data.price,
          quantity
        }
      })
    },
    cartTotalPrice: (state, getters) => {
      return getters.cartProducts.reduce(function (prev, cur) {
        return prev + cur.price * cur.quantity
      }, 0)
    }
  }
};