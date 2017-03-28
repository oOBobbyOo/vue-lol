<template>
	<div class="player">
		<div class="player-search">
	      <input type="text" placeholder="搜索召唤师" v-model="name"/>
	      <mu-raised-button label="搜索" class="demo-raised-button" primary @click="playerSearch"/>
        <mu-toast v-if="toast" message="请输入正常的召唤师名字哦" @close="hideToast"/>
	    </div>
	    <div class="player-result">
	      <div class="player-result-empty" v-if="playerSearchResult.length == 0">
	        <img src="../assets/images/empty1.png" alt="">
	      </div>
	      <div class="player-result-list" v-else>
	        <div class="player-result-list-item" v-for="(player,index) in playerSearchResult" :key="index">
	          <router-link :to="{name: 'playerDetail', params: {qquin:player.qquin, vaid: player.area_id }}">
	            <div class="icon">
	              <img :src="TGPICON + player.icon_id + '.png'">
	            </div>
	            <div class="info">
                <p>{{ player.name }}</p>
	              <p>
	                {{ player.area_id | getAreaName }}
	                <span>等级:{{ player.level }}</span>
	              </p>
	            </div>
	          </router-link>
	        </div>
	      </div>
	    </div>
	</div>
</template>

<script>
import { mapState, mapActions, mapMutations, mapGetters } from 'vuex'
import { getAreaName } from '../filters'
const TGPICON = 'http://cdn.tgp.qq.com/lol/images/resources/usericon/'
export default {
	computed: {
    ...mapState({
      playerSearchResult: state => state.playerSearchResult
    }), 
	},
	data () {
	  return {
      toast: false,
	    name: '',
      TGPICON: TGPICON
	  }
	},
	created () {
	  this.setTitle()
	},
	methods: {
    hideToast () {
      this.toast = false
      if (this.toastTimer) clearTimeout(this.toastTimer)
    },
		playerSearch () {
		  if (this.name == '') {
        this.toast = true
        if (this.toastTimer) clearTimeout(this.toastTimer)
        this.toastTimer = setTimeout(() => { this.toast = false }, 2000)
        return
		  }
		  this.$store.dispatch('GET_PLAYER_SEARCH', {
		    name: this.name
		  })
		},
		setTitle () {
		  this.$store.commit('set_title', '搜索召唤师')
		}
	},
  filters: {
    getAreaName
  }
}
</script>

<style lang="less" scoped>
.player {
  &-search {
    border: 5px solid #03a9f4;
    height: 45px;
    display: flex;
    flex-direction: row;
    input {
      height: 100%;
      flex: 3;
      border: none;
      padding-left: 15px;
    }
    button {
      height: 100%;
      flex: 1;
      color: #fff;
      background: #03a9f4;
    }
  }
  &-result {
    &-empty {
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        width: 100px;
        height: 100px;
        opacity: 0.7;
        margin-top: 100px;
      }
    }
    &-list {
      &-item {
        display: flex;
        flex-direction: row;
        &:not(:last-child) {
          border-bottom: 1px solid #eee;
        }
        a {
          display: flex;
          flex-direction: row;
          width: 100%;
          .icon {
            display: flex;
            justify-content: center;
            flex: 1;
            padding: 5px 0;
            img {
              display: block;
              border-radius: 50%;
              width: 55px;
              height: 55px;
            }
          }
          .info {
            display: flex;
            flex-direction: column;
            flex: 3;
            padding: 8px 0;
            p {
              span {
                font-size: 12px;
                color: #333;
              }
            }
          }
        }
      }
    }
  }
}
</style>