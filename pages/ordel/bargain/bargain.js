// pages/ordel/bargain/bargain.js
const config = require('../../../utils/util.js')
const ctx = wx.createCanvasContext('myCanvas');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    default_src: 'https://pay.tchhkj.com/public/uploads//default/user_default.png',
    mask: false,
    imglist: ['http://class.zzvlm.com/2017041969914926076563635@2x.png', 'http://class.zzvlm.com/37861@2x.png', 'http://img.zcool.cn/community/019b7e5bbe34c9a801213dea292f6e.png@2o.png', 'http://class.zzvlm.com/123551@2x.png', 'https://fapiao.gaodun.com/Public/cma/x_bg.png'],
    name: '仇益阳',
    tip: '活泼可爱',
    school: '北大',
    _class: '计算机'
  },
  hide_mask() {
    this.setData({
      mask: !this.data.mask
    })
  },
  look_res() {
    wx.navigateTo({
      url: '/pages/ordel/ordel_res/ordel_res',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      order_id: options.order_id
    })
    this.git_init(options.order_id)
  },
  git_init(id) {
    config.ajax('POST', {
      token: wx.getStorageSync('user_token'),
      order_id: id
    }, '/order/bargain_list', res => {
      this.setData({
        info: res.data.data,
        name: res.data.data.user_nickname,
        'imglist[2]': res.data.data.user_portrait == '' ? 'https://pay.tchhkj.com/public/uploads/default/user_default.png' : 'https://pay.tchhkj.com/public/uploads/' + res.data.data.user_portrait
      })
    })
  },
  show_mask() {
    config.ajax('POST', {
      token: wx.getStorageSync('user_token'),
      order_id: this.data.order_id
    }, '/order/order_bargain', res => {
      this.git_init(this.data.order_id)
      config.mytoast('砍价成功,即将生成砍价小程序码', (res) => {
        wx.showLoading({
          title: '正在生成图片',
        })
        config.ajax('POST', {
          token: wx.getStorageSync('user_token'),
          order_id: this.data.order_id
        }, '/user/user_qrcode', res => {
          console.log('https://pay.tchhkj.com/public/uploads/' + res.data.data)
          // this.setData({
          //   'imglist[0]': 'https://pay.tchhkj.com/public/uploads/' + res.data.data
          // })
          this.downImg(this.data.imglist)
        })
      })

    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    let that = this
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          systemInfo: res,
          rem: res.screenWidth / 750
        })
      }
    })
  },
  rem(int) {
    return int * this.data.rem
  },
  downImg(list) {
    var that = this
    let imglist = []
    let n = 0

    function up() {
      wx.downloadFile({
        url: list[n],
        success: (res) => {
          if (res.statusCode == 200) {
            imglist.push(res.tempFilePath)
            n++
            if (n == list.length) {
              that.setData({
                newList: imglist,
              })

              that.Canvas(that)
            } else {
              up(n)
            }
          }
        }
      })
    }
    up()
  },
  /**
   * 创建画布内容
   */
  Canvas(that) {
    var that = this
    //绘制背景
    ctx.drawImage(that.data.newList[1], 0, 0, that.rem(528), that.rem(480));
    ctx.drawImage(that.data.newList[4], 0, that.rem(480), that.rem(528), that.rem(204));
    //绘制小程序二维码
    ctx.drawImage(that.data.newList[0], that.rem(128), that.rem(28), that.rem(272), that.rem(272));
    //绘制头像
    ctx.save()
    ctx.beginPath();
    ctx.arc(that.rem(96) / 2 + that.rem(34), that.rem(96) / 2 + that.rem(480 + 54), that.rem(96) / 2, 0, Math.PI * 2, false);
    ctx.clip()
    ctx.drawImage(that.data.newList[2], that.rem(34), that.rem(480 + 54), that.rem(96), that.rem(96))
    ctx.restore();
    //绘制扫码帮我
    ctx.setFontSize(that.rem(34))
    ctx.setTextAlign('left')
    ctx.setFillStyle('#FFFFFF')
    ctx.fillText('扫码帮我', that.rem(196), that.rem(360))
    //绘制砍价
    ctx.setFontSize(that.rem(65))
    ctx.setTextAlign('left')
    ctx.setFillStyle('#FFFFFF')
    ctx.fillText('砍价', that.rem(196), that.rem(430))
    //绘制用户名
    ctx.setFontSize(that.rem(34))
    ctx.setTextAlign('left')
    ctx.setFillStyle('#2C2C2C')
    ctx.fillText(that.data.name, that.rem(146), that.rem(480 + 54 + 55))
    //绘制用户标签
    // ctx.setFillStyle('#60EAF3')
    // ctx.fillRect(that.rem(160) + ctx.measureText(that.data.name).width, that.rem(480 + 54 + 42 - 30), that.rem(128), that.rem(40))
    // ctx.setFontSize(that.rem(24))
    // ctx.setTextAlign('left')
    // ctx.setFillStyle('#FFFFFF')
    // ctx.fillText(that.data.tip, that.rem(160 + 45) + ctx.measureText(that.data.name).width, that.rem(480 + 54 + 42), that.rem(128))
    //绘制学院信息
    // ctx.setFontSize(that.rem(22))
    // ctx.setTextAlign('left')
    // ctx.setFillStyle('#999999')
    // ctx.fillText(that.data.school + ' · ' + that.data._class, that.rem(146), that.rem(480 + 54 + 42+40))
    ctx.draw(true)
    wx.hideLoading()
    that.setData({
      mask: true
    })
  },
  re_index() {
    wx.switchTab({
      url: '/pages/index/index',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  save() {
    var that = this
    wx.showLoading({
      title: '正在保存...',
      mask: true,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
    setTimeout(function () {
      wx.canvasToTempFilePath({
        x: 0,
        y: 0,
        width: that.rem(528),
        height: that.rem(684),
        canvasId: 'myCanvas',
        success: function (res) {
          wx.saveImageToPhotosAlbum({
            filePath: res.tempFilePath,
            success(res) {
              wx.hideLoading()
              wx.showToast({
                title: '保存成功!',
                icon: '',
                image: '',
                duration: 2000,
                mask: true,
                success: function (res) { },
                fail: function (res) { },
                complete: function (res) { },
              })
            },
            fail(res) { },
            complete(res) { }
          })
        }
      })
    }, 1500)
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
    return config.shareData

  }
})