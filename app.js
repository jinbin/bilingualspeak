//app.js

App({
  globalData: {
    cateType: "所有"
  },

  onLaunch: function(){
    this.globalData.cateType = wx.getStorageSync("cateTypeSet") || "所有"
    console.log(this.globalData.cateType)
    // wx.getStorage({
    //   key: 'cateTypeSet',
    //   success(res) {
    //     that.globalData.cateType = res.data
    //   }
    // })
  }
})