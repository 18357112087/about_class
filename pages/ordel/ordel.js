// pages/ordel/ordel.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabindex:0,
    tab_list:['进行中','已完成']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  select_tab(e){
    this.setData({
      tabindex: e.currentTarget.dataset.index
    })
    
  },
  to_res(){
    wx.navigateTo({
      url: '/pages/ordel/ordel_res/ordel_res',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  //去砍价
  to_bargain(){
    wx.navigateTo({
      url: '/pages/ordel/bargain/bargain',
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