// pages/topics/topics.js

const db = wx.cloud.database({
  env: "production-a65b5c"
})

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: ["即兴问题"]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this 
    console.log(options.label)
    that.setData({
      label: options.label,
      id: options.id
    })
    console.log("id为: " + options.id)
    db.collection("topics").where({
      //label: options.label,
      _id: options.id
    }).get({
      success: function (res) {
        console.log(res.data[0])
        that.setData({
          title: res.data[0].title,
          topics: res.data[0].topics,
          image: res.data[0].image || "/images/jixing-min.jpeg"
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
      title: "让我们聊聊这个即兴话题:《" + this.data.label + "》",
      path: "/pages/topics/topics?label=" + this.data.label + "&id=" + this.data.id
    }
  }
})