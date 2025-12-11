<template>
  <div class="menuitem">
    <div class="container">
      <button class="browse">Browse All Categories</button>
      <nav class="nav">
        <a href="#" class="link active">Vegetables</a>
        <a href="#" class="link">Drink</a>
        <a href="#" class="link">Cookies</a>
        <a href="#" class="link">Meat & Seafood</a>
        <a href="#" class="link">Bakery</a>
      </nav>
    </div>
  </div>
</template>

<script setup lang="ts">
// Pure presentational component
</script>

<style scoped>
.menuitem {
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #f0f0f0;
}
.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 10px 20px;
  display: flex;
  align-items: center;
  gap: 20px;
}
.browse {
  background: #48d597;
  color: #fff;
  border: none;
  padding: 10px 14px;
  border-radius: 6px;
  font-weight: 700;
  cursor: pointer;
}
.nav {
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
}
.link {
  text-decoration: none;
  color: #666;
  font-weight: 600;
  border-bottom: 2px solid transparent;
  padding-bottom: 4px;
}
.link:hover,
.link.active {
  color: #48d597;
  border-bottom-color: #48d597;
}
@media (max-width: 900px) {
  .container {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
