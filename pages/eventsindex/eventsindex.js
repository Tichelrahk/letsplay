const app = getApp()
// pages/eventsindex/eventsindex.js
Page({

  /**
   * Page initial data
   */
  data: {

  },

  goToEventsShow: function (event) {
    // console.log(event)
    let id = event.currentTarget.dataset.id
    wx.switchTab({
      url: `/pages/eventshow/eventshow?id=${id}`,
    })
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
    let page = this;

    wx.request({
      url: app.globalData.url + "events",
      method: 'GET',
      success(res) {
        console.log(10,res)
        const events = res.data
        // page.setData({events})
        page.setData(
          events
        );
        console.log(10, events)
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