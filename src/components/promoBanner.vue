<template>
  <div class="promo-banner-card">
    <!-- NEW: content-area holds text/button and sits above the background image -->
    <div class="content-area">
      <div class="text-and-button-area">
        <slot name="text"></slot>
        <slot name="button" :onShopNow="handleShopNow"></slot>
      </div>
    </div>

    <!-- image-area is now positioned behind the content -->
    <div class="image-area" aria-hidden="true">
      <slot name="image"></slot>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    heading: {
      type: String,
      required: true
    }
  },
  methods: {
    handleShopNow() {
      alert(`Let's shop ${this.heading}`);
    }
  }
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
</style>
