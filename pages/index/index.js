// import api from '../../api/api.js'
import util from '../../utils/util.js'

const app = getApp()
const db = wx.cloud.database({
  env: "production-a65b5c"
})

Page({
  data: {
    vols: require('../../data/vols'),
    challenge: require('../../data/challenge'),
    is_challenge: false,
    current: 0,
    indicatorDots: true,
    vertical: false,
    autoplay: false,
    circular: true,
    interval: 10,
    duration: 5,
    previousMargin: 0,
    nextMargin: 0,
    animationMain: null, //正面
    animationBack: null, //背面
    rotate: 1,
    lastX: 0, //滑动开始x轴位置
    lastY: 0, //滑动开始y轴位置
    isMove: 0, //标识手势
    type: app.globalData.cateType,
    banners: [
      {
        "url": "/images/tm_korea-min.jpg",
        "bind": "saveOfficialQRCode"
      }
    ],
    // chanllege: {
    //   "en": "If I sent you a Time Machine, and the Time Machine can bring you to your past. Which age do you want to go back and why?",
    //   "cn": "你最喜欢哪一个城市，为什么？"
    // } 
  },

  saveOfficialQRCode(){
    util.saveOfficialQRCode("")
  },

  rotateFn(e) {
    // 点击正面
    if (this.data.rotate == 1) {
      this.setData({
        rotate: 2
      })
    }
    // 点击背面
    else {
      this.setData({
        rotate: 1
      })
    }
  },

  handletouchtart: function (event) {

    console.log("start")
    this.data.lastX = event.touches[0].pageX
    this.data.lastY = event.touches[0].pageY
  },

  handletouchmove: function (event) {

    var currentX = event.touches[0].pageX
    var currentY = event.touches[0].pageY

    this.data.endX = currentX
    this.data.endY = currentY

    this.data.isMove = 1
  },

  handletouchend: function (event) {

    console.log("end")
    console.log(this.data.endX)
    console.log(this.data.endY)

    var tx = this.data.endX - this.data.lastX
    var ty = this.data.endY - this.data.lastY

    if (this.data.isMove == 1 && this.data.rotate == 1) {
      //左右方向滑动
      if (Math.abs(tx) > Math.abs(ty)) {
        if (tx < 0)
          console.log("向左滑动")
        else if (tx > 0)
          console.log("向右滑动")
      }
      //上下方向滑动
      else {
        // 设置阈值为10避免和bindtap相互干扰
        if (ty < -5) {
          //向上滑动
          wx.vibrateShort({})
          console.log(ty)
          if (this.data.current === this.data.vols.length - 1) {
            this.setData({
              current: 0,
              rotate: 1
            })
          } else {
            this.setData({
              current: this.data.current + 1,
              rotate: 1
            })
          }
        } else if (ty > 5) {
          //向下滑动
          console.log("down")
          wx.vibrateShort({})
          if (this.data.current === 0) {
            this.setData({
              current: this.data.vols.length - 1,
              rotate: 1
            })
          } else {
            console.log("up")
            this.setData({
              current: this.data.current - 1,
              rotate: 1
            })
          }
        }
      }
    }

    this.setData({
      lastX: 0,
      lastY: 0,
      endX: 0,
      endY: 0,
      isMove: 0
    })
  },

  goToRecord: function () {
    util.giveTip("紧张开发中，敬请期待！")
  },

  onLoad: function (options) {

    //console.log("options: " + options["challenge"])
    var that = this

    this.setData({
      banner_height: 240 / wx.getSystemInfoSync().windowHeight * 100
    })

    console.log("options:")
    console.log(options)
    console.log("Hello ===: " + wx.getLaunchOptionsSync()["query"])
    console.log(wx.getLaunchOptionsSync()["query"])

    // 转发查询串可通过 wx.getLaunchOptionsSync() 或 wx.onShow() 获取启动参数中的 query
    if (options["challenge"]){
      console.log("HHHHH in")
      this.showChallenge("cn")
    }

    wx.cloud.callFunction({
      name: "getTopics",
      success: res => {
        console.log("getTopics")
        console.log(res.result.data)
        that.setData({
          topics: res.result.data.reverse().slice(0, 19),
        })
      }
    })
  },

  show: function(event){
    var lang = event.currentTarget.dataset.lang
    //console.log("show: " + lang)
    this.showChallenge(lang)
  },

  showChallenge: function (lang){
    var today_num = util.getDays(new Date()) % this.data.challenge.length
    var that = this
    that.setData({
      is_challenge: true
    })
    if(lang == "cn"){
      that.setData({
        content: "今日即兴演讲挑战\n题目: " + that.data.challenge[today_num][lang] + "\n规则: 思考时间不超过30秒(若可以直接作答更佳)，回答时间在1到2分钟，不得少于1分钟，多于2分30秒",
        cancelText: "换英文"
      })
    }else{
      that.setData({
        content: "Impromptu Speech of Today\nQuestion: " + that.data.challenge[today_num][lang] + "\nRULE: You have no more than 30 seconds to prepare (better to speak without preparation), you will be disqualified if the speech is less than one minute or more than two minutes 30 seconds.",
        cancelText: "换中文"
      })
    }
    wx.showModal({
      content: that.data.content,
      showCancel: true,
      cancelText: that.data.cancelText,
      confirmText: "去答题",
      confirmColor: '#ff7f50',
      success: function (res) {
        if (res.confirm) {
          that.setData({
            is_challenge: false
          })
          // wx.navigateTo({
          //   url: '/pages/clock/clock',
          // })
        }else{
          if(lang == "en"){
            that.showChallenge("cn")
          }else{
            that.showChallenge("en")
          }
        }
      }
    })
  },

  getVols: function (idList) {
    let vols = this.data.vols

    if (idList.length > 0) {
      api.getVolById({
        query: {
          id: idList.shift()
        },
        success: (res) => {
          if (res.data.res === 0) {
            let vol = res.data.data

            vol.hp_makettime = util.formatMakettime(vol.hp_makettime)
            vols.push(vol)
          }
          this.getVols(idList)
        }
      })
    } else {
      this.setData({
        vols
      })
    }
  },

  // 先onLoad，再onShow
  onShow: function () {
  },

  nextTopic: function () {
    if (this.data.current === this.data.vols.length - 1) {
      this.setData({
        current: 0,
        rotate: 1
      })
    } else {
      this.setData({
        current: this.data.current + 1,
        rotate: 1
      })
    }
  },

  category: function () {
    wx.navigateTo({
      url: '/pages/category/category',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },

  ToMy: function () {
    wx.navigateTo({
      url: '/pages/mynew/mynew',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },

  onShareAppMessage: function () {
    console.log(this.data.is_challenge)
    if (this.data.is_challenge){
      console.log("WWWWWWWW")
      return {
        title: '每天一道即兴演讲题，等你来挑战！',
        imageUrl: '/images/today_challenge-min.jpeg',
        //query: "challenge=true",
        path: 'pages/index/index?challenge=true'
      }
    }else{
      console.log("WWWWWWWW111")
      return {
        title: '每天一道即兴演讲题，等你来挑战！',
        imageUrl: '/images/today_challenge-min.jpeg'
      }
    }
  }
})