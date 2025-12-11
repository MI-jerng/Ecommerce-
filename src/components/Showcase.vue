<template>
  <section class="showcase" :style="{ backgroundColor: bg }">
    <div class="container">
      <div class="text">
        <h1 class="title">Don't miss amazing grocery deals</h1>
        <p class="subtitle">Sign up for the daily newsletter</p>
        <div class="subscribe">
          <input type="email" class="email" placeholder="Your email address" v-model="email" />
          <button class="cta" @click="subscribe">Subscribe</button>
        </div>
      </div>
      <div class="art">
        <img :src="image" alt="Showcase" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'

defineProps<{ image?: string; bg?: string }>()

const email = ref('')
const subscribe = () => {
  if (email.value) alert(`Subscribed: ${email.value}`)
}
</script>

<style scoped>
.showcase {
  width: 100%;
}
.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 24px 20px;
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 24px;
  align-items: center;
}
.title {
  font-size: 40px;
  line-height: 1.1;
  font-weight: 800;
  color: #1a1a1a;
  margin: 0 0 10px 0;
}
.subtitle {
  color: #777;
  margin: 0 0 18px 0;
}
.subscribe {
  display: flex;
  background: #fff;
  border: 1px solid #e8e8e8;
  border-radius: 30px;
  padding: 6px;
  max-width: 420px;
}
.email {
  flex: 1;
  border: none;
  outline: none;
  padding: 10px 14px;
  border-radius: 24px;
}
.cta {
  background: #48d597;
  color: #fff;
  border: none;
  border-radius: 24px;
  padding: 10px 16px;
  font-weight: 700;
  cursor: pointer;
}
.art img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
@media (max-width: 900px) {
  .container {
    grid-template-columns: 1fr;
  }
}
</style>
