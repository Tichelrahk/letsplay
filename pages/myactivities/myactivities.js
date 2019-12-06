const app = getApp()

Page({

  goToIndex: function () {
    wx.navigateTo({
      url: '/pages/eventsindex/eventsindex',
    })
  },

  goToBrowse: function () {
    wx.navigateTo({
      url: '/pages/browse/browse',
    })
  },

  goToAbout: function () {
    wx.navigateTo({
      url: '/pages/about/about',
    })
  },

  goToCreate: function () {
    wx.navigateTo({
      url: '/pages/createactivity/createactivity',
    })
  },

  goToProfile: function () {
    wx.navigateTo({
      url: '/pages/usershow/usershow',
    })
  },

  goToMyActivities: function () {
    wx.navigateTo({
      url: '/pages/myactivities/myactivities',
    })
  },


  goToEventsShow: function (event) {
    console.log(20, event)
    let id = event.currentTarget.dataset.id
    console.log(21, id)
    wx.navigateTo({
      url: `/pages/eventshow/eventshow?id=${id}`,
    })
  },

  data: {
    winWidth: 0,
    winHeight: 0,
    currentTab: 0,
  },
  /**
   * Page initial data
   */
  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      },
    });
    this.setData({
      userInfo: app.globalData.userInfo,
      login: app.globalData.login
    })
  },

  bindChange: function (e) {

    var that = this;
    that.setData({ currentTab: e.detail.current });

  },


  swichNav: function (e) {

    var that = this;

    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },

  updateUser: function (e) {
    const page = this
    const userId = app.globalData.userId

    const info = {
      name: e.detail.userInfo.nickName,

      profile_picture: e.detail.userInfo.avatarUrl,
      location: e.detail.userInfo.city
    }

    wx.request({
      url: app.globalData.url + `users/${userId}`,
      method: "PUT",
      data: info,
      success(res) {
        console.log(res)
        console.log(`Updated user ${userId}`)


        page.setData({ login: true })


      }
    })
  },


  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    app.globalData.login = true
    this.setData({
      userInfo: e.detail.userInfo
    })
    this.updateUser(e)
  },


  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {
    const page = this
    console.log(app.globalData)
    wx.request({
      url: app.globalData.url + "users/" + `${app.globalData.userId}`,
      method: 'GET',
      success(res) {
        console.log(11, res)
        const user = res.data.user
        page.setData({
          user: user
        });
        console.log(10, user)
      }
    })
  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },



  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  }
})





