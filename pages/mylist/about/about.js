// pages/contact/contact.js

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
  },

  imgPre: function (e) {
    var current = e.currentTarget.dataset.src
    wx.previewImage({
      current: current, // 当前显示图片的http链接  
      urls: [current], // 需要预览的图片http链接列表
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

  navToMap: function(e) {
    wx.navigateTo({
      url: '/pages/tm/loc/loc'
      //url: '/pages/toastmasters/toastmasters'
    })
  },

  copyText: function(e) {
    wx.setClipboardData({
      data: e.currentTarget.dataset.text,
      success: function(res){
        wx.showToast({
          title: "内容已复制"
        })
      }
    })
  },

  saveOfficialQRCode: function (e) {
    wx.showModal({
      content: '关注"头马演讲助手"官方公众号, 回复"交流"获取作者联系方式',
      showCancel: false,
      confirmText: '去关注',
      confirmColor: '#ff7f50',
      success: function (res) {
        if (res.confirm) {
          wx.setClipboardData({
            data: "头马演讲助手",
            success: function (res) {
              wx.showToast({
                title: "名称已复制"
              })
            }
          })
          console.log('用户点击确定');
        }
      }
    })
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