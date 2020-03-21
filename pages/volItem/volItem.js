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
    type: app.globalData.cateType
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

  handletouchtart: function(event) {

    console.log("start")
    this.data.lastX = event.touches[0].pageX
    this.data.lastY = event.touches[0].pageY
  },

  handletouchmove: function(event) {


    var currentX = event.touches[0].pageX
    var currentY = event.touches[0].pageY

    this.data.endX = currentX
    this.data.endY = currentY

    this.data.isMove = 1
  },

  handletouchend: function(event) {

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

  goToRecord: function() {
    util.giveTip("紧张开发中，敬请期待！")
  },

  onLoad: function(options) {

    var that = this
    db.collection("topics").get({
      success: function(res) {
        console.log(res.data)
        that.setData({
          topics: res.data.reverse(),
        })

        console.log("option id: " + options.id)
        console.log("option type: " + options.type)
        // 为了避免底部按钮遮挡
        for (var i = 0; i < this.data.vols.length; i++) {
          // console.log(this.data.vols[i]["hp_model"])
          if (this.data.vols[i]["hp_model"]) {
            var num = 4
            while (num > 0) {
              this.data.vols[i]["hp_model"].push("")
              num = num - 1
            }
          }
        }
        // console.log(this.data.vols)
        // 若传入的id 和 type 不匹配，则会产生bug
        if (options.id) {
          this.setData({
            current: parseInt(options.id),
            vols: this.data.vols
          })
          app.globalData.cateType = options.type
          wx.setStorageSync('cateTypeSet', app.globalData.cateType)

          if (app.globalData.cateType == "所有") {
            this.setData({
              vols: require('../../data/vols')
            })
          } else {
            var key_pairs = {
              "365系列": "365",
              "工作": "work",
              "比赛": "competition",
              "中文": "cn"
            }
            let selected = []
            for (var i = 0; i < this.data.vols.length; i++) {
              if (this.data.vols[i]["type"] == key_pairs[app.globalData.cateType]) {
                selected.push(this.data.vols[i])
              }
            }
            console.log("题库数量: " + selected.length)

            if (selected.length != 0) {
              console.log(selected)
              this.setData({
                vols: selected
              })
            }

            if (parseInt(options.id) >= selected.length) {
              this.setData({
                current: Math.floor(Math.random() * this.data.vols.length)
              })
            }
          }

        } else {
          this.setData({
            current: Math.floor(Math.random() * this.data.vols.length),
            vols: this.data.vols
          })
          app.globalData.cateType = "所有"
          wx.setStorageSync('cateTypeSet', app.globalData.cateType)
        }

      }
    })
  },

  getVols: function(idList) {
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
  onShow: function() {
    console.log("Begin onShow")
    var cateTypeSet_in_store = wx.getStorageSync('cateTypeSet')

    // 分类未改变，则不用刷新展示题库
    if (cateTypeSet_in_store == app.globalData.cateType) {
      console.log(app.globalData.cateType)
      console.log(this.data.type)
      console.log("不刷新")
      this.setData({
        type: app.globalData.cateType
      })
    } else {
      console.log("刷新")
      // 分类改变，刷新展示题库
      wx.setStorageSync('cateTypeSet', app.globalData.cateType)

      this.setData({
        type: app.globalData.cateType,
        vols: require('../../data/vols')
      })

      console.log(this.data.vols)

      if (app.globalData.cateType == "所有") {

      } else {
        var key_pairs = {
          "365系列": "365",
          "工作": "work",
          "比赛": "competition",
          "中文": "cn"
        }

        let selected = []
        for (var i = 0; i < this.data.vols.length; i++) {
          if (this.data.vols[i]["type"] == key_pairs[app.globalData.cateType]) {
            selected.push(this.data.vols[i])
          }
        }
        console.log("题库数量: " + selected.length)

        if (selected.length != 0) {
          console.log(selected)
          this.setData({
            vols: selected
          })
        }

        // 经典bug
        this.setData({
          current: Math.floor(Math.random() * this.data.vols.length)
        })

        console.log("题库数量: " + this.data.vols.length)
      }
    }

    //wx.setStorageSync('cateTypeSet', options.target.dataset.type)
  },

  nextTopic: function() {
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

  category: function() {
    wx.navigateTo({
      url: '/pages/category/category',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
    // this.data.vols = []
    // if (this.data.type == "all") {
    //   let selected = []
    //   for (var i = 0; i < this.data.vols.length; i++) {
    //     if (this.data.vols[i]["type"] == "365") {
    //       selected.push(this.data.vols[i])
    //     }
    //   }
    //   this.setData({
    //     vols: selected,
    //     type: "365"
    //   })
    // }else{
    //   this.setData({
    //     vols: require('../../data/vols'),
    //     type: "all"
    //   })
    // }
  },

  ToMy: function() {
    wx.navigateTo({
      url: '/pages/mynew/mynew',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },

  onShareAppMessage: function() {
    console.log("分享的id: " + this.data.current)
    console.log("分享的type: " + app.globalData.cateType)
    return {
      title: "给你出的即兴题目: " + this.data.vols[this.data.current]["hp_content"],
      // imageUrl: '/images/whytm.jpg'
      path: '/pages/volItem/volItem?id=' + this.data.current + '&type=' + app.globalData.cateType
    }
  }
})