let app = getApp()
// pages/activitynearby/activitynearby.js
Page({

  /**
   * Page initial data
   */
  data: {
    lat: 121,
    long: 30,
    controls: [{
      id: 1,
      iconPath: '/images/pin.png',
      position: {
        left: 0,
        top: 300 - 50,
        width: 50,
        height: 50
      },
      clickable: true
    }]
  },

  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    app.globalData.login = true
    this.setData({
      userInfo: e.detail.userInfo
    })
  },

 
  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    const page = this
    console.log('hi')
    wx.getLocation({
      type:'wgs84',
      success(res) {
        const latitude = res.latitude
        const longitude = res.longitude
        const speed = res.speed
        const accuracy = res.accuracy
        page.setData({userLatitude: latitude, userLongitude: longitude})
        console.log('bye')
      },
      fail() {
        page.setData({ userLatitude: 121.00, userLongitude: 30.00})
        console.log('goodbye')
      }
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

  onShow: function (options) {
    let page = this;
    console.log(1, page.options)

    wx.request({
      url: app.globalData.url + `events`,
      success(res) {
        console.log(res)
        const events = res.data.events
        const markers = [];
        let event
        for (event of events){
          let marker = {
            iconPath: "/images/pin.png",
            id: event.id,
            latitude: event.location.latitude,
            longitude: event.location.longitude,
            width: 30,
            height: 30,
            callout: {
              content: `${event.name}`,
              display: 'ALWAYS',
              padding: 2,
              borderRadius: 5,
              fontSize: 14,
              bgColor: "#ffc55c",
              borderWidth: 1,
              textAlign: "center",
              color: "#ee4540",
              borderColor:"#ffc55c"
            
            }

          }
          markers.push(marker)
        }
        console.log(markers)

        
      
        // Update local data
        page.setData({
          events: events,
          // attendees: event.confirmations.length + 1,
          markers
        });

        // console.log(event)

        wx.hideToast();
      }
    });
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

  bindcallouttap: function (e) {
    console.log(e)
    
  },

  markertap: function (event) {
    console.log(event.markerId)
    let {userLatitude, userLongitude} = this.data
    let url =`/pages/eventshow/eventshow?id=${event.markerId}`
    wx.navigateTo({
      url
    })
  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  
  logInUser: function () {
    this.setData({ loggedIn: true })
  },

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