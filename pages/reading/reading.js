// pages/reading/reading.js

const app = getApp()
var util = require('../../utils/util.js');
const db = wx.cloud.database({
  env: "production-a65b5c"
})

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this

    db.collection("articles").get({
      success: function(e) {
        console.log(e)
        that.setData({
          articles: e.data.reverse()
        })
      }
    })
  },

  saveOfficialQRCode: function() {
    util.saveOfficialQRCode()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: "我发现了很多关于演讲的精彩文章，推荐你也看看"
    }
  }
})