<template>
  <div class="products-section">
    <!-- Popular Products Header with Filters -->
    <div class="section-header">
      <h2 class="section-title">Popular Products</h2>
      <div class="filter-tabs">
        <button
          v-for="category in categories"
          :key="category.id"
          :class="['filter-btn', { active: selectedCategory === category.id }]"
          @click="selectedCategory = category.id"
        >
          {{ category.name }}
        </button>
      </div>
    </div>

    <!-- Products Grid -->
    <div class="products-grid">
      <div v-for="prod in filteredProducts" :key="prod.id" class="product-card">
        <!-- Category Tag -->
        <div
          class="category-tag"
          :style="{ backgroundColor: getCategoryTagColor(prod.categoryId) }"
        >
          {{ getCategoryName(prod.categoryId) }}
        </div>

        <!-- Product Image -->
        <div class="product-image">
          <img :src="prod.image" :alt="prod.name" />
        </div>

        <!-- Product Info -->
        <div class="product-info">
          <!-- Product Name -->
          <h3 class="product-name">{{ prod.name }}</h3>

          <!-- Rating -->
          <div class="product-rating">
            <span class="stars">⭐ {{ prod.rating }}</span>
            <span class="weight">({{ prod.size }})</span>
          </div>

          <!-- Price -->
          <div class="product-price">
            <span class="price">${{ prod.price.toFixed(2) }}</span>
            <span v-if="prod.promotionAsPercentage > 0" class="original-price">
              ${{ (prod.price / (1 - prod.promotionAsPercentage / 100)).toFixed(2) }}
            </span>
          </div>

          <!-- Quantity and Add to Cart -->
          <div class="product-actions">
            <div class="quantity-selector">
              <button @click="decreaseQuantity(prod.id)" class="qty-btn">−</button>
              <input
                :value="quantities[prod.id] || 1"
                type="number"
                min="1"
                class="qty-input"
                @change="onQtyChange($event, prod.id)"
              />
              <button @click="increaseQuantity(prod.id)" class="qty-btn">+</button>
            </div>
            <button @click="addToCart(prod)" class="add-to-cart-btn">Add +</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useProductStore } from '../stores/ProductStore'

interface Product {
  id: number
  name: string
  rating: number
  size: string
  image: string
  price: number
  promotionAsPercentage: number
  categoryId: number
  instock: boolean
  countSold: number
  group: number
}

const productStore = useProductStore()
const selectedCategory = ref(0)
const quantities = ref<Record<number, number>>({})

// Get all categories
const categories = computed(() => {
  const allCats = productStore.categories
  return [{ id: 0, name: 'All' }, ...allCats]
})

// Get popular products
const popularProducts = computed(() => productStore.getPopularProducts)

// Filter popular products by selected category
const filteredProducts = computed(() => {
  if (selectedCategory.value === 0) {
    return popularProducts.value
  }
  return popularProducts.value.filter((product) => product.categoryId === selectedCategory.value)
})

// Get category name by ID
const getCategoryName = (categoryId: number) => {
  const category = productStore.categories.find((cat) => cat.id === categoryId)
  return category?.name || 'Unknown'
}

// Get category tag color by ID
const getCategoryTagColor = (categoryId: number) => {
  const colors: Record<number, string> = {
    1: '#48d597', // Burger - green
    2: '#f4a5a5', // Peach - pink
    3: '#70ad47', // Organic Kiwi - light green
    4: '#ed7d31', // Red Apple - orange
    5: '#ffc000', // Snack - yellow
    6: '#c55a11', // Black plum - brown
    7: '#92d050', // Vegetables - lime
    8: '#4472c4', // Headphone - blue
    9: '#e2efda', // Cake & Milk - light
    10: '#f8cbad', // Orange - peach
  }
  return colors[categoryId] || '#48d597'
}

const increaseQuantity = (productId: number) => {
  quantities.value[productId] = (quantities.value[productId] || 1) + 1
}

const decreaseQuantity = (productId: number) => {
  if ((quantities.value[productId] || 1) > 1) {
    quantities.value[productId] = (quantities.value[productId] || 1) - 1
  }
}

