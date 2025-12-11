<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'
import Menu from './components/Menu.vue'
import Searchbox from './components/Searchbox.vue'
import MenuItem from './components/MenuItem.vue'
import Showcase from './components/Showcase.vue'
import PromoBanner from './components/promoBanner.vue'
import CategoryGrid from './components/CategoryGrid.vue'
import Product from './components/Product.vue'
import { useProductStore } from './stores/ProductStore'

const productStore = useProductStore()

// State for filtering
const currentGroupId = ref(1)

// Use store data - categories and promotions are now in the store with API data
const categories = ref(productStore.categories)
const banners = ref(productStore.promotions)

// Computed properties using store getters
const popularProducts = computed(() => productStore.getPopularProducts)
const categoriesByGroup = computed(() => productStore.getCategoriesByGroup(currentGroupId.value))
const productsByGroup = computed(() => productStore.getProductsByGroup(currentGroupId.value))
const inStockProducts = computed(() => productStore.getInStockProducts)
const totalProducts = computed(() => productStore.getTotalProducts)

// Featured product for detail view (first popular product)
const featuredProduct = computed(() => {
  return productStore.getPopularProducts[0] || null
})

// Helper to fix image paths from API (convert backslashes and ensure full URL)
const fixImagePath = (imagePath: string): string => {
  if (!imagePath) return ''

  // If it's already an absolute URL or public path, return as-is
  if (
    imagePath.startsWith('http://') ||
    imagePath.startsWith('https://') ||
    imagePath.startsWith('/')
  ) {
    return imagePath
  }

  // Fix backslashes to forward slashes and prepend API base URL
  const fixedPath = imagePath.replace(/\\/g, '/')
  return `http://localhost:3000/${fixedPath}`
}

// Fetch categories from API and update store
const fetchCategories = async () => {
  try {
    console.log('🔄 Fetching categories from API...')
    const response = await axios.get('http://localhost:3000/api/categories')
    console.log('✅ Categories fetched:', response.data)

    if (response.data && Array.isArray(response.data)) {
      // Map categories and fix image paths
      const mappedCategories = response.data.map((cat: any) => ({
        ...cat,
        image: fixImagePath(cat.image),
      }))
      console.log('📦 Updated categories:', mappedCategories)
      categories.value = mappedCategories
    }
  } catch (error: any) {
    console.error('❌ Error fetching categories:', error.message)
    console.log('🔄 Using store default categories')
  }
}

// Fetch promotions from API and update store
const fetchPromotions = async () => {
  try {
    console.log('🔄 Fetching promotions from API...')
    const response = await axios.get('http://localhost:3000/api/promotions')
    console.log('✅ Promotions fetched:', response.data)

    if (response.data && Array.isArray(response.data)) {
      // Map promotions and fix image paths
      const mappedPromotions = response.data.map((promo: any) => ({
        ...promo,
        image: fixImagePath(promo.image),
      }))
      console.log('📦 Updated promotions:', mappedPromotions)
      banners.value = mappedPromotions
    }
  } catch (error: any) {
    console.error('❌ Error fetching promotions:', error.message)
    console.log('🔄 Using store default promotions')
  }
}

// Fetch data on component mount
onMounted(() => {
  console.log('🚀 App mounted, fetching API data...')
  fetchCategories()
  fetchPromotions()
})
</script>

<template>
  <div class="app-wrapper">
    <!-- Menu Header -->
    <Menu />

    <!-- Search and Menu rows -->
    <Searchbox />
    <MenuItem />

    <!-- Showcase hero -->
    <Showcase image="/images/BacketOfVegetable.png" bg="#fdf4df" />

    <!-- Render each category individually -->
    <div class="category-list">
      <CategoryGrid :categories="categories" />
    </div>

    <section class="banner-group">
      <PromoBanner
        v-for="banner in banners"
        :key="banner.title"
        :class="banner.class"
        :title="banner.title"
        :color="banner.color"
        :image="banner.image"
        :buttonColor="banner.buttonColor"
        :url="banner.url"
      >
        <template #text>
          <h2 class="banner-heading">{{ banner.title }}</h2>
        </template>
        <template #button="{ onShopNow }">
          <a
            href="#"
            class="shop-btn"
            :style="{ backgroundColor: banner.buttonColor }"
            @click.prevent="onShopNow"
          >
            Shop Now <span class="arrow-svg-icon"></span>
          </a>
        </template>
        <template #image>
          <img :src="banner.image" :alt="banner.imageAlt" class="banner-img" />
        </template>
      </PromoBanner>
    </section>

    <!-- Featured Product Detail -->
    <section v-if="featuredProduct" class="featured-product-section">
      <Product />
    </section>
  </div>
</template>

<style scoped>
.app-wrapper {
  width: 100%;
  min-height: 100vh;
  background: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
}

.category-list {
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0;
  box-sizing: border-box;
}

.banner-group {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0;
  width: 100%;
  max-width: 1400px;
  height: auto;
  margin: 0 auto;
  padding: 0;
  box-sizing: border-box;
}

/* Featured Product Section */
.featured-product-section {
  width: 100%;
  max-width: 1400px;
  background: #f5f5f5;
  padding: 40px 0;
  margin: 0 auto;
}

/* Text and Heading Styling (omitted for brevity) */
.banner-heading {
  font-size: 1.8em;
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 20px;
  color: #333;
}

/* Custom Background Colors (omitted for brevity) */
.banner-onions {
  background-color: #f0e8d5;
}
.banner-breakfast {
  background-color: #f3e8e8;
}
.banner-organic {
  background-color: #e7eaf3;
}

/* Button Styling */
.shop-btn {
  display: inline-block;
  padding: 10px 18px;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  font-weight: 700;
  transition: background-color 0.3s;
  /* NEW: Enable flex to align the text and the arrow */
  display: inline-flex;
  align-items: center;
}

.shop-btn.green-btn {
  background-color: #49c470;
}

.shop-btn.orange-btn {
  background-color: #ffa500;
}

/* --- SVG Arrow Styling --- */
.arrow-svg-icon {
  /* Set dimensions for the SVG container */
  width: 18px;
  height: 18px;
  margin-left: 8px; /* Space between text and arrow */

  /* Inject the SVG using a background image and URL encoding */
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 640 640'%3E%3Cpath fill='%23ffffff' d='M566.6 342.6C579.1 330.1 579.1 309.8 566.6 297.3L406.6 137.3C394.1 124.8 373.8 124.8 361.3 137.3C348.8 149.8 348.8 170.1 361.3 182.6L466.7 288L96 288C78.3 288 64 302.3 64 320C64 337.7 78.3 352 96 352L466.7 352L361.3 457.4C348.8 469.9 348.8 490.2 361.3 502.7C373.8 515.2 394.1 515.2 406.6 502.7L566.6 342.7z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-size: contain;
}

/* Responsiveness (omitted for brevity) */
@media (max-width: 900px) {
  .banner-group {
    grid-template-columns: 1fr;
  }
}
</style>
