import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const TOKEN = {
  "DAIWAN-API-TOKEN": "8C848-38434-08473-55345"
}
const VIDEOTOKEN = {
  "DAIWAN-API-TOKEN": "D7D56-C54E4-9E5F5-0994C"
}

const API = {
  championList: 'http://lolapi.games-cube.com/champion',
  championDetail: 'http://lolapi.games-cube.com/GetChampionDetail?champion_id=',
  playerSearch: 'http://lolapi.games-cube.com/UserArea?keyword=', 
  playerDetail: 'http://lolapi.games-cube.com/UserHotInfo?qquin=', 
  getTierQueue: 'http://lolapi.games-cube.com/GetTierQueue?tier=',
  playExtInfo: 'http://lolapi.games-cube.com/UserExtInfo?qquin=',
  combatList: 'http://lolapi.games-cube.com/CombatList?qquin=',
  combatDetail: 'http://lolapi.games-cube.com/GameDetail?qquin=',
  newstVideos: 'http://infoapi.games-cube.com/GetNewstVideos?p=',
  commenterList: 'http://infoapi.games-cube.com/GetAuthors'
}

const store = new Vuex.Store({
	state: {
		title: '英雄联盟助手',
		bannerNews: null,
		newstNews: null,
		playerSearchResult: [],	
		playerDetail: null,
		championList: [],
		champion: null,
		championDetailBg: '',
		tierQueue: '',
		tripleKills: 0,
		quadraKills: 0,
		pentaKills: 0,
		killsTotal: 0,
		totalMvps: 0,
		godlikeNum: 0,
		combatList: [],
		combatDetail: null,
	},
	mutations: {
		get_champion_list(state) {
		  axios.get(API.championList, {
		    headers: TOKEN
		  }).then((res) => {
		    if (res.data.code == 0) {
		      state.championList = res.data.data
		      state.title = '英雄列表'
		    }
		  })
		},
		get_champion_detail(state, object) {
		  axios.get(API.championDetail + object.id, {
		    headers: TOKEN
		  }).then((res) => {
		    if (res.data.code == 0) {
		      state.champion = res.data.data[0]
		      state.title = state.champion.name
		    }
		  })
		},
		get_player_search(state, object) {
		  axios.get(API.playerSearch + object.name, {
		    headers: TOKEN
		  }).then((res) => {
		    if (res.data.code == 0) {
		      state.playerSearchResult = res.data.data
		      state.title = '搜索召唤师'
		    }
		  })
		},
		get_player_detail(state, object) {
		  let qquin = object.qquin
		  let vaid = object.vaid
		  axios.get(API.playerDetail + qquin + '&vaid=' + vaid, {
		    headers: TOKEN
		  }).then((res) => {
		    if (res.data.code == 0) {
		      state.playerDetail = res.data.data[0]
		      state.title = state.playerDetail.name
		      axios.get(API.getTierQueue + res.data.data[0].tier + '&queue=' + res.data.data[0].queue, {
		        headers: TOKEN
		      }).then((res) => {
		        if (res.data.code == 0) {
		          state.tierQueue = res.data.data[0].return
		        }
		      })
		    }
		  })
		  axios.get(API.playExtInfo + qquin + '&vaid=' + vaid, {
		    headers: TOKEN
		  }).then((res) => {
		    if (res.data.code == 0) {
		      let data = res.data.data
		      state.tripleKills = data[1].triple_kills
		      state.quadraKills = data[1].quadra_kills
		      state.pentaKills = data[1].penta_kills
		      state.godlikeNum = data[1].god_like_num
		      state.killsTotal = data[1].kills_total
		      state.totalMvps = data[2].total_match_mvps + data[2].total_rank_mvps
		    }
		  })
		},
		get_combat_list(state, object) {
		  axios.get(API.combatList + object.qquin + '&vaid=' + object.vaid + '&p=' + object.p, {
		    headers: TOKEN
		  }).then((res) => {
		    if (res.data.code == 0) {
		        state.combatList = state.combatList.concat(res.data.data[0].battle_list)
		    }
		  })
		},
		get_combat_detail(state, object) {
		  axios.get(API.combatDetail + object.qquin + '&vaid=' + object.vaid + '&gameid=' + object.gameid, {
		    headers: TOKEN
		  }).then((res) => {
		    if (res.data.code == 0) {
		        state.combatDetail = res.data.data[0].battle
		        state.title = '对战详情'
		    }
		  })
		},
		empty_combat_list(state) {
		  state.combatList = []
		},
		set_title(state, val) {
		  state.title = val
		}
	},
	actions: {
		GET_CHAMPION_LIST (context) {
		  context.commit('get_champion_list')
		},
		GET_CHAMPION_DETAIL(context, object) {
		  context.commit('get_champion_detail', object)
		},
		GET_PLAYER_SEARCH(context, object) {
		  context.commit('get_player_search', object)
		},
		GET_PLAYER_DETAIL(context, object) {
		  context.commit('get_player_detail', object)
		},
		GET_COMBAT_LIST(context, object) {
		  context.commit('get_combat_list', object)
		},
		GET_COMBAT_DETAIL(context, object) {
		  context.commit('get_combat_detail', object)
		},
	},
	getters: {
		skins (state) {
		  var skins = []
		  for(var i = 0; i < state.champion.skins.length; i++) {
		    let obj = {
		      name: state.champion.skins[i].name,
		      skinurl: `http://cdn.tgp.qq.com/pallas/images/skins/original/${state.champion.key}-${state.champion.skins[i].id}.jpg`,
		      videourl: state.champion.skins[i].displayUrl
		    }
		    skins.push(obj)
		  }
		  return skins
		},
		skills (state) {
		  var skills = [{
		    name: state.champion.passive.name,
		    description: state.champion.passive.description,
		    imgurl: `http://ossweb-img.qq.com/images/lol/img/passive/${state.champion.passive.image.full}`
		  }]
		  for(var i = 0; i < state.champion.spells.length; i++) {
		    let obj = {
		      name: state.champion.spells[i].name,
		      description: state.champion.spells[i].tooltip,
		      imgurl: `http://ossweb-img.qq.com/images/lol/img/spell/${state.champion.spells[i].id}.png`
		    }
		    skills.push(obj)
		  }
		  return skills
		},
		winners (state) {
		  return state.combatDetail.gamer_records.slice(0,5)
		},
		losers (state) {
		  return state.combatDetail.gamer_records.slice(-5)
		}
	}
})

export default store
