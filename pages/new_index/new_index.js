// pages/new_index/new_index.js
const config = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bannerlist: [],
    zllist:[],
    indicatorDots: true,
    autoplay: true,
    indicatorColor: 'rgba(255, 255, 255, 1)',
    indicatorActiveColor: 'rgba(69, 208, 174, 1)',
    interval: 3000,
    duration: 1000,
    page:1
  },
  look_res(e){
    wx.navigateTo({
      url: '/pages/xq/xq?id=' + e.currentTarget.dataset.id,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getBanner()
    this.getzl()
  },
  to_index(){
    wx.navigateTo({
      url: '/pages/index/index',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  /**
   * 获取轮播图
   */
  getBanner(){
    config.ajax('POST', {
    }, '/index/banner_list', (res) => {
      console.log(res.data.data)
      this.setData({
        bannerlist: res.data.data.map((item) => {
          item.banner_url = 'http://yueke.dazhu-ltd.cn/public/uploads/' + item.banner_url
          return item
        })
      })
    })
  },
  to_web_view(e){
    console.log(e)
    if(e.currentTarget.dataset.url!='#'){
      let s = e.currentTarget.dataset.url.split('?')[0]
      wx.navigateTo({
        url: '/pages/webView/webView?url=' + s + '&id=' + e.currentTarget.dataset.id,
        success: function(res) {},
        fail: function(res) {},
        complete: function(res) {},
      })
    }
  },
  /**
   * 获取资料列表
   */
  getzl(){
    config.ajax('POST', {
      page:this.data.page
    }, '/index/notice_list', (res) => {
      if (res.data.data.length > 0) {
        let list = this.data.zllist
        let page = this.data.page
          let more = res.data.data.map((item) => {
            item.notice_surface = 'http://yueke.dazhu-ltd.cn/public/uploads/' + item.notice_surface
            console.log(item.notice_createtime)
            item.notice_createtime = config.timeForm(item.notice_createtime).chatTime.year + '/' + config.timeForm(item.notice_createtime).chatTime.month + '/' + config.timeForm(item.notice_createtime).chatTime.day
            console.log(item.notice_createtime)
            return item
          })
        console.log(more)
        page++
        list.push.apply(list, more);
        this.setData({
          page: page,
          zllist: list,
        })
      } else {
        app.config.mytoast('暂无更多数据~')
      } 
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
    this.getzl()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})