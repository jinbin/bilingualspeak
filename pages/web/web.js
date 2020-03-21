// pages/web/web.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      url_src: options.src
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
  onShareAppMessage: function (options) {
    // options.webViewUrl: https://mp.weixin.qq.com/s/wGy_ZvMBmJ00_KXYA98iiQ#wechat_redirect
    return {
      title: '这是一篇我喜欢的文章，你是我的好友，推荐你也看看',
      // path: '/pages/testdb/testdb?src=' + options.webViewUrl,
      path: '/pages/testdb/testdb?src=' + this.data.url_src,
      // imageUrl: '/images/indexforward-min.jpg'
    }
  }
})