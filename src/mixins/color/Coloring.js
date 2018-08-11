export default {
  props: {
    textColor: {
      default: 'black'
    },
    fill: {
      default: 'white'
    },
    stroke: {
      default: 'grey'
    }
  },
  computed: {
    colors () {
      function wrapper (func) {
        if (func instanceof Function) {
          return function (d) {
            return func(d.data)
          }
        } else {
          return func
        }
      }
      return {
        fill: wrapper(this.fill),
        stroke: wrapper(this.stroke),
        text: wrapper(this.textColor)
      }
    }
  }
}
