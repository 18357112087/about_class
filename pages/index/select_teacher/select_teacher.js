// pages/index/select_teacher/select_teacher.js
const config=require('../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [1,2,3,4,5]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

 
  },
  //获取匹配的老师
  getTeachers(){
    config.ajax('POST', {
      token: '',   //token
      order_id: ''  //订单id
    }, '/order/select_teacher', res => {
      setTimeout(() => {
        this.setData({
          list: res.data.data
        })
      }, 3000)
    })
  },
  to_teacherRes(){
    wx.navigateTo({
      url: '/pages/ordel/ordel_sure/ordel_sure',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})