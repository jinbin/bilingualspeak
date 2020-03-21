// import api from '../../api/api.js'
import util from '../../utils/util.js'

const app = getApp()
const db = wx.cloud.database({
  env: "production-a65b5c"
})

Page({
  data: {
    vols: app.vols,
    current: 0,
    indicatorDots: true,
    vertical: false,
    autoplay: false,
    circular: false,
    interval: 10,
    duration: 5,
    previousMargin: 0,
    nextMargin: 0,
    tabs: ["即兴问题"],
    item: "Hello"
  },

  onLoad: function (e) {
    var that = this
   
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          clientHeight: res.windowHeight
        });
      }
    })

    db.collection("topics").get({
      success: function (res) {
        console.log(res.data)
        that.setData({
          vols: res.data.reverse(),
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
      this.setData({ vols })
    }
  },

  handleChange: function (e) {
    let current = e.detail.current
    let volsLength = this.data.vols.length

    if (current === volsLength) {
      this.setData({
        current: volsLength
      })
      wx.navigateTo({
        url: '../history/history?page=index',
        success: () => {
          this.setData({
            current: volsLength - 1
          })
        }
      })
    }
  },

  onShareAppMessage: function () {
    return {
      title: '即兴话题大全: 海量话题，等你挑战!',
      imageUrl: '/images/jixing-big-min.jpeg'
    }
  }
})
