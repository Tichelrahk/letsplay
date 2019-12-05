// pages/browse/browse.js
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

  /**
   * Page initial data
   */
  data: {

  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {

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