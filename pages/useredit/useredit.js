const app = getApp()
// pages/useredit/useredit.js
Page({

  /**
   * Page initial data
   */

  formSubmit: function (e) {
    console.log(e.detail.value)
  },
  formReset: function () {
    console.log()
  },

    data: {
    },

  formSubmit: function (event) {
    const form = {}
    console.log(event);
    form.name = user.detail.value.name
    form.bio = user.detail.value.description
    form.image = event.detail.value.profile_picture
    form.user_id = app.globalData.userId
    wx.request({
      url: app.globalData.url + `users`,
      method: 'GET',
      data: form,
      success(res) {
        this.setData({
          user: res.data         
        })
      }
    });
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    this.setData({ options: options })
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

    // const loginData = wx.getStorageSync("login");
    // Utils.requestFn({
    //   url: '/index.php/modifygetuser?server=1',
    //   data: {
    //     sdk: loginData.sdk,
    //     uid: loginData.uid
    //   },
    //   success: function (res) {
    //     const data = res.user;
    //     const imgsrc = res.image != null ? Utils.url + res.image : this.data.images;
    //        this.setData({
    //         name: res.nickname,
    //         images: imgsrc,
    //       })
    //   }
    // })

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

  uploadFn: function () {  
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
          file => console.log(1111, file.url())
        ).catch(console.error);
      }
    }); 
  },

  })