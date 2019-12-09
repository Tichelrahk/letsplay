// pages/createactivity/createactivity.js
const app = getApp()
const AV = require('../../utils/av-weapp-min.js')
const config = require('../../keys')
Page({

  goToIndex: function () {
    wx.redirectTo({
      url: '/pages/eventsindex/eventsindex',
    })
  },

  goToBrowse: function () {
    wx.redirectTo({
      url: '/pages/browse/browse',
    })
  },

  goToAbout: function () {
    wx.redirectTo({
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
    wx.redirectTo({
      url: '/pages/myactivities/myactivities',
    })
  },

  bindStartDateChange: function(event){
    this.setData({st_date: event.detail.value})
  },

  bindStartTimeChange: function(event){
    this.setData({ st_time: event.detail.value })
  },

  bindEndDateChange: function (event) {
    this.setData({ end_date: event.detail.value })
  },

  bindEndTimeChange: function (event) {
    this.setData({ end_time: event.detail.value })
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


        page.login


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
    this.setData({
      userInfo: e.detail.userInfo
    })
    this.updateUser(e)
  },




  /**
   * Page initial data
   */

  data: {
    st_date: '2019-12-01',
    st_time: '12:00',
    end_date: '2019-12-01',
    end_time: '13:00',
    arr_of_tags: [ 'badminton', 'tennis', 'soccer', 'football', 'ultimate', 'running' ],

    // map data use, start from here

      markers: [{
      iconPath: "https://image.flaticon.com/icons/svg/1301/1301421.svg",
      id: 0,
        latitude: 31.2235,
        longitude: 121.4453,
      width: 50,
      height: 50
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
      iconPath: 'https://image.flaticon.com/icons/svg/1301/1301421.svg',
      position: {
        left: 0,
        top: 300 - 50,
        width: 50,
        height: 50,
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
//  map data use, ends here
  // pass form info(host name, activity name, description) starts from here
  formSubmit: function (event) {
    const page = this
    const form = {}
    console.log(event);
    form.event = {}
    form.location = {}
    form.event.name = event.detail.value.name
    form.event.description = event.detail.value.description
    form.event.start = `${event.detail.value.start_date} ${event.detail.value.start_time}`
    form.event.end = `${event.detail.value.end_date} ${event.detail.value.end_time}`
    form.location.address = page.data.location.address
    form.location.latitude = page.data.location.latitude
    form.location.longitude = page.data.location.longitude
    form.event.image = page.data.pic
    // console.log(10, form.user_id)
    console.log(77, form);
    wx.request({
      url: app.globalData.url + `events?user_id=${app.globalData.userId}`,
      method: 'POST',
      data: form,
      success(res) {
        console.log(res)
        // redirect to index page when done
        wx.reLaunch({
          url: `/pages/eventshow/eventshow?id=${res.data.event.id}`,
        })
      }
    });
  },

  //pass form info(host name, activity name, description) ends from here

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    const page = this
    wx.getStorage({
      key: 'loggedIn',
      success(res) {
        page.setData({
          userInfo: app.globalData.userInfo,
          login: res
        })
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

  },

  chooseLocation: function () {
    console.log("choosing location")
    const page = this
    wx.chooseLocation({
      success: function(res) {
        page.setData({location: res})
      },
    })
  },


  //starts here, choose image
  chooseImage() {
    const page = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        let tempFilePath = res.tempFilePaths[0];
        new AV.File('file-name', {
          blob: {
            uri: tempFilePath,
          },
        }).save().then(
          file => {
            console.log(1111, file.url())
            page.setData({pic: file.url()})
            }
        ).catch(console.error);
      }
    });
    //   wx.chooseImage({
    //   count: 4, 
    //   sizeType: ['original', 'compressed'], 
    //   sourceType: ['album'], 
    //   success: (res) => {
    //     if (this.data.imgList.length != 0) {
    //       this.setData({
    //         imgList: this.data.imgList.concat(res.tempFilePaths)
    //       })
    //     } else {
    //       this.setData({
    //         imgList: res.tempFilePaths
    //       })
    //     }
    //   }
    // });
  },
  viewImage(e) {
    wx.previewImage({
      urls: this.data.imgList,
      current: e.currentTarget.dataset.url
    });
  },
  delImg(e) {
    wx.showModal({
      title: 'abc',
      content: 'are you sure to delete',
      cancelText: 'think again?',
      confirmText: 'bye bye',
      success: res => {
        if (res.confirm) {
          this.data.imgList.splice(e.currentTarget.dataset.index, 1);
          this.setData({
            imgList: this.data.imgList
          })
        }
      }
    })
  },

  //ends here choose image
})