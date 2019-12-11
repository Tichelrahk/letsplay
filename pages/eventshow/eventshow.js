// pages/eventshow/eventshow.js
// pages/myactivities/myactivities.js
let app = getApp()
Page({
    data: {
      // markers: [{
      //   iconPath: "https://image.flaticon.com/icons/svg/787/787535.svg",
      //   id: 0,
      //   latitude: event.location.latitude,
      //   longitude: event.location.longitude,
      //   width: 30,
      //   height: 30
      // }],

    // polyline: [{
    //   points: [{
    //     longitude: event.location.longitude,
    //     latitude: event.location.latitude
    //   }, {
    //       longitude: event.location.longitude,
    //       latitude: event.location.latitude
    //   }],
    //   color: "#FF0000DD",
    //   width: 2,
    //   dottedLine: true
    // }],


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

  regionchange(e) {
    console.log(e.type)
  },

  markertap(e) {
    console.log(e.markerId)
  },

  controltap(e) {
    console.log(e.controlId)
  },


  toastWelcome: function () {
    wx.showToast({
      title: 'Joined!',
    })
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
        page.onShow()

      }
    })
  },


  logInUser: function () {
    wx.setStorage({
      key: "loggedIn",
      data: "true"
    })
  },

  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.logInUser()
    this.setData({
      userInfo: e.detail.userInfo
    })
    this.updateUser(e)
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
      url: '/pages/activitynearby/activitynearby',
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


  joining: function () {
    
    const page = this
    const join = {}
    console.log(55, page.data.event.id)
    console.log(9, app.globalData)
    wx.request({


      url: app.globalData.url + `events/${page.data.event.id}/confirmations?user_id=${app.globalData.userId}`,

      method: 'POST',
      data: join,
      success(res) {
        console.log(res)
        page.toastWelcome()
        page.onShow()
      }
    })
  },

  deleteConfirmation: function () {
    const page = this
    wx.request({
      url: app.globalData.url + `events/${page.data.event.id}/confirmations?user_id=${app.globalData.userId}`,
      method: 'DELETE',
      success(res){
        page.onShow()
      }
    })
  },
  
// < !--favorite button start--do not delete -->
  toggleFavorites : function (){
    const page = this
    page.setData({liked: !page.data.liked})
    let event_id = page.data.event.id
    const favorite = { event_id: event_id }
    const userId = parseInt(app.globalData.userId);
    console.log('userId', userId)
    wx.request({
      url: app.globalData.url + `favorites?user_id=${userId}`,
      method: 'POST',
      data: favorite,
      success(res){
        console.log(32, res)
       page.onShow()
      }
    })
  },
// < !--favorite button start--do not delete -->
  /**
   * Page initial data

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    // this.setData({
    //   event: getApp().globalData.events[parseInt(options.id) - 1]
    // })
    this.options = options
    console.log(2, options)
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
    wx.getStorage({
      key: 'loggedIn',
      success(res) {
        page.setData({
          userInfo: app.globalData.userInfo,
          login: res.data
        })
      }
    })
    wx.request({
      url: app.globalData.url+`events/${page.options.id}?user_id=${app.globalData.userId}`,
      success(res) {

        console.log(res)
        const event = res.data.event
        const markers = [{
        iconPath: "/images/pin.png",
        id: 0,
        latitude: event.location.latitude,
        longitude: event.location.longitude,
        width: 30,
        height: 30
      }];
        // Update local data
        page.setData({
          event: event,
          attendees: event.confirmations.length + 1,
          joined: (event.joined || event.organized),
          favorited: event.favorited,
          full: event.full,
          markers
        });

        console.log(event)

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
