<template>
  <div class="champion" v-if="championList.length > 0">
    <div class="champion-list" v-for="champion in championList" @click="goDetail(champion.id)">
      <div class="champion-list-avater">
        <mu-avatar slot="left" :src="pic + champion.id + '.png'" :size="55"/>
      </div>
      <div class="champion-list-info">
        <p class="title">
          {{ champion.title }} <br>
          <span class="name">{{ champion.cname }}({{ champion.ename }})</span>
        </p>
      </div>
    </div>
  </div>
  <Loading v-else></Loading>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Loading from '../components/Loading'
const pics = 'http://cdn.tgp.qq.com/pallas/images/champions_id/'
export default {
  computed: {
    ...mapState({
      championList: state => state.championList
    })
  },
  data () {
    return {
      pic: pics
    }
  },
  created () {
    this.getList()
  },
  methods: {
    ...mapActions({
      getList: 'GET_CHAMPION_LIST'
    }),
    goDetail(id) {
      this.$router.push({name: 'championDetail', params: {id: id}})
    }
  },
  components: {
    Loading
  }
}
</script>

<style lang="less" scoped>
.champion {
  padding: 12px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  background: #f8f8f8;
  &-list {
    width: 50%;
    text-align: center;
    display: flex;
    flex-direction: row;
    margin: 5px 0;
    &-avatar {
      flex: 1;
      width: 55px;
      height: 55px;
      border: none;
      img {
        display: block;
        border-radius: 50%;
        width: 55px;
        height: 55px;
        border: none;
      }
    }
    &-info {
      padding-left: 4px;
      flex: 2;
      display: flex;
      align-items: center;
      .title {
        width: 100%;
        text-align: left;
        color: #333; 
        font-size: 14px;
      }
      .name {
        width: 100%;
        text-align: left;
        color: #999; 
        font-size: 12px;
      }
    }
  }
}
</style>