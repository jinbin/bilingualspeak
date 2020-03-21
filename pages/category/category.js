// pages/category/category.js

var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    bgcolor: "#87CEFA"
  },

  toCate: function (options) {
    console.log(options)
    console.log(app.globalData.cateType)

    app.globalData.cateType = options.target.dataset.type

    //放到首页做
    //wx.setStorageSync('cateTypeSet', options.target.dataset.type)

    this.setData({
      type: app.globalData.cateType
    })

    wx.switchTab({
      url: '/pages/volItem/volItem',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    this.setData({
      type: app.globalData.cateType
    })
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

  }
})