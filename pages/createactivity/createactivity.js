// pages/createactivity/createactivity.js
const app = getApp()
Page({

  /**
   * Page initial data
   */
  data: {
    st_date: '2019-11-27',
    st_time: '12:00',
    end_date: '2019-12-30',
    end_time: '1:00',

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
    const form = {}
    console.log(event);
    form.name = event.detail.value.name
    form.activityname = event.detail.value.activityname
    form.description = event.detail.value.description
    form.date = event.detail.value.date
    form.user_id = app.globalData.userId
    // console.log(10, form.user_id)
    // console.log(77, form);
    wx.request({
      url: `app.globalData.url`,
      method: 'POST',
      data: form,
      success(res) {
        console.log(res)
        // redirect to index page when done
        wx.reLaunch({
          url: '/pages/myactivities/myactivities',
        })
      }
    });
  },

  //pass form info(host name, activity name, description) ends from here

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

  },


  //starts here, choose image
  ChooseImage() {
      wx.chooseImage({
      count: 4, 
      sizeType: ['original', 'compressed'], 
      sourceType: ['album'], 
      success: (res) => {
        if (this.data.imgList.length != 0) {
          this.setData({
            imgList: this.data.imgList.concat(res.tempFilePaths)
          })
        } else {
          this.setData({
            imgList: res.tempFilePaths
          })
        }
      }
    });
  },
  ViewImage(e) {
    wx.previewImage({
      urls: this.data.imgList,
      current: e.currentTarget.dataset.url
    });
  },
  DelImg(e) {
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