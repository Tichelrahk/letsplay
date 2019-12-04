//app.js
App({
  onLaunch: function () {
    const url = 'http://localhost:3000/api/v1/'
    console.log('beginning login')
    wx.login({
      success: (res) => {
        console.log(45, res)
        // insert next code here
        wx.request({
          url: url + 'login',
          method: 'post',
          data: {
            code: res.code
          },
          // insert next code here
          success: (res) => {
            console.log(25, res)
            this.globalData.userId = res.data.userId
          }
        })
      }
    })
  },
 
  globalData: {
    url: "http://localhost:3000/api/v1/",
    userInfo: null,
    events: [
      {
        id: 1,
        name: "Soccer with Etienne",
        img_url: "https://vapantherpress.com/wp-content/uploads/2017/12/soccer.jpg",
        description: "What's UP!!! Come join us this Friday for your weekly hit of Soccer Madness with Etienne and his gang. Meet friends, have fun, and grab a snack after with us. Beginners welcome!",
        host: "Etienne B.",
        date: "Friday 2019/12/24",
        time: "19:00-20:30",
        location: "Jing An Tennis Grounds",
        price: "Free",
        level: "Beginner"
      },
      {
        id: 2,
        name: "Saturday Afternoon Tennis",
        img_url: "https://www.diepenbroek.be/sites/diepenbroek/files/tennistegel.jpg",
        description: "Let's play tennis! We host a weekly 8 Player mini-tournament",
        host: "Phillip H.",
        date: "Saturday 2019/12/25",
        time: "13:00-15:00",
        location: "Li Yuan Park",
        price: "¥30",
        level: "Intermediate"
      },
      {
        id: 3,
        name: "Boxing Day Boxing",
        img_url: "https://cn.bing.com/th?id=OIP.xyxowUlASfmIQiKKcF2HEwHaEC&pid=Api&rs=1",
        description: "",
        host: "Joyce E.",
        date: "Saturday 2019/12/26",
        time: "19:00-21:00",
        location: "Doherty's Gym",
        price: "Free",
        level: "Beginner"
      },
    ]
  }
  
})