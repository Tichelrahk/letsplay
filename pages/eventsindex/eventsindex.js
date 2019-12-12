const app = getApp()
// pages/eventsindex/eventsindex.js
Page({
 
  /**
   * Page initial data
   */
  data: {
    cardCur: 0,
    swiperList: [{
      id: 0,
      type: 'image',
      url: '/images/letsplay.jpg'
    // }, {
    //   id: 1,
    //   type: 'image',

    //     url: 'http://lc-dnc55p3h.cn-e1.lcfile.com/b4caf34d221f1f21a992',


    // }, {
    //   id: 2,
    //   type: 'image',
    //     url: 'http://lc-dnc55p3h.cn-e1.lcfile.com/8b0df180e28b93f77bda'
    // }, {
    //   id: 3,
    //   type: 'image',

    //     url: 'http://lc-dnc55p3h.cn-e1.lcfile.com/d555fd134a6edbbba43e'
    // }, {
    //   id: 4,
    //     type: 'image',
    //     url: 'http://lc-dnc55p3h.cn-e1.lcfile.com/5822d9e7420e5e7496af'
    // }, {
    //   id: 5,
    //   type: 'image',
    //     url: 'http://lc-dnc55p3h.cn-e1.lcfile.com/c317eb224c2968d53d9b'
    // }, {
    //   id: 6,
    //   type: 'image',
    //     url: 'http://lc-dnc55p3h.cn-e1.lcfile.com/b9546a70488f6adc2628'
    }],

  },
  onLoad() {
    this.towerSwiper('swiperList');
    // 初始化towerSwiper 传已有的数组名即可
    wx.loadFontFace({
      family: "Kaushan Script",
      source: 'url("http://lc-dnc55p3h.cn-e1.lcfile.com/09e1fc0896d8febebfa9/KaushanScript-Regular.ttf")',
      success: (res) => {
        console.log('font load sucess', res)
      }
    })
  },

 

  goToIndex: function () {
    wx.redirectTo({
      url: '/pages/eventsindex/eventsindex',
    })
  },

  goToBrowse: function () {
    wx.redirectTo({
      url: '/pages/activitynearby/activitynearby',
    })
  },

  goToAbout: function () {
    wx.redirectTo({
      url: '/pages/activitynearby/activitynearby',
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
    wx.redirectTo({
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

  DotStyle(e) {
    this.setData({
      DotStyle: e.detail.value
    })
  },

  cardSwiper(e) {
    this.setData({
      cardCur: e.detail.current
    })
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