<template>
	<div class="landing-page">
		<div class="landing-page-content">
			<p class="landing-page-content_tip">Vue2.0-英雄联盟助手</p>
			<p class="landing-page-content_enter">
				<mu-raised-button @click="enter" label="Welcome" class="demo-raised-button" primary/>
			</p>
	    </div>
	</div>
</template>

<script>
export default {
	methods: {
		enter(){
			this.$router.push('/index/news')
		}
	}
}
</script>

<style lang="less" scoped>
.landing-page {
  width: 100%;
  height: 100%;
  background: url(../assets/images/landing.jpeg) no-repeat;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  &-content {
    &_tip {
      width: 100%;
      padding: 200px 0;
      font-size: 24px;
      color: #fff;
      font-weight: bold;
    }
    &_enter {
      width: 100%;
      text-align: center;
    }
  }
}	
</style>