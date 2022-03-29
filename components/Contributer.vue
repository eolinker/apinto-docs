<template>
  <div class="user-links-list">
    <div v-for="item in resourceInfo" v-bind:key="item.id" class="user-links-card-item">
        <div class="user-content">
            <a :href="item.html_url" class="item-icon-show">
                <img :src="item.avatar_url">
            </a>
            <p>
                <a :href="item.html_url">
                    {{ item.login }}
                </a>
            </p>
        </div>
    </div>
  </div>

</template>

<script>
export default {
  name: "home",
  data() {
    return {
      resourceInfo: [],
    };
  },
  methods: {
    getContributorResource() {
      fetch("https://api.github.com/repos/eolinker/apinto/contributors")
        .then((response) => response.json())
        .then((data) => {
            this.resourceInfo = data
        });
    },
  },
  mounted() {
    this.getContributorResource();
  },
};
</script>
<style lang="stylus" scoped>

.user-links-list {
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    flex-wrap: wrap;
}
.user-links-list .user-links-card-item {
    flex: 0 0 25%;
    max-width: 20%;
    padding-left: 24px;
    padding-right: 24px;
    margin-top: 24px; 
}
.user-links-list .user-content {
    margin: 0 auto;
    text-align: center;
}

.item-icon-show img {
    width: 8rem;
    height: 8rem;
    border-radius: 8rem;
}

</style>
