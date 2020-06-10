
const app = getApp()

var timer

//var isStart = 0

Page({
  data: {
    min: 0,
    sec: 0,
    time_all: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
    index: 6,
    isStart: 0
  },

  setTime(e) {
    var that = this
    that.pauseBtn()
    that.setData({
      index: e.detail.value// 事件后触发获取的值
    })
    that.setData({
      min: that.data.time_all[that.data.index],
      sec: 0
    })

    that.setData({
      xmin: zeroFill(that.data.min, 2),
      xsec: zeroFill(that.data.sec, 2),
    })
    // //设置时间时，计时暂停
    // if(isStart == 0){
    //   //未在计时
    // }else{
    //   //计时中，先暂停
    // }
    console.log(e)
  },

  onLoad: function (options) {
    var that = this
    if (options.min) {
      var sec_value = 0;
      if (options.sec) {
        sec_value = options.sec
      }
      this.setData({
        min: options.min,
        sec: sec_value,
        green_time: 2,
        yellow_time: 1,
        red_time: 15,
        color: "white"
      })
    }else{
      this.setData({
        // time: 3,
        hour: 0,
        min: that.data.time_all[that.data.index],
        sec: 0,
        color: "white"
      })
    }

    this.setData({
      xmin: zeroFill(this.data.min, 2),
      xsec: zeroFill(this.data.sec, 2),
    })

    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#F8F8F8',
    })  

  },

  // 自定义的开始按钮
  startBtn: function() {
    if (!this.data.isStart){
      console.log("开始按钮")
      Countdown(this)
      this.setData({
        isStart: 1
      })
    }
  },

  // 自定义的暂停按钮  
  pauseBtn: function () {
    console.log("暂停按钮");
    clearTimeout(timer);
    this.setData({
      isStart: 0
    })
  },

  // 重新开始
  resetBtn: function() {
    clearTimeout(timer);
    console.log("Reset");
    this.setData({
      isStart: 0
    })
    this.setData({
      min: this.data.time_all[this.data.index],
      sec: 0
    })

    // reset之后恢复背景色为白色
    this.setData({
      color: "white"
    }),
      wx.setNavigationBarColor({
        frontColor: '#ffffff',
        backgroundColor: '#F8F8F8',
    })

    this.setData({
      xmin: zeroFill(this.data.min, 2),
      xsec: zeroFill(this.data.sec, 2),
    })
  },

  changebg: function(){
  //green -> yellow -> red -> white
    if(this.data.color == "white"){
      this.setData({
        color: "green"
      }),
      wx.setNavigationBarColor({
        frontColor: '#ffffff',
        backgroundColor: '#6b8e23',
      })
    } else if (this.data.color == "green"){
      this.setData({
        color: "yellow"
      }),
      wx.setNavigationBarColor({
        frontColor: '#ffffff',
        backgroundColor: '#ffd700',
      })
    } else if (this.data.color == "yellow") {
      this.setData({
        color: "red"
      }),
      wx.setNavigationBarColor({
        frontColor: '#ffffff',
        backgroundColor: '#FF0000',
      })
    } else if (this.data.color == "red") {
      this.setData({
        color: "white"
      }),
      wx.setNavigationBarColor({
        frontColor: '#ffffff',
        backgroundColor: '#F8F8F8',
      })  
    }
  },

  onShareAppMessage: function () {
    return {
      title: this.data.time+"分钟演讲计时器",
      path: "/pages/tm/clock/countdown/countdown?time=" + this.data.time
    }
  }

})

// 倒计时
function Countdown(pointer) {
  timer = setTimeout(function () {
    pointer.data.sec = pointer.data.sec - 1
    if (pointer.data.sec < 0){
      if (pointer.data.min == 2){
        pointer.setData({
          color: "green"
        })
        wx.setNavigationBarColor({
          frontColor: '#ffffff',
          backgroundColor: '#6b8e23',
        })
        wx.vibrateLong()
      } else if (pointer.data.min == 1){
        pointer.setData({
          color: "yellow"
        })
        wx.setNavigationBarColor({
          frontColor: '#ffffff',
          backgroundColor: '#ffd700',
        })
        wx.vibrateLong()
      }
      if (pointer.data.min != 0){
        pointer.data.sec = 59
        pointer.data.min = pointer.data.min - 1
        pointer.setData({
          xmin: zeroFill(pointer.data.min, 2),
          xsec: zeroFill(pointer.data.sec, 2),
        })
        Countdown(pointer);
      }else{
        console.log("完成")
        pointer.setData({
          color: ""
        })
        wx.setNavigationBarColor({
          frontColor: '#ffffff',
          backgroundColor: '#F8F8F8',
        }) 
        wx.vibrateLong()
      }
    }else{
      if (pointer.data.sec == 15 && pointer.data.min == 0){
        pointer.setData({
          color: "red"
        })
        wx.setNavigationBarColor({
          frontColor: '#ffffff',
          backgroundColor: '#FF0000',
        })
      }
      pointer.setData({
        xmin: zeroFill(pointer.data.min, 2),
        xsec: zeroFill(pointer.data.sec, 2),
      })
      Countdown(pointer);
    }
  }, 1000);
}

function zeroFill(str, n){
  //补零方法，str为数字字符串 n为需要的位数，不够补零
  if (str.toString().length < n) {
    str = '0' + str
  }
  return str
}



