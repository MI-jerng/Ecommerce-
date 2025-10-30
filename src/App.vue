<script setup lang="ts">
import CategoryGrid from './components/CategoryGrid.vue';
import PromoBanner from './components/promoBanner.vue';
</script>

<template>
  <div class="home-page-container">
    <CategoryGrid />

    <section class="banner-group">

      <PromoBanner class="banner-onions">
        <template #text>
          <h2 class="banner-heading">Everyday Fresh & Clean with Our Products</h2>
        </template>
        <template #button>
          <a href="#" class="shop-btn green-btn">Shop Now <span class="arrow-svg-icon"></span></a>
        </template>
        <template #image>
          <img src="/images/Onion-Banner.png" alt="Fresh Onions" class="banner-img" />
        </template>
      </PromoBanner>

      <PromoBanner class="banner-breakfast">
        <template #text>
          <h2 class="banner-heading">Make your Breakfast Healthy and Easy</h2>
        </template>
        <template #button>
          <a href="#" class="shop-btn green-btn">Shop Now <span class="arrow-svg-icon"></span></a>
        </template>
        <template #image>
          <img src="/images/StrawberryMilk.png" alt="Breakfast Products" class="banner-img" />
        </template>
      </PromoBanner>

      <PromoBanner class="banner-organic">
        <template #text>
          <h2 class="banner-heading">The best Organic Products Online</h2>
        </template>
        <template #button>
          <a href="#" class="shop-btn orange-btn">Shop Now <span class="arrow-svg-icon"></span></a>
        </template>
        <template #image>
          <img src="/images/BacketOfVegetable.png" alt="Organic Products" class="banner-img" />
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
    background-color: #F0E8D5;
}
.banner-breakfast {
    background-color: #F3E8E8;
}
.banner-organic {
    background-color: #E7EAF3;
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
