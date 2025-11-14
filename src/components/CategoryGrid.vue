<template>
  <section class="category-grid-container">
    <div class="categories-wrapper">
      <div
        v-for="category in categories"
        :key="category.name"
        class="category-item"
        :style="{ backgroundColor: category.color }"
      >
        <div class="icon-box">
          <img :src="category.image" :alt="category.name" class="category-icon" />
        </div>
        <p class="category-name">{{ category.name }}</p>
        <p class="item-count">{{ category.productCount }} items</p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  categories: Array<{
    name: string;
    productCount: number;
    image: string;
    color: string;
  }>;
}>();
</script>

<style scoped>
.category-grid-container {
  padding: 30px 0;
}
.categories-wrapper {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: 20px;
  max-width: 1500px;
  margin: 0 auto;
}

/* 1. Styling for the individual card (gets the dynamic background color) */
.category-item {
  text-align: center;
  padding: 10px 5px;
  /* Background color is dynamic via :style binding */
  border: 3px solid #f0f0f0;
  border-radius: 10px;
  transition: all 0.3s;
  cursor: pointer;
  height: 150px;
  width: 110px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

}
.category-item:hover {
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
    border-color: #d42d0f;
}

/* 2. Styling for the icon box (The inner WHITE circle) */
.icon-box {
  display: flex;
  justify-content: center;
    align-items: center;
    width: 100px;
    height: 100px;
    border-radius: 20%;
    margin: 0 auto 15px;
    overflow: hidden;
}

.category-icon {
    /* Scale image to fit inside the white circle */
    max-width: 130%;
    max-height: 130%;
    object-fit: contain;
}

/* 3. Text Styling */
.category-name {
    font-size: 1em;
    font-weight: 700;
    color: #333;
    margin-bottom: 3px;
    line-height: 1.2;
}

.item-count {
    font-size: 0.8em;
    color: #777;
    margin-top: 5px;
}
</style>
