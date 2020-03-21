// pages/knowledge/knowledge.js

import util from '../../utils/util.js'

const db = wx.cloud.database({
  env: "production-a65b5c"
})

Page({
  /**
   * 页面的初始数据
   */
  data: {
    banners: [
      {
        "url": "https://746d-tmassistant-5275ad-1258071577.tcb.qcloud.la/images/jp_tm.jpg?sign=0731fb2f6d045c516c97c4a7538bfdd4&t=1565859462",
        "bind": "saveOfficialQRCode"
      },
      {
        "url": "https://746d-tmassistant-5275ad-1258071577.tcb.qcloud.la/images/bilingualSpeak.jpeg?sign=559732267d212043dba93a6e0023d99f&t=1565749963",
        "bind": "saveOfficialQRCode"
      },
      {
        "url": "https://746d-tmassistant-5275ad-1258071577.tcb.qcloud.la/images/TEDtalk2.jpeg?sign=4b40201808264d0d196ad677f2c733d8&t=1565859498",
        "bind": "saveOfficialQRCode"
      }
    ],
    banner_height: 30
  },

  saveOfficialQRCode: function(){
    util.saveOfficialQRCode()
  },

  getIntro: function (options) {
    var that = this
    console.log(options.detail.target.id)

    if (options.detail.target.id == "") {
      return
    }

    if (options.detail.target.id == "guess") {
      // this.pageScrollToBottom()
      wx.navigateTo({
        url: '/pages/reading/reading',
      })
    } else if (options.detail.target.id == "script") {
      wx.navigateTo({
        url: '/pages/web/web?src=https://mp.weixin.qq.com/s/gVUuksupo7Fv2kzTAFlmPQ',
      })
    } else if (options.detail.target.id == "applyscript"){
      wx.navigateTo({
        url: '/pages/web/web?src=https://mp.weixin.qq.com/s/_t-FhuLXs3qEEEnJuZL4BQ',
      })      
    } else if (options.detail.target.id == "toumayanjiang"){
      wx.navigateToMiniProgram({
        appId: 'wx16c76d4762cbe0b3',
      })
    } else if (options.detail.target.id == "collection"){
      wx.navigateTo({
        url: '/pages/topicsView/volItem',
      }) 
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      banner_height: 240 / wx.getSystemInfoSync().windowHeight * 100
    })

    var that = this 

    wx.cloud.callFunction({
      name: "getTopics",
      success: res => {
        console.log("getTopics")
        console.log(res.result.data)
        that.setData({
          topics: res.result.data.reverse(),
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },


  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: "我发现了一个即兴演讲的宝库，推荐你也看看"
      // imageUrl: '/images/collection-min.jpeg'
    }
  }
})