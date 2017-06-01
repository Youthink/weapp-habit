//index.js
//获取应用实例
const utils = require('../../utils/util');
const Server = require('../../utils/service.js');

const app = getApp()
Page({
  data: {
    TodayDate: utils.formatDate(new Date()),
    userInfo: {}
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  checkWakeUp:function() {
    var that = this
    Server({
      url: 'http://localhost:3001/api/v1/everyday/check-wake-up',
      method: 'POST',
      dataTransform: function (data) { //适配处理
        that.setData({
          wakeUped: data.wakeUp
        })
      }
    })
  },
  onLoad: function () {
    console.log('onLoad')
    this.checkWakeUp();
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
  },
  wakeUp: function(){
    console.log(111);
    var that = this
    Server({
      url: 'http://localhost:3001/api/v1/everyday/wake-up',
      method: 'POST',
      dataTransform: function (data) { //适配处理
        if (data.success){
          that.checkWakeUp();
          wx.navigateTo({
            url: '../rank/rank'
          })
         }
      }
    })
  }
})
