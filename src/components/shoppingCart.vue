<template>
  <div class="cart">
    <h2>Your Cart</h2>
    <p v-show="!cartProducts.length">
      <i>Please add some products to cart.</i>
    </p>
    <ul>
      <li v-for="(product,index) in cartProducts" :key="index">{{ product.title }} - {{ product.price }} x {{ product.quantity }}</li>
    </ul>
    <p>Total: {{ cartTotalPrice }}</p>
    <p>
      <button :disabled="!cartProducts.length" @click="checkout(cartProducts)">Checkout</button>
    </p>
    <p v-show="checkoutStatus">Checkout {{ checkoutStatus }}.</p>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'

const { mapState, mapActions, mapGetters } = createNamespacedHelpers('cart')
const { mapState: productMapState } = createNamespacedHelpers('product')

export default {
  computed: {
    ...mapState({
      items: state => state.items,
      checkoutStatus: state => state.checkoutStatus
    }),
    ...productMapState({
      allProducts: state => state.all
    }),
    ...mapGetters(['cartProducts', 'cartTotalPrice'])
  },
  methods: {
    ...mapActions(['checkout'])
  }
}
</script>