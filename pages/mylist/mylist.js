// pages/my/my.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    appId: "wx8abaf00ee8c3202e",
    tt_appId: "wx4c4b54bc609bd79e",
    page_ft: {
      data: "Copyright © 2018-2019 jinbin"
    },
    extraData: {
      id: "43654",
      // 自定义参数，具体参考文档
      customData: {
        clientInfo: '',
        imei: ''
      }
    },
    components: [
    ]
  },

  onShow: function(options) {},

  linkTA: function(e) {
    wx.showModal({
      content: "关联步骤\n1. 登录微信公众号\n2. 小程序管理->添加\n3. 验证并关联小程序\n4. 输入小程序AppID\n5. 最后发送关联邀请",
      showCancel: true,
      confirmText: 'AppID',
      confirmColor: '#ff7f50',
      success: function(res) {
        if (res.confirm) {
          wx.setClipboardData({
            data: "wx16c76d4762cbe0b3",
            success: function(res) {
              wx.showToast({
                title: "AppID复制成功"
              })
            }
          })
          console.log('用户点击确定');
        }
      }
    })
  },

  saveOfficialQRCode: function(e) {
    wx.showModal({
      content: '微信搜索"头马助手 Toastmasters Assistant", 获取更多头马信息！',
      showCancel: false,
      confirmText: '去关注',
      confirmColor: '#ff7f50',
      success: function(res) {
        if (res.confirm) {
          wx.setClipboardData({
            data: "头马助手 Toastmasters Assistant",
            success: function(res) {
              wx.showToast({
                title: "公众号名已复制"
              })
            }
          })
          console.log('用户点击确定');
        }
      }
    })
  },

  saveQRCode: function(e) {
    var that = this
    wx.getSetting({
      success(res) {
        console.log(res.authSetting["scope.writePhotosAlbum"])
        if (res.authSetting["scope.writePhotosAlbum"]) {
          wx.saveImageToPhotosAlbum({
            filePath: "images/tabletopicsQRCode.jpg",
            success: function(res) {
              console.log("save success!")

              wx.showModal({
                content: '图片已保存到相册，赶紧发给需要的小伙伴吧~',
                showCancel: false,
                confirmText: '好的',
                confirmColor: '#333',
                success: function(res) {
                  if (res.confirm) {
                    console.log('用户点击确定');
                  }
                }
              })
            }
          })
        } else {
          wx.showModal({
            content: '此功能需要打开保存图片到相册的权限后才可使用~',
            showCancel: false,
            confirmText: '好的',
            confirmColor: '#333',
            success: function(res) {
              if (res.confirm) {
                wx.authorize({
                  scope: 'scope.writePhotosAlbum'
                })
                wx.openSetting({})
              }
            }
          })
        }
      }
    })
  },

  bindGetUserInfo: function(e) {
    var that = this
    if (e.detail.userInfo) {
      //用户按了允许按钮
      that.setData({
        isLogin: "已登录"
      })
    } else {
      //用户按了拒绝按钮
      that.setData({
        isLogin: "登录了解更多"
      })
    }
  },

  toMiniProgram: function(e) {
    console.log("toMiniProgram")
    wx.navigateToMiniProgram({
      appId: 'wx09a49d05a365a4e6',
      path: "pages/contact/contact",
      // envVersion: 'trial',
      success(res) {
        console.log("SUCCESS")
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

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
  onShareAppMessage: function() {

  },

  fromPageFt: function() {
    wx.navigateToMiniProgram({
      appId: this.data.tt_appId
    })
  }
})