const updateQuantity = (productId: number, qty: number) => {
  if (qty > 0) {
    quantities.value[productId] = qty
  }
}

const onQtyChange = (e: Event, productId: number) => {
  const target = e.target as HTMLInputElement | null
  const value = target?.value ?? '1'
  const qty = parseInt(value, 10)
  if (!isNaN(qty) && qty > 0) {
    updateQuantity(productId, qty)
  } else {
    updateQuantity(productId, 1)
  }
}

const addToCart = (product: Product) => {
  const qty = quantities.value[product.id] || 1
  console.log(`Added ${qty} x ${product.name} to cart`)
  alert(`✅ Added ${qty} x ${product.name} to cart!`)
  quantities.value[product.id] = 1
}
</script>

<style scoped>
.products-section {
  width: 100%;
  padding: 40px 20px;
  background: white;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px 20px 20px;
  border-bottom: 1px solid #f0f0f0;
  width: 100%;
  max-width: 1300px;
}

.section-title {
  font-size: 28px;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0;
}

.filter-tabs {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-left: auto;
}

.filter-btn {
  padding: 8px 16px;
  border: 1px solid #e8e8e8;
  background: white;
  color: #666;
  border-radius: 20px;
  cursor: pointer;
  font-size: 13px;
  font-weight: 500;
  transition: all 0.3s ease;
}

.filter-btn:hover {
  border-color: #48d597;
  color: #48d597;
}

.filter-btn.active {
  background: #48d597;
  color: white;
  border-color: #48d597;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 12px;
  padding: 15px;
  background: white;
  width: 100%;
  max-width: 1300px;
}

.product-card {
  background: white;
  border: 1px solid #e8e8e8;
  border-radius: 8px;
  padding: 8px;
  transition: all 0.3s ease;
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.product-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transform: translateY(-4px);
}

/* Category Tag */
.category-tag {
  position: absolute;
  top: 10px;
  right: 10px;
  color: white;
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
  z-index: 10;
}

/* Product Image */
.product-image {
  width: 100%;
  height: 150px;
  background: #f8f8f8;
  border-radius: 6px;
  overflow: hidden;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.product-image img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

/* Product Info */
.product-info {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.product-name {
  font-size: 13px;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0 0 8px 0;
  line-height: 1.3;
  min-height: 32px;
}

/* Rating */
.product-rating {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  font-size: 12px;
}

.stars {
  color: #ffc300;
  font-weight: 600;
}

.weight {
  color: #999;
}

/* Price */
.product-price {
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.price {
  font-size: 16px;
  font-weight: 700;
  color: #1a1a1a;
}

.original-price {
  font-size: 12px;
  color: #999;
  text-decoration: line-through;
}

/* Actions */
.product-actions {
  display: flex;
  gap: 8px;
  margin-top: auto;
}

.quantity-selector {
  display: flex;
  border: 1px solid #e8e8e8;
  border-radius: 4px;
  align-items: center;
  flex: 1;
}

.qty-btn {
  background: none;
  border: none;
  padding: 4px 8px;
  cursor: pointer;
  font-size: 14px;
  color: #666;
  transition: color 0.2s;
}

.qty-btn:hover {
  color: #1a1a1a;
}

.qty-input {
  flex: 1;
  border: none;
  text-align: center;
  font-size: 12px;
  padding: 4px 0;
  width: 30px;
}

.qty-input:focus {
  outline: none;
}

.add-to-cart-btn {
  background: #48d597;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 4px;
  font-weight: 600;
  font-size: 12px;
  cursor: pointer;
  transition: background 0.3s;
}

.add-to-cart-btn:hover {
  background: #2ec47a;
}

.add-to-cart-btn:active {
  transform: scale(0.98);
}

@media (max-width: 1400px) {
  .products-grid {
    grid-template-columns: repeat(5, 1fr);
  }
}

@media (max-width: 1200px) {
  .products-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media (max-width: 900px) {
  .products-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 600px) {
  .products-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
    padding: 12px;
  }

  .section-header {
    flex-direction: column;
    gap: 16px;
    align-items: flex-start;
  }

  .section-title {
    font-size: 22px;
  }
}
</style>
