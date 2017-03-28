import Vue from 'vue'
import Router from 'vue-router'
import Landing from '@/views/Landing'
import Index from '@/views/Index'
import News from '@/views/News'
import Player from '@/views/Player'
import PlayerDetail from '@/views/PlayerDetail'
import CombatDetail from '@/views/CombatDetail'
import ChampionList from '@/views/ChampionList'
import ChampionDetail from '@/views/ChampionDetail'
import Video from '@/views/Video'

Vue.use(Router)

export default new Router({
  routes: [
	{
		path: '/',
		name: 'landing',
		component: Landing
	},
    {
		path: '/index',
		name: 'index',
		component: Index,
		children: [
    		{
    		  path: 'news',
    		  name: 'news',
    		  component: News
    		},
    		{
    		  path: 'player',
    		  name: 'player',
    		  component: Player
    		},
            {
              path: 'playerDetail/:vaid/:qquin',
              name: 'playerDetail',
              component: PlayerDetail
            },
            {
              path: 'combatDetail/:vaid/:qquin',
              name: 'combatDetail',
              component: CombatDetail
            },
    		{
    		  path: 'championList',
    		  name: 'championList',
    		  component: ChampionList,
    		},
            {
              path: 'championDetail/:id',
              name: 'championDetail',
              component: ChampionDetail
            },
    		{
    		  path: 'video',
    		  name: 'video',
    		  component: Video
    		}
      	]
    }
  ]
})
