const app = getApp()
// pages/eventsindex/eventsindex.js
Page({

  /**
   * Page initial data
   */
  data: {
 
  },

  goToIndex: function () {
    wx.redirectTo({
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
    wx.redirectTo({
      url: '/pages/createactivity/createactivity',
    })
  },

  goToProfile: function () {
    wx.redirectTo({
      url: '/pages/usershow/usershow',
    })
  },

  goToMyActivities: function () {
    wx.navigateTo({
      url: '/pages/myactivities/myactivities',
    })
  },


  searchAPICall: function (event) {
    const page = this
    console.log(21, event)
    const query = event.detail.value
    console.log(22, query)
    wx.request({
      url: app.globalData.url + "events" + `?query=${query}`,
      method: 'GET',
      success(res) {
        console.log(11, res)
        const events = res.data.events
        // page.setData({events})
        page.setData({
          events: events
        });
        console.log(10, events)
      }
    })
  },

  goToEventsShow: function (event) {
    console.log(20,event)
    let id = event.currentTarget.dataset.id
    console.log(21, id)
    wx.navigateTo({
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