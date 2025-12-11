<template>
  <div class="searchbox">
    <div class="container">
      <div class="brand">
        <span class="logo">🛒</span>
        <span class="name">Fresh Market</span>
      </div>
      <button class="category-btn">
        <span>All Categories</span>
        <span class="chev">▾</span>
      </button>
      <div class="search-field">
        <input
          v-model="query"
          type="text"
          class="input"
          placeholder="Search for items"
          @keyup.enter="onSearch"
        />
        <button class="go" @click="onSearch">🔍</button>
      </div>
      <div class="support">
        <div class="phone">1900 - 8888</div>
        <div class="sub">24/7 Support Center</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const query = ref('')
const onSearch = () => {
  if (query.value.trim()) {
    alert(`Searching for: ${query.value}`)
  }
}
</script>

<style scoped>
.searchbox {
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #f0f0f0;
}
.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 12px 20px;
  display: grid;
  grid-template-columns: auto auto 1fr auto;
  gap: 16px;
  align-items: center;
}
.brand {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  white-space: nowrap;
}
.brand .logo {
  font-size: 26px;
}
.brand .name {
  font-size: 20px;
  font-weight: 800;
  color: #1a1a1a;
}
.category-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: #f5f5f5;
  border: 1px solid #e8e8e8;
  padding: 10px 14px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
}
.search-field {
  display: flex;
  align-items: center;
  background: #f5f5f5;
  border-radius: 24px;
  padding: 4px;
}
.input {
  flex: 1;
  padding: 10px 12px;
  border: none;
  outline: none;
  background: transparent;
}
.go {
  background: #48d597;
  color: #fff;
  border: none;
  border-radius: 20px;
  padding: 8px 14px;
  cursor: pointer;
}
.support {
  text-align: right;
}
.support .phone {
  font-weight: 800;
  color: #1a1a1a;
}
.support .sub {
  font-size: 12px;
  color: #888;
}

@media (max-width: 900px) {
  .container {
    grid-template-columns: 1fr;
    gap: 10px;
  }
  .support {
    text-align: left;
  }
}
</style>
