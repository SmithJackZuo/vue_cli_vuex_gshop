<template>
  <ul>
    <li v-for="(product,index) in products" :key="index">
      {{ product.title }} - {{ product.price }}
      <br />
      <button :disabled="!product.inventory" @click="addProductToCart(product)">Add to cart</button>
    </li>
  </ul>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'

const {
  mapState: productMapState,
  mapActions: productMapActions
} = createNamespacedHelpers('product')
const { mapActions: cartMapActions } = createNamespacedHelpers('cart')

export default {
  computed: {
    ...productMapState({
      products: state => state.all
    })
  },
  methods: {
    ...cartMapActions(['addProductToCart']),
    ...productMapActions(['getAllProducts'])
  },
  created() {
    this.getAllProducts()
  }
}
</script>