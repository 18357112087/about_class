// pages/userport/login/login.js
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    codeStatua: '发送', //验证码状态
    code_tips: false,
    pic_code_wrap: false, //图形验证器
    imgUrl: app.ImageHost, //图片前缀
    phone: '', //手机号
    code: '', //验证码
    picCode: '', //图片验证码
    erroCode: false,
    text: ''
  },
  close_code() {
    //关闭图片验证
    this.setData({
      pic_code_wrap: !this.data.pic_code_wrap
    })
  },
  getPhone(e) {
    //获取手机号
    this.setData({
      phone: e.detail.value
    })
  },
  getPicCode(e) {
    //获取图片验证码输入
    this.setData({
      picCode: e.detail.value
    })
  },
  getCode(e) {
    //获取短信验证码
    this.setData({
      code: e.detail.value
    })
  },
  randomNum(min, max) {
    return Math.floor(Math.random() * (max - min) + min)
  },
  /**生成一个随机色**/
  randomColor(min, max) {
    var r = this.randomNum(min, max)
    var g = this.randomNum(min, max)
    var b = this.randomNum(min, max)
    return 'rgb(' + r + ',' + g + ',' + b + ')'
  },

  /**绘制验证码图片**/
  drawPic(that) {
    var ctx = wx.createCanvasContext('canvas')
    /**绘制背景色**/
    ctx.fillStyle = this.randomColor(180, 240) //颜色若太深可能导致看不清
    var s, t
    app.config.remW(200, res => {
      s = res
    })
    app.config.remW(92, res => {
      t = res
    })
    ctx.fillRect(0, 0, s, t)
    /**绘制文字**/
    var arr
    var text = ''
    var str = 'qwertyuiopasdfghjklzxcvbnm123456789'
    for (var i = 0; i < 4; i++) {
      var txt = str[this.randomNum(0, str.length)]
      ctx.fillStyle = this.randomColor(50, 160) //随机生成字体颜色
      ctx.font = this.randomNum(25, 30) + 'px SimHei' //随机生成字体大小
      var x = 5 + i * 20
      var y = this.randomNum(20, t / 2)
      var deg = this.randomNum(-20, 20)
      //修改坐标原点和旋转角度
      ctx.translate(x, y)
      ctx.rotate((deg * Math.PI) / 180)
      ctx.fillText(txt, 10, t / 4)
      text = text + txt
      //恢复坐标原点和旋转角度
      ctx.rotate((-deg * Math.PI) / 180)
      ctx.translate(-x, -y)
    }
    /**绘制干扰线**/
    for (var i = 0; i < 4; i++) {
      ctx.strokeStyle = this.randomColor(40, 180)
      ctx.beginPath()
      ctx.moveTo(this.randomNum(0, s), this.randomNum(0, t))
      ctx.lineTo(this.randomNum(0, s), this.randomNum(0, t))
      ctx.stroke()
    }
    /**绘制干扰点**/
    for (var i = 0; i < 20; i++) {
      ctx.fillStyle = this.randomColor(0, 255)
      ctx.beginPath()
      ctx.arc(this.randomNum(0, s), this.randomNum(0, t), 1, 0, 2 * Math.PI)
      ctx.fill()
    }
    ctx.draw(false, function () {
      console.log(text)
      that.setData({
        text: text
      })
    })
  },
  change: function () {
    var that = this
    this.drawPic(that)
  },
  index_page() {
    // if (this.data.picCode != this.data.text) {
    //   this.setData({
    //     erroCode: true
    //   })
    //   this.change()
    //   return false
    // } else {
    //   this.setData({
    //     erroCode: false
    //   })
    // }
    //验证码读秒并关闭图片验证
    if (this.data.codeStatua == '发送') {
      app.config.ajax(
        'POST',
        {
          phone: this.data.phone
        },
        'doctor/login/send_message',
        res => {
          // this.setData({
          //   pic_code_wrap: !this.data.pic_code_wrap
          // })
          this.setData({
            codeStatua: 60,
            code_tips: true
          })
          let st = setInterval(() => {
            let n = this.data.codeStatua--
            if (n == 1) {
              this.setData({
                codeStatua: '发送'
              })
              clearInterval(st)
            } else {
              n--
              this.setData({
                codeStatua: n
              })
            }
          }, 1000)
        }
      )
    }
  },
  login_btn(res) {
    //登陆输入判断成功
    if (!/^1[34578]\d{9}$/.test(this.data.phone)) {
      app.config.mytoast('请输入正确的手机号!')
      return false
    }
    if (this.data.code == '') {
      app.config.mytoast('请输入短信验证码!')
      return false
    }
    app.config.ajax(
      'POST',
      {
        sell_id: app.globalData.sell_id,
        phone: this.data.phone,
        code: this.data.code
      },
      'doctor/login/doctor_login',
      res => {
        app.globalData.user_token = res.data.data.doctor_token
        wx.setStorage({
          key: 'user_token',
          data: res.data.data.doctor_token,
          success: function (res) {
            wx.switchTab({
              url: '/pages/doctor/index/index'
            })
          },
          fail: function (res) { },
          complete: function (res) { }
        })
      }
    )
    // wx.switchTab({
    //   url: '/pages/userport/index/index',
    // })
  },

  SendCode: function () {
    var that = this
    this.drawPic(that)
    //开启图片验证码验证
    if (!/^1[34578]\d{9}$/.test(this.data.phone)) {
      //验证手机号
      app.config.mytoast('请输入正确的手机号!')
      return false
    }

    if (this.data.codeStatua == '发送') {
      // this.setData({
      //   pic_code_wrap: true
      // })
      this.index_page()
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    this.drawPic(that)
    if (options.scene != undefined && options.scene != null) {
      const url = decodeURIComponent(options.scene).split('=')

      app.globalData.sell_id = url[1]

    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () { },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () { },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () { },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () { },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () { },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () { },

  /**
   * 用户点击右上角分享
   */
  //onShareAppMessage: function () { }
})
