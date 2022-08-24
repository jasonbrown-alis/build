<template>
  <div class="welcome-container">
    <h1>alis<span class="page-title-dot">.</span>build</h1>
    <h5>Build better, iterate quicker, scale simpler.</h5>
    <a href="http://build.alisx.com/getting-started/introduction.html">
      Get Started →
    </a>
  </div>
</template>

<script>
export default {
  name: "HeroLayout",
};
</script>

<style scoped>
a {
  text-decoration: none;
  cursor: pointer;
  color: black;
  font-size: 20px;
  font-weight: 200;
}

h1 {
  font-size: 96px;
  font-weight: 300;
  margin-bottom: 10px;
  color: #8d8d8d;
}

h5 {
  font-size: 24px;
  font-weight: 100;
}

@media (max-width: 600px) {
  h1 {
    font-size: 48px;
  }
  h5 {
    font-size: 16px;
  }
  a {
    font-size: 14px;
  }
}

.page-title-dot {
  color: #cf0000;
}

.welcome-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  height: 100vh;
  width: 100%;
}
</style>
