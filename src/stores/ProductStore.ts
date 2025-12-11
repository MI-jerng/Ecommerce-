import { defineStore } from 'pinia'

export const useProductStore = defineStore('product', {
  state: () => ({
    groups: [
      { id: 1, name: 'Meat' },
      { id: 2, name: 'Vegetable' },
      { id: 3, name: 'Fruit' },
    ],
    categories: [
      {
        id: 1,
        name: 'Burger',
        productCount: 14,
        color: '#F2FCE4',
        image: 'uploads\\category\\1763129634591-606724412-Burger.png',
      },
      {
        id: 2,
        name: 'Peach',
        productCount: 17,
        color: '#FFFCEB',
        image: 'uploads\\category\\1763109802772-697931319-Peach.png',
      },
      {
        id: 3,
        name: 'Organic Kiwi',
        productCount: 23,
        color: '#ECFFEC',
        image: 'uploads\\category\\1763109904200-40794495-Kiwi.png',
      },
      {
        id: 4,
        name: 'Red Apple',
        productCount: 68,
        color: '#FEEFEA',
        image: 'uploads\\category\\1763109952970-361339201-Apple.png',
      },
      {
        id: 5,
        name: 'Snack',
        productCount: 34,
        color: '#FFF3EB',
        image: 'uploads\\category\\1763109993089-106131471-snack.png',
      },
      {
        id: 6,
        name: 'Black plum',
        productCount: 29,
        color: '#FFF3FF',
        image: 'uploads\\category\\1763110035114-402997390-Black-plum.png',
      },
      {
        id: 7,
        name: 'Vegetables',
        productCount: 15,
        color: '#F2FCE4',
        image: 'uploads\\category\\1763110072943-467726713-Vegetable.png',
      },
      {
        id: 8,
        name: 'Headphone',
        productCount: 18,
        color: '#FFFCEB',
        image: 'uploads\\category\\1763110102087-25083791-Headphone.png',
      },
      {
        id: 9,
        name: 'Cake & Milk',
        productCount: 34,
        color: '#F2FCE4',
        image: 'uploads\\category\\1763110131302-211610351-Cake&Milk.png',
      },
      {
        id: 10,
        name: 'Orange',
        productCount: 63,
        color: '#FFF3FF',
        image: 'uploads\\category\\1763110157617-285480198-Orange.png',
      },
    ],
    promotions: [
      {
        id: 1,
        title: 'Everyday Fresh and Clean with Our Products',
        color: '#F0E9D7',
        image: 'uploads\\promotion\\1763129634591-onion.jpg',
        imageAlt: 'Fresh Onions',
        buttonColor: '#42B678',
        url: '/promotions/1',
        class: 'banner-onions',
      },
      {
        id: 2,
        title: 'Make your Breakfast Healthy and Easy',
        color: '#F2E8E9',
        image: 'uploads\\promotion\\1763109802772-strawberry_juice.jpg',
        imageAlt: 'Breakfast Products',
        buttonColor: '#42B678',
        url: '/promotions/2',
        class: 'banner-breakfast',
      },
      {
        id: 3,
        title: 'The best Organic Products Online',
        color: '#E6EAF3',
        image: 'uploads\\promotion\\1763110072943-vegetable.jpg',
        imageAlt: 'Organic Products',
        buttonColor: '#FBC040',
        url: '/promotions/3',
        class: 'banner-organic',
      },
      {
        id: 3,
        title: 'Organic Products',
        color: '#e7eaf3',
        image: '/images/BacketOfVegetable.png',
        imageAlt: 'Organic Products Banner',
        buttonColor: '#42B678',
        url: '/',
        class: 'banner-organic',
      },
    ],
    products: [
      {
        id: 1,
        name: 'Seeds of Change Organic Quinoa, Brown, & Red Rice',
        rating: 4.5,
        size: 'Medium',
        image: '/images/productA.png',
        price: 1.99,
        promotionAsPercentage: 0,
        categoryId: 1,
        instock: true,
        countSold: 150,
        group: 1,
      },
      {
        id: 2,
        name: 'All Natural Italian-Style Chicken Meatballs',
        rating: 4.2,
        size: 'Large',
        image: '/images/productB.png',
        price: 5.99,
        promotionAsPercentage: 10,
        categoryId: 3,
        instock: true,
        countSold: 200,
        group: 1,
      },
      {
        id: 3,
        name: 'Angie’s Boomchickapop Sweet & Salty Kettle Corn',
        rating: 4.8,
        size: 'One Size',
        image: '/images/productC.png',
        price: 49.99,
        promotionAsPercentage: 15,
        categoryId: 5,
        instock: false,
        countSold: 50,
        group: 2,
      },
      {
        id: 4,
        name: 'Foster Farms Takeout Crispy Classic Buffalo Wings',
        rating: 4.0,
        size: 'Small',
        image: '/images/productD.png',
        price: 2.49,
        promotionAsPercentage: 5,
        categoryId: 1,
        instock: true,
        countSold: 80,
        group: 1,
      },
      {
        id: 5,
        name: 'Blue Diamond Almonds Lightly Salted Vegetables',
        rating: 4.3,
        size: 'Medium',
        image: '/images/productE.png',
        price: 1.49,
        promotionAsPercentage: 0,
        categoryId: 1,
        instock: true,
        countSold: 120,
        group: 1,
      },
      {
        id: 6,
        name: 'Chobani Complete Vanilla Greek Yogurt',
        rating: 4.6,
        size: 'Large',
        image: '/images/productF.png',
        price: 2.99,
        promotionAsPercentage: 8,
        categoryId: 1,
        instock: true,
        countSold: 90,
        group: 1,
      },
      {
        id: 7,
        name: 'Canada Dry Ginger Ale – 2 L Bottle - 200ml - 400g',
        rating: 4.1,
        size: '500ml',
        image: '/images/productG.png',
        price: 3.49,
        promotionAsPercentage: 12,
        categoryId: 4,
        instock: true,
        countSold: 60,
        group: 1,
      },
      {
        id: 8,
        name: 'Encore Seafoods Stuffed Alaskan Salmon',
        rating: 4.4,
        size: 'Medium',
        image: '/images/productH.png',
        price: 2.79,
        promotionAsPercentage: 0,
        categoryId: 1,
        instock: false,
        countSold: 30,
        group: 1,
      },
      {
        id: 9,
        name: 'Gorton’s Beer Battered Fish Fillets with soft paper',
        rating: 4.4,
        size: 'Medium',
        image: '/images/productI.png',
        price: 2.79,
        promotionAsPercentage: 0,
        categoryId: 1,
        instock: false,
        countSold: 30,
        group: 1,
      },
      {
        id: 10,
        name: 'Haagen-Dazs Caramel Cone Ice Cream Ketchup',
        rating: 4.4,
        size: 'Medium',
        image: '/images/productJ.png',
        price: 2.79,
        promotionAsPercentage: 0,
        categoryId: 1,
        instock: false,
        countSold: 30,
        group: 1,
      },
    ],
  }),
  getters: {
    // Get categories by group name
    getCategoriesByGroup: (state) => {
      return (groupId: number) => {
        return state.categories.filter((category: any) => category.group === groupId)
      }
    },

    // Get products by group name
    getProductsByGroup: (state) => {
      return (groupId: number) => {
        return state.products.filter((product) => product.group === groupId)
      }
    },

    // Get products by category ID
    getProductsByCategory: (state) => {
      return (categoryId: number) => {
        return state.products.filter((product) => product.categoryId === categoryId)
      }
    },

    // Get popular products (countSold > 10)
    getPopularProducts: (state) => {
      return state.products.filter((product) => product.countSold > 10)
    },

    // Get total product count
    getTotalProducts: (state) => {
      return state.products.length
    },

    // Get in-stock products
    getInStockProducts: (state) => {
      return state.products.filter((product) => product.instock === true)
    },

    // Get products by name (search)
    getProductsByName: (state) => {
      return (name: string) => {
        return state.products.filter((product) =>
          product.name.toLowerCase().includes(name.toLowerCase()),
        )
      }
    },
  },
  actions: {
    setGroups(groups: any[]) {
      this.groups = groups
    },
    setCategories(categories: any[]) {
      this.categories = categories
    },
    setPromotions(promotions: any[]) {
      this.promotions = promotions
    },
    setProducts(products: any[]) {
      this.products = products
    },
  },
})
