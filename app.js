//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    events: [
      {
        id: 1,
        name: "Soccer with Etienne",
        img_url: "https://vapantherpress.com/wp-content/uploads/2017/12/soccer.jpg",
        description: "What's UP!!! Come join us this Friday for your weekly hit of Soccer Madness with Etienne and his gang. Meet friends, have fun, and grab a snack after with us. Beginners welcome!",
        host: "Etienne B.",
        date: "Friday 2019/12/24",
        time: "19:00-20:30",
        location: "Jing An Tennis Grounds",
        price: "Free",
        level: "Beginner"
      },
      {
        id: 2,
        name: "Saturday Afternoon Tennis",
        img_url: "https://www.diepenbroek.be/sites/diepenbroek/files/tennistegel.jpg",
        description: "Let's play tennis! We host a weekly 8 Player mini-tournament",
        host: "Phillip H.",
        date: "Saturday 2019/12/25",
        time: "13:00-15:00",
        location: "Li Yuan Park",
        price: "¥30",
        level: "Intermediate"
      },
      {
        id: 3,
        name: "Boxing Day Boxing",
        img_url: "https://cn.bing.com/th?id=OIP.xyxowUlASfmIQiKKcF2HEwHaEC&pid=Api&rs=1",
        description: "",
        host: "Joyce E.",
        date: "Saturday 2019/12/26",
        time: "19:00-21:00",
        location: "Doherty's Gym",
        price: "Free",
        level: "Beginner"
      },
    ]
  }
})