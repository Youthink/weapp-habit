// pages/rank/rank.js

const utils = require('../../utils/util');
const Server = require('../../utils/service.js');

Page({
  data:{
    TodayDate: utils.formatDate(new Date()),
    ranks:[]
  },
  onLoad:function(options){
    const that = this;
    Server({
      url: 'http://localhost:3001/api/v1/everyday/wake-up-rank',
      dataTransform: function (result) { //适配处理
        if (result.success) {
          that.setData({
            ranks: result.data
          })
        }
      }
    })
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})
