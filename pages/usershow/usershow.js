// pages/usershow/usershow.js
const app = getApp()
Page({

  goToAddServ: function (e) {
    console.log(e)
    const id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/myactivities/myactivities`
    })
  },
  /**
   * Page initial data
   */
  data: {
    markers: [{
      iconPath: "https://image.flaticon.com/icons/svg/787/787535.svg",
      id: 0,
      latitude: 31.2235,
      longitude: 121.4453,
      width: 30,
      height: 30
    }],
    polyline: [{
      points: [{
        longitude: 121.4453,
        latitude: 31.2235
      }, {
          longitude: 121.4453,
          latitude: 31.2235
      }],
      color: "#FF0000DD",
      width: 2,
      dottedLine: true
    }],
    controls: [{
      id: 1,
      iconPath: 'https://image.flaticon.com/icons/svg/787/787535.svg',
      position: {
        left: 0,
        top: 300 - 50,
        width: 50,
        height: 50
      },
      clickable: true
    }]
  },
  regionchange(e) {
    console.log(e.type)
  },
  markertap(e) {
    console.log(e.markerId)
  },
  controltap(e) {
    console.log(e.controlId)
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
    const page = this
    wx.request({
      url: app.globalData.url + "users/" + `${"1"}`,
      method: 'GET',
      success(res) {
        console.log(11, res)
        const user = res.data
        // page.setData({events})
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