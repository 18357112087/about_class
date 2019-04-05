// pages/ordel/ordel_res/ordel_res.js
const config=require('../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  //取消订单
  cendel_ordel(){
    wx.showModal({
      title: '提示',
      content: '确认取消订单？',
      success: function(res) {
        if(res.confirm){
          config.mytoast('订单已取消')
        }
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  //付款
  pay_ordel(){
    wx.showModal({
      title: '提示',
      content: '唤起微信支付',
      success: function (res) {
        if (res.confirm) {
          config.mytoast('支付成功')
        }
      },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  to_teacher_res(){
    wx.navigateTo({
      url: '/pages/index/teacher_index/teacher_index',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
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