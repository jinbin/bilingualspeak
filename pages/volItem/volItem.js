// import api from '../../api/api.js'
import util from '../../utils/util.js'

const app = getApp()

Page({
  data: {
    vols: require('../../data/vols'),
    vols_pws: require('../../data/vols_pws'),
    current: 0,
    indicatorDots: true,
    vertical: false,
    autoplay: false,
    circular: true,
    interval: 10,
    duration: 5,
    previousMargin: 0,
    nextMargin: 0,
    animationMain: null,//正面
    animationBack: null, //背面
    rotate: 1
  },


  rotateFn(e) {
    // 点击正面
    console.log(current)
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

  onLoad: function (e) {
    this.setData({
      current: Math.floor(Math.random() * this.data.vols.length)
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
      this.setData({ vols })
    }
  },

  // handleChange: function (e) {
  //   let current = e.detail.current
  //   console.log(current)
  //   let volsLength = this.data.vols.length
  //   console.log(volsLength)
  // },

  nextTopic: function() {
    if (this.data.current === this.data.vols.length-1){
      this.setData({
        current: 0,
        rotate: 1
      })
    }else{
      this.setData({
        current: this.data.current + 1,
        rotate: 1
      })
    }
  }, 

  ToMy: function() {
    wx.navigateTo({
      url: '/pages/my/my',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },

  onShareAppMessage: function () {
    return {
      title: this.data.vols[this.data.current]["hp_content"],
      // imageUrl: '/images/whytm.jpg'
    }
  }
})
