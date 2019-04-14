// pages/ordel/ordel.js
const config=require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabindex: 0,
    tab_list: ['进行中', '已完成'],
    list:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.gitdata()
  },
  select_tab(e) {
    this.setData({
      tabindex: e.currentTarget.dataset.index
    })
    if (this.data.tabindex==0){
      this.gitdata()
    }else{
      this.gitSuccess()
    }
  },
  gitSuccess(){
    config.ajax('POST', {
      token: wx.getStorageSync('user_token')
    }, '/user/my_order_accomplish', res => {
      this.setData({
        list: res.data.data.map((item) => {
          item.order_reservetime = config.timeForm(item.order_reservetime).chatTime
          return item
        })
      })
    })
  },
  gitdata(){
    config.ajax('POST',{
      token:wx.getStorageSync('user_token')
    },'/user/my_order_underway',res=>{
      this.setData({
        list:res.data.data.map((item)=>{
          item.order_reservetime = config.timeForm(item.order_reservetime).chatTime
          return item
        })
      })
    })
  },
  to_res() {
    wx.navigateTo({
      url: '/pages/ordel/ordel_res/ordel_res',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  //找人砍价
  to_bargain() {
    wx.showModal({
      title: '提示',
      content: '这是转发给好友，点击确定查看砍价页演示',
      showCancel: true,
      cancelText: '取消',
      cancelColor: '',
      confirmText: '砍价演示',
      confirmColor: 'rgba(96, 234, 243, 1)',
      success: function (res) {
        if (res.confirm) {
          wx.navigateTo({
            url: '/pages/ordel/bargain/bargain',
            success: function (res) { },
            fail: function (res) { },
            complete: function (res) { },
          })
        }
      },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  //取消订单
  cendel_ordel(){
    wx.showModal({
      title: '提示',
      content: '确定取消订单？',
      showCancel: true,
      success: function (res) {
        if (res.confirm) {
          config.mytoast('取消订单成功!')
        }
      },
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