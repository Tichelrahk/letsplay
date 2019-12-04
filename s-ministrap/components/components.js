// s-ministrap/components/components.js
Page({

  /**
   * Page initial data
   */
  data: {

  },

  // Custom Nav-Bar Functions Start

  goToEventsIndex: function() {
    console.log('tapped')
    wx.navigateTo({
      url: '/pages/eventsindex/eventsindex',
    })
  },

  goToMyActivities: function() {
    console.log('tapped')
    wx.navigateTo({
      url: '/pages/myactivities/myactivities',
    })
  },

  goToUserShow: function() {
    console.log('tapas')
    wx.navigateTo({
      url: '/pages/usershow/usershow',
    })
  },

  // Custom Nav-Bar Functions End

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {

  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

    // Custom Nav-Bar Functions Start
    const page = this
    page.setData({
      currentPage: page.route
    })
    console.log(page.data)

    // Custom Nav-Bar Functions End
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