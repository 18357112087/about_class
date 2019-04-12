// pages/my/my_details/my_details.js
const config = require('../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    sex_index:0,
    sex_list: [{
      label: '男',
      value: 1
    }, {
      label: '女',
      value: 2
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.get_userInfo()
  },
  //选择性别
  bindchange(e){
    console.log(e)
    this.setData({
      sex_index: e.detail.value
    })
  },
  //获取个人信息
  get_userInfo() {
    config.ajax('POST', {
      token: wx.getStorageSync('user_token')
    }, '/user/user_info', res => {
      this.setData({
        userInfo: res.data.data
      })
    })
  },
  user_val() {
    config.mytoast('点此换头像')
  },
  user_name() {
    config.mytoast('点此编辑昵称')
  },
  user_sex() {
    config.mytoast('点此更改性别')
  },
  user_age() {
    config.mytoast('点此换年龄')
  },
  out() {
    config.mytoast('点此退出')
  },
  bind_phone() {
    wx.navigateTo({
      url: '/pages/bind_phone/bind_phone',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  to_adder() {
    wx.navigateTo({
      url: '/pages/my/my_adder/my_adder',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
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