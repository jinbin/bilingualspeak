// import api from '../../api/api.js'
import util from '../../utils/util.js'

const app = getApp()
const db = wx.cloud.database({
  env: "production-a65b5c"
})

Page({
  data: {
    vols: require('../../data/vols'),
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
    ]
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

    var that = this

    this.setData({
      banner_height: 240 / wx.getSystemInfoSync().windowHeight * 100
    })

    console.log("begin")

    wx.cloud.callFunction({
      name: "getTopics",
      success: res => {
        console.log("getTopics")
        console.log(res.result.data)
        that.setData({
          topics: res.result.data.reverse().slice(0, 9),
        })
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
    return {
      title: '我发现了一个即兴演讲的宝库，推荐你也看看',
      imageUrl: '/images/jixing-big-min.jpeg'
    }
  }
})