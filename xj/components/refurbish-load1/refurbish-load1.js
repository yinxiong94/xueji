// components/refurbish-load/refurbish-load.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    upperThreshold: {                   // 距离顶部多少时 触发 upper
      type: Number,
      value: 50
    },
    lowerThreshold: {                   // 距离底部多少时 触发 lower
      type: Number,
      value: 50
    },
    angle: {                            // 指定角度内可以移动
      type: Number,
      value: .5
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    refurbish: 'top',                        // 是否开启下拉刷新 true 是 false 否
    scrollHight: 0,       // scroll-view高度
    animateStart: false   // 是否开始动画
  },

  /**
   * 组件的方法列表
   */
  ready() {
    // 获取scrollView高度
    const query = wx.createSelectorQuery().in(this)
    query.select('.scroll-view').boundingClientRect(rect => {
      this.setData({ scrollHight: rect.height })
    }).exec()
  },
  methods: {
    _start: function (e) {                 // 记录开始位置
      // console.log(e, '_start');
      this.data.startClientX = Math.abs(e.changedTouches[0].clientX);
      this.data.startClientY = Math.abs(e.changedTouches[0].clientY);
    },
    _move: function (e) {                  // 是否进行移动
      // console.log(e, '_move');
      if (this.data.refurbish === 'center') return
      this.data.animateStart = true
      var clientX = Math.abs(e.changedTouches[0].clientX),
        clientY = Math.abs(e.changedTouches[0].clientY),
        startClientX = this.data.startClientX,
        startClientY = this.data.startClientY,
        upperThreshold = this.data.upperThreshold,
        defaultAngle = this.data.angle;
      var angle = (clientX - startClientX) / (clientY - startClientY);
      if (Math.abs(angle) < defaultAngle) {
        let moveDistance = (clientY - startClientY) / 2;
        if (
          (moveDistance < 0 && this.data.refurbish === 'top') ||
          (moveDistance > 0 && this.data.refurbish === 'bottom')
        ) return false;             // 阻止反向滑出
        this.setData({
          translateY: moveDistance,
          animateStatus: false
        })
      }
    },
    _end: function (e) {                    // 手势是否离开界面
      // console.log(e, '_end');
      if (!this.data.animateStart) return
      this.data.refurbish === 'top' && this.triggerEvent('scrolltoupper')
      this.data.refurbish === 'bottom' && this.triggerEvent('scrolltolower')
      this.setData({
        animateStatus: true,
        translateY: this.data.refurbish === 'top' ? 50 : -50
      })
      setTimeout(() => {
        this.setData({
          translateY: 0,
          animateStatus: true,
        })
        this.data.animateStart = false
      }, 1500)
    },
    _upper: function (e) {                    // 滚动到顶部触发
      // console.log(e, '_upper');
      // this.data.refurbish = true;
    },
    _lower: function (e) {                    // 滚动到底部触发
      // console.log(e, '_lower');
      // this.triggerEvent('scrolltolower');
    },
    _scroll: function (e) {                     // 是否滚动到顶部
      // console.log(e, '_scroll');
      const upperThreshold = this.data.upperThreshold
      const lowerThreshold = this.data.lowerThreshold
      const viewHeight = this.data.scrollHight
      if (e.detail.scrollTop + viewHeight + lowerThreshold > e.detail.scrollHeight) this.data.refurbish = 'bottom'
      else if (e.detail.scrollTop < upperThreshold) this.data.refurbish = 'top'
      else this.data.refurbish = 'center'
      console.log(this.data.refurbish)
    }
  }
})
