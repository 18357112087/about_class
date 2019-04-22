// pages/ordel/ordel_res/ordel_res.js
const config=require('../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    default_src: 'http://yueke.dazhu-ltd.cn/public/uploads//default/user_default.png',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.order_id
    })
    this.get_init_data(options.order_id)
  },
  //获取订单信息
  get_init_data(id){
    config.ajax('POST',{
      token:wx.getStorageSync('user_token'),
      order_id:id
    },'/user/order_info',res=>{
      console.log(res)
      let data=res.data.data
      data.startTime = config.timeForm(data.order_reservetime).chatTime.hour + ':' + config.timeForm(data.order_reservetime).chatTime.minute
      data.endTime = config.timeForm(data.order_reservetime + data.order_duration * 3600).chatTime.hour + ':' + config.timeForm(data.order_reservetime + data.order_duration * 3600).chatTime.minute
      data.order_reservetime = config.timeForm(data.order_reservetime).chatTime
      data.order_createtime = config.timeForm(data.order_createtime).btTime
      this.setData({
        info: data
      })
    })
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
    if (this.data.info.order_status==1){
      wx.navigateTo({
        url: '/pages/index/select_teacher/select_teacher?order_id=' + this.data.info.order_id,
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
      })
    } else if (this.data.info.order_status == 3){
      //付款
        config.ajax('POST', {
          token: wx.getStorageSync('user_token'),
          order_id: this.data.info.order_id
        }, '/order/pay_order', res => {
          config.mytoast('支付成功!', res => {
            setTimeout(() => {
              this.get_init_data(this.data.id)
            }, 1000)
          })
        })
    
    }else{
      //去评价
        wx.navigateTo({
          url: '/pages/evaluate/evaluate?order_id=' + this.data.info.order_id,
          success: function (res) { },
          fail: function (res) { },
          complete: function (res) { },
        })
      
    }
    // wx.showModal({
    //   title: '提示',
    //   content: '唤起微信支付',
    //   success: function (res) {
    //     if (res.confirm) {
    //       config.mytoast('支付成功')
    //     }
    //   },
    //   fail: function (res) { },
    //   complete: function (res) { },
    // })
  },
  to_teacher_res(e){
    wx.navigateTo({
      url: '/pages/index/teacher_index/teacher_index?id=' + this.data.info.teacher_id,
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