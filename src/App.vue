<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'
import PromoBanner from './components/promoBanner.vue'
import CategoryGrid from './components/CategoryGrid.vue'

const categories = ref([
  {
    name: 'Burger',
    productCount: 14,
    color: '#F2FCE4',
    image: '/images/Burger.png',
  },
  {
    name: 'Peach',
    productCount: 17,
    color: '#FFFCEB',
    image: '/images/Peach.png',
  },
  {
    name: 'Organic Kiwi',
    productCount: 23,
    color: '#ECFFEC',
    image: '/images/Kiwi.png',
  },
  {
    name: 'Red Apple',
    productCount: 68,
    color: '#FEEFEA',
    image: '/images/Apple.png',
  },
  {
    name: 'Snack',
    productCount: 34,
    color: '#FFF3EB',
    image: '/images/snack.png',
  },
  {
    name: 'Black plum',
    productCount: 29,
    color: '#FFF3FF',
    image: '/images/Black-plum.png',
  },
  {
    name: 'Vegetables',
    productCount: 15,
    color: '#F2FCE4',
    image: '/images/Vegetable.png',
  },
  {
    name: 'Headphone',
    productCount: 18,
    color: '#FFFCEB',
    image: '/images/Headphone.png',
  },
  {
    name: 'Cake & Milk',
    productCount: 34,
    color: '#F2FCE4',
    image: '/images/Cake&Milk.png',
  },
  {
    name: 'Orange',
    productCount: 63,
    color: '#FFF3FF',
    image: '/images/Orange.png',
  },
])

// Default local banners (used as fallback or to provide images when API doesn't)
const defaultBanners = [
  {
    id: 1,
    title: 'Everyday Fresh & Clean with Our Products',
    color: '#F0E8D5',
    image: '/images/Onion-Banner.png',
    imageAlt: 'Fresh Onions',
    buttonColor: '#42B678',
    url: '/promotions/1',
    class: 'banner-onions',
  },
  {
    id: 2,
    title: 'Make your Breakfast Healthy and Easy',
    color: '#F3E8E8',
    image: '/images/StrawberryMilk.png',
    imageAlt: 'Breakfast Products',
    buttonColor: '#42B678',
    url: '/promotions/2',
    class: 'banner-breakfast',
  },
  {
    id: 3,
    title: 'The best Organic Products Online',
    color: '#E7EAF3',
    image: '/images/BacketOfVegetable.png',
    imageAlt: 'Organic Products',
    buttonColor: '#FBC040',
    url: '/promotions/3',
    class: 'banner-organic',
  },
]

// start with local defaults so UI shows something immediately
const banners = ref([...defaultBanners])

// helper to test whether API provided a usable image
const isValidImagePath = (val: any) => {
  if (!val) return false
  if (typeof val !== 'string') return false
  const v = val.trim()
  return (
    v.startsWith('/') ||
    v.startsWith('http://') ||
    v.startsWith('https://') ||
    v.startsWith('data:')
  )
}

// Fetch promotions/banners from API (improved mapping & fallback)
const fetchPromotions = async () => {
  try {
    console.log('🔄 Fetching promotions from API...')
    const response = await axios.get('http://localhost:3000/api/promotions')
    console.log('✅ Promotions fetched successfully:', response.data)

    // unwrap possible wrappers
    let dataArray = response.data
    if (!Array.isArray(dataArray)) {
      dataArray = response.data?.data || response.data?.promotions || []
    }

    if (!Array.isArray(dataArray) || dataArray.length === 0) {
      console.warn(
        '⚠️ Promotions API returned empty or unexpected structure; keeping local defaults',
      )
      return
    }

    // map API items to the shape expected by PromoBanner, providing image fallback
    const mapped = dataArray.map((promo: any) => {
      // choose image: API image if valid, else try to find default by id or title, else placeholder
      let imagePath = null
      if (
        isValidImagePath(promo.image) ||
        isValidImagePath(promo.imageUrl) ||
        isValidImagePath(promo.photo)
      ) {
        imagePath = promo.image || promo.imageUrl || promo.photo
        console.log(`✅ Using API image for promotion "${promo.title || promo.id}":`, imagePath)
      } else {
        // try to find a matching default banner by id or title
        const match = defaultBanners.find(
          (b) => (promo.id && b.id === promo.id) || (promo.title && b.title === promo.title),
        )
        if (match) {
          imagePath = match.image
          console.log(
            `ℹ️ No API image for "${promo.title || promo.id}", using local default image:`,
            imagePath,
          )
        } else {
          imagePath = '/images/default-banner.png' // ensure this file exists in /public/images or point to a valid placeholder
          console.log(
            `⚠️ No image found for "${promo.title || promo.id}", using placeholder:`,
            imagePath,
          )
        }
      }

      return {
        id: promo.id,
        title: promo.title || promo.name || 'Promotion',
        color: promo.color || promo.backgroundColor || '#FFFFFF',
        image: imagePath,
        imageAlt: promo.imageAlt || promo.alt || promo.title || '',
        buttonColor: promo.buttonColor || promo.button_color || '#42B678',
        url: promo.url || promo.link || '/',
        class: promo.class || 'banner-default',
      }
    })

    banners.value = mapped
    console.log('✨ Final mapped promotions:', banners.value)
  } catch (error: any) {
    console.error('❌ Error fetching promotions:', error)
    console.warn('🔄 Using fallback local banners data')
    // keep existing banners (defaults)
  }
}

// Fetch categories from API
const fetchCategories = async () => {
  try {
    console.log('🔄 Fetching categories from API...')
    const response = await axios.get('http://localhost:3000/api/categories')
    console.log('✅ Categories fetched successfully:', response.data)

    // Update categories with API response
    if (response.data && Array.isArray(response.data)) {
      categories.value = response.data
    }
  } catch (error) {
    console.error('❌ Error fetching categories:', error)
    console.warn('🔄 Using fallback local categories data')
    // Keep local categories as fallback
  }
}

// Call fetch methods on component mount
onMounted(() => {
  fetchCategories()
  fetchPromotions()
})
</script>

<template>
  <div class="home-page-container">
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
  </div>
</template>

<style scoped>
/* Layout and Container Styles (omitted for brevity) */
.home-page-container {
  padding-top: 20px;
}
.banner-group {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  max-width: 1200px;
  margin: 30px auto;
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
