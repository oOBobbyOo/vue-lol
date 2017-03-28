<template>
	<div class="video" v-if="newstVideos.length > 0">
		<div class="video-card" v-for="video in newstVideos">
		    <a :href="video.content | videoSrc">
		      <div class="video-card-img">
		        <img :src="video.img"></img>
		      </div>
		      <p class="video-card-title">
		        {{ video.title }}
		      </p>
		      <p class="video-card-date">
		        {{ video.createdate.split('T')[0] }}
		        <span>
		          {{ video.comments/10000 | pv }}评论
		        </span>
		      </p>
		    </a>
		</div>
	</div>
	<Loading v-else></Loading>
</template>

<script>
import { newstVideos } from '../data'
import Loading from '../components/Loading'
import { pv, videoSrc } from '../filters' 

export default {
	data () {
	  return {
	    newstVideos: newstVideos
	  }
	},
	created() {
		this.setTitle()
	},
	methods: {
		setTitle () {
		  this.$store.commit('set_title', '最新视频')
		}
	},
	filters: {
		pv,
		videoSrc
	},
	components:　{
	  Loading
	}
}
</script>

<style lang="less" scoped>
.video {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  flex-wrap: wrap;
  padding: 10px;
  background: #f0f0f0;

  &-card {
    width: 45%;
    margin-bottom: 10px;
    background: #fff;
    padding: 5px;
    &-img {
      img {
        width: 100%;
      }
    }
    &-title {
      color: #666;
      font-size: 12px;
    }
    &-date {
      color: #999;
      font-size: 12px;
      span {
        float: right;
        color: goldenrod;
      }
    }
  }
}

</style>