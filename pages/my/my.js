// pages/my/my.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page_ft: {
      data: "Copyright © 2018-2019 jinbin"
    },
  },

  copyText: function (e) {
    wx.setClipboardData({
      data: e.currentTarget.dataset.text,
      success: function (res) {
        wx.showToast({
          title: "内容已复制"
        })
      }
    })
  },

  naviTo: function (e) {
    // 头马助手AppId: wx16c76d4762cbe0b3
    wx.navigateToMiniProgram({
      appId: 'wx16c76d4762cbe0b3',
      success(res) {
        // 打开成功
        console.log("跳转成功")
      }
    })
  },

  fromPageFt: function () {
    wx.navigateToMiniProgram({
      appId: 'wx16c76d4762cbe0b3'
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