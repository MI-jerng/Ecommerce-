<template>
  <header class="menu-header">
    <div class="menu-container">
      <!-- Logo -->
      <div class="logo">
        <span class="logo-icon">🛒</span>
        <span class="logo-text">Fresh Market</span>
      </div>

      <!-- Navigation Links -->
      <nav class="nav-links">
        <router-link to="/" class="nav-link active">Home</router-link>
        <router-link to="/shop" class="nav-link">Shop</router-link>
        <router-link to="/deals" class="nav-link">Deals</router-link>
        <router-link to="/about" class="nav-link">About</router-link>
        <router-link to="/contact" class="nav-link">Contact</router-link>
      </nav>
    </div>

    <!-- Mobile Menu Toggle -->
    <button class="mobile-toggle" @click="toggleMobileMenu">
      <span class="menu-icon">☰</span>
    </button>

    <!-- Mobile Menu -->
    <div v-if="mobileMenuOpen" class="mobile-menu">
      <router-link to="/" class="mobile-link">Home</router-link>
      <router-link to="/shop" class="mobile-link">Shop</router-link>
      <router-link to="/deals" class="mobile-link">Deals</router-link>
      <router-link to="/about" class="mobile-link">About</router-link>
      <router-link to="/contact" class="mobile-link">Contact</router-link>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const mobileMenuOpen = ref(false)

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}
</script>

<style scoped>
.menu-header {
  background: white;
  border-bottom: 1px solid #f0f0f0;
  position: sticky;
  top: 0;
  z-index: 100;
  width: 100%;
}

.menu-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 20px;
  gap: 20px;
  max-width: 100%;
}

/* Logo */
.logo {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  text-decoration: none;
  white-space: nowrap;
  flex-shrink: 0;
}

.logo-icon {
  font-size: 24px;
}

.logo-text {
  font-size: 20px;
  font-weight: 700;
  color: #1a1a1a;
}

/* Navigation Links */
.nav-links {
  display: flex;
  gap: 24px;
  margin-left: auto;
}

.nav-link {
  text-decoration: none;
  color: #666;
  font-weight: 500;
  font-size: 14px;
  transition: color 0.3s;
  border-bottom: 2px solid transparent;
  padding-bottom: 4px;
}

.nav-link:hover,
.nav-link.active {
  color: #48d597;
  border-bottom-color: #48d597;
}

/* Menu Actions */
.menu-actions {
  display: flex;
  gap: 12px;
  flex-shrink: 0;
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  background: none;
  border: 1px solid #e8e8e8;
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s;
  font-size: 13px;
  color: #666;
  font-weight: 500;
  position: relative;
}

.action-btn:hover {
  border-color: #48d597;
  color: #48d597;
}

.icon {
  font-size: 16px;
}

.label {
  display: none;
}

.cart-badge {
  position: absolute;
  top: -8px;
  right: -8px;
  background: #ff6b6b;
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: 700;
}

/* Mobile Toggle */
.mobile-toggle {
  display: none;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  padding: 8px;
}

.mobile-menu {
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border-bottom: 1px solid #f0f0f0;
  flex-direction: column;
}

.mobile-link {
  padding: 12px 20px;
  text-decoration: none;
  color: #666;
  border-bottom: 1px solid #f0f0f0;
  font-weight: 500;
}

.mobile-link:hover {
  background: #f5f5f5;
  color: #48d597;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .nav-links {
    display: none;
  }

  .label {
    display: inline;
  }
}

@media (max-width: 768px) {
  .menu-container {
    padding: 10px 12px;
    gap: 8px;
  }

  .logo-text {
    display: none;
  }

  .mobile-toggle {
    display: block;
  }

  .mobile-menu {
    display: flex;
  }

  .action-btn {
    padding: 6px 8px;
  }

  .label {
    display: none;
  }
}
</style>
