<template>
  <div class="promo-banner-card" :style="{ backgroundColor: color }">
    <!-- NEW: content-area holds text/button and sits above the background image -->
    <div class="content-area">
      <div class="text-and-button-area">
        <!-- text slot with fallback to title prop -->
        <slot name="text">
          <div class="default-text">
            <h3 class="promo-title">{{ title }}</h3>
          </div>
        </slot>

        <!-- button slot with fallback button that uses buttonColor and handleShopNow -->
        <slot name="button" :onShopNow="handleShopNow">
          <button class="shop-btn" :style="{ backgroundColor: buttonColor }" @click="handleShopNow">
            Shop Now
          </button>
        </slot>
      </div>
    </div>

    <!-- image-area is now positioned behind the content -->
    <div class="image-area" aria-hidden="true">
      <!-- image slot with fallback to image prop -->
      <slot name="image">
        <img :src="image" alt="" class="banner-img" />
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    // replaced single heading prop with structured promotion props
    title: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      default: '#F0E9D7',
    },
    image: {
      type: String,
      default: '../assets/images/onion.jpg',
    },
    buttonColor: {
      type: String,
      default: '#42B678',
    },
    url: {
      type: String,
      default: '',
    },
  },
  methods: {
    handleShopNow() {
      alert(`Let's shop: ${this.title}`)
      // If url is provided, optionally navigate after alert
      if (this.url) {
        // setTimeout allows alert to display before navigation
        setTimeout(() => {
          window.location.href = this.url
        }, 300)
      }
    },
  },
}
</script>

<style scoped>
.promo-banner-card {
  max-width: 100%;
  padding: 40px 25px;
  border-radius: 10px;
  border: 3px solid #f0f0f0;
  transition: all 0.3s;
  cursor: pointer;

  /* Layout: keep content flow but enable absolute image */
  position: relative; /* NEW: container for absolutely positioned image */
  overflow: hidden;
  height: 250px; /* ...existing value... */
  display: flex;
  align-items: center;
}

/* Hover state (unchanged) */
.promo-banner-card:hover {
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  border-color: #d42d0f;
}

/* Content area sits on top of the image */
.content-area {
  position: relative;
  z-index: 2; /* ensures text and button appear above the image */
  width: 80%; /* control how much space the text occupies */
  pointer-events: auto;
}

/* Tweak text area spacing (moved inside content-area) */
.text-and-button-area {
  max-width: 100%;
  padding-right: 15px;
  font-size: 13px; /* overall smaller text */
  line-height: 1.3;
}

/* Image area sits behind content and covers the right side */
.image-area {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: 50%; /* covers the right half by default */
  display: flex;
  justify-content: center;
  align-items: flex-end; /* keep image anchored bottom-right */
  z-index: 1;
}

/* Ensure the slotted image fills area nicely */
.image-area :deep(.banner-img) {
  width: auto;
  max-width: 120%;
  max-height: 100%;
  height: auto;
  display: block;
  object-fit: contain;
  align-self: flex-end;
}

/* Small devices: stack content and image, make image visible and remove absolute positioning */
@media (max-width: 600px) {
  .promo-banner-card {
    flex-direction: column;
    text-align: center;
    height: auto;
    padding: 24px;
  }
  .content-area {
    width: 100%;
    z-index: 2;
  }
  .image-area {
    position: relative; /* stack under content */
    width: 60%;
    margin: 0 auto;
    opacity: 1; /* higher visibility on mobile */
    justify-content: center;
    align-items: center;
    padding-top: 10px;
  }
  .image-area :deep(.banner-img) {
    max-height: 140px;
    max-width: 100%;
    align-self: center;
  }
}

/* minimal styles for fallback title and button */
.promo-title {
  margin: 0 0 8px 0;
  font-size: 18px;
  color: #222;
}

.shop-btn {
  border: none;
  color: #fff;
  padding: 10px 14px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 13px;
}
</style>
