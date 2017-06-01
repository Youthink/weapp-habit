//app.js
var Server = require('./utils/service.js');
var Cookie = require('./utils/cookie.js');

function parseCookie(cookie) {
  const array = cookie.split(';');
  const str = array.map((i) => { return i.split('=') });
  let obj = {};
  str.map((i) => { const j = i[0].trim(); return obj[j] = decodeURIComponent(i[1]) })
  return obj;
} 

App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function (loginRes) {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
              if (loginRes.code) {
                //登录状态
                Server({
                  url: 'http://localhost:3001/api/v1/wx/login/',
                  method:'POST',
                  params: {
                    code: loginRes.code,
                    userInfo: that.globalData.userInfo
                  },
                  dataTransform: function (data) { //适配处理
                    const obj = parseCookie(data.cookie);
                    const iYearn = obj['iYearn'];
                    Cookie.set('iYearn', iYearn);
                  }
                })
              } else {
                console.log('获取用户登录态失败！' + loginRes.errMsg)
              }
            }
          });
        }
      })
    }
  },
  globalData:{
    userInfo:null
  }
})