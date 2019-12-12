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

  switch1Change: function (e) {
    console.log(e)
    this.setData({ private: e.detail.value })
  },

  selectTag: function (event) {
    console.log('help', event)
    let new_arr = this.data.arr_of_tags
    const tag = event.currentTarget.dataset.tag

    const selectedTag = new_arr.find((x) => x['key'] == tag)
    selectedTag.selected = true
    this.setData({arr_of_tags:  new_arr})
  },

  deselectTag: function (event) {
    let new_arr = this.data.arr_of_tags
    const tag = event.currentTarget.dataset.tag
    const selectedTag = new_arr.find((x) => x['key'] == tag)
    selectedTag.selected = false
    this.setData({ arr_of_tags: new_arr })
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





  /**
   * Page initial data
   */

  data: {
    st_date: '2019-12-11',
    st_time: '12:00',
    end_date: '2019-12-11',
    end_time: '13:00',
    arr_of_tags: [ {key: "badminton", num: 0, selected: false },
       {key: "baseball", num: 1, selected: false },
       {key: "bowling", num: 2, selected: false },
       {key: "boxing", num: 3, selected: false },
       {key: "cricket", num: 4, selected: false },
       {key: "cycling", num: 5, selected: false },
       {key: "dancing", num: 6, selected: false },
       {key: "exercise", num: 7, selected: false },
       {key: "football", num: 8, selected: false },
       {key: "gym", num: 9, selected: false },
       {key: "health", num: 10, selected: false },
       {key: "hiking", num: 11, selected: false },
       {key: "hockey", num: 12, selected: false },
       {key: "martial arts", num: 13, selected: false },
       {key: "running", num: 14, selected: false },
       {key: "skating", num: 15, selected: false },
       {key: "skiing", num: 16, selected: false },
       {key: "soccer", num: 17, selected: false },
       {key: "swimming", num: 18, selected: false },
       {key: "table tennis", num: 19, selected: false },
       {key: "tennis", num: 20, selected: false },
       {key: "ultimate", num: 21, selected: false },
       {key: "volleyball", num: 22, selected: false },
       {key: "yoga", num: 23, selected: false },
       {key: "other", num: 24, selected: false }],

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
    form.event.tag_list = page.data.arr_of_tags.filter((x) => x['selected'] == true).map((x) => x.key)
    form.event.slots = parseInt(event.detail.value.slots)
    form.event.private = page.data.private
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
          url: `/pages/eventshow/eventshow?id=${res.data.event}`,
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
          login: res.data
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
        console.log(page.data.location)
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