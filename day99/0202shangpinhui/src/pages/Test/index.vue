html
<template>
  <div class="carousel">
    <div class="carousel-slide" :style="{ transform: `translateX(-${currentIndex * 100}%)` }">
<div v-for="(item, index) in items" :key="index" class="carousel-item">
  <img :src="item.image" alt="">
  <h2>{{ item.title }}</h2>
  <p>{{ item.description }}</p>
</div>
    </div>
    <div class="carousel-dots">
      <span v-for="(item, index) in items" :key="index" class="carousel-dot" :class="{ active: currentIndex === index }" @click="goTo(index)"></span>
    </div>
    <button class="carousel-prev" @click="prev">&lt;</button>
    <button class="carousel-next" @click="next">&gt;</button>
  </div>
</template>
 <script>
export default {
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
        items: [
  {
    image: 'https://example.com/image1.jpg',
    title: 'Title 1',
    description: 'Description 1'
  },
  {
    image: 'https://example.com/image2.jpg',
    title: 'Title 2',
    description: 'Description 2'
  },
  // ...
]
    };
  },
  methods: {
    goTo(index) {
      this.currentIndex = index;
    },
    prev() {
      this.currentIndex = (this.currentIndex - 1 + this.items.length) % this.items.length;
    },
    next() {
      this.currentIndex = (this.currentIndex + 1) % this.items.length;
    },
  },
};
</script>
 <style>
.carousel {
  position: relative;
  width: 100%;
  height: 300px;
  overflow: hidden;
}
.carousel-slide {
  display: flex;
  width: 100%;
  height: 100%;
  transition: transform 0.3s ease-in-out;
}
.carousel-item {
  flex: 1;
  padding: 20px;
}
.carousel-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.carousel-dots {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
  align-items: center;
}
.carousel-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #ccc;
  margin: 0 5px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
}
.carousel-dot.active {
  background-color: #333;
}
.carousel-prev,
.carousel-next {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.5);
  color: #fff;
  font-size: 30px;
  text-align: center;
  line-height: 50px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
}
.carousel-prev:hover,
.carousel-next:hover {
  background-color: rgba(0, 0, 0, 0.8);
}
.carousel-prev {
  left: 20px;
}
.carousel-next {
  right: 20px;
}
</style>