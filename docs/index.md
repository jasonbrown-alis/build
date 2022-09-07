---
layout: home
---

<div class="home-container">
  <div class="home-splash">
    <img class="home-splash" src="/logo.svg">
  </div>
  <div class="break"></div>
  <a class="home-get-started" href="/guides/getting-started/introduction.html">
    GET STARTED
  </a>
</div>


<style lang="css">
.home-container{
  display: flex;
  flex-wrap: wrap;
  margin-top: var(--vp-nav-height);
  align-content: center;
  justify-items: center;
  justify-content: center;
}

.break {
  flex-basis: 100%;
  height: 0;
}

.home-splash{
  max-height: 210px;
  width: 100%;
}

.home-get-started{
  text-align: center;
  max-width: 200px;
  margin-top: 36px;
  padding: 8px 24px 8px 24px;
  background-color: var(--vp-c-brand);
  border-radius: 30px;
  color: white;
}
</style>
