// pages/my/my.js
const config=require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    default_src: 'http://yueke.dazhu-ltd.cn/public/uploads//default/user_default.png',
    userInfo:null,
    ordel_count:0,
    teacher_count:0
  },
  to_wallet() {
    wx.navigateTo({
      url: '/pages/income/income',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  call(){
    config.ajax('POST',{

    },'/index/service_phone',res=>{
      wx.makePhoneCall({
        phoneNumber:res.data.data.url,
        success: function(res) {},
        fail: function(res) {},
        complete: function(res) {},
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  //跳转到老师小程序
  to_teacher(){
    config.mytoast('这是跳转到老师小程序')
  },
  //获取个人信息
  get_userInfo(){
    config.ajax('POST',{
      token:wx.getStorageSync('user_token')
    },'/user/user_info',res=>{
      this.setData({
        userInfo:res.data.data
      })
    })
  },
  //我的老师
  get_myteacher(){
    config.ajax('POST', {
      token: ''
    }, '/user/my_teacher', res => {
      this.setData({
        teacher: res.data.data
      })
    })
  },
  to_myteacher(){
    wx.navigateTo({
      url: '/pages/my/my_teacher/my_teacher',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  to_feed_back(){
    wx.navigateTo({
      url: '/pages/feed_back/feed_back',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  to_my_details(){
    wx.navigateTo({
      url: '/pages/my/my_details/my_details',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  to_about_us(){
    wx.navigateTo({
      url: '/pages/my/about_us/about_us',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  to_ordel(){
    wx.switchTab({
      url: '/pages/ordel/ordel',
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
    this.setData({
      userInfo: wx.getStorageSync('userInfo')
    })
    this.get_ordel_count()
    this.get_balance()
  },
  //获取订单数量
  get_ordel_count() {
    config.ajax('POST', {
      token: wx.getStorageSync('user_token')
    }, '/user/my_order_count', res => {
      this.setData({
        ordel_count: res.data.data.order_count
      })
    })
  },
  //获取我的老师
  get_balance() {
    config.ajax('POST', {
      token: wx.getStorageSync('user_token')
    }, '/user/my_teacher_count', res => {
      this.setData({
        teacher_count: res.data.data.teacher_count
      })
    })
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