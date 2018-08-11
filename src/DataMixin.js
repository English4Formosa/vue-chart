let d3 = require('d3')

export default {
  data () {
    let size = 1
    this.count = 0
    return {
      size: 5,
      values: Array(size).fill(0).map(this.genData.bind(this)),
      count: 1,
      width: 500,
      strokeColor: 'red',
      fillColor: 'grey',
      textColor: 'black'
    }
  },
  computed: {
    data () {
      return this.values
    }
  },
  methods: {
    genValue () {
      return Math.floor(Math.random() * 100)
    },
    genData (id) {
      this.count++
      return {
        value: this.genValue(),
        label: 'label ' + this.count
      }
    },
    getColor () {
      let colorIndex = Math.floor(Math.random() * 10)
      return d3.schemeCategory10[colorIndex]
    },
    update () {
      let index = Math.floor(Math.random() * this.values.length)
      let replace = Math.floor(Math.random() * 2)
      this.width = Math.ceil(Math.random() * 200 + 300)
      this.fillColor = this.getColor()
      this.strokeColor = this.getColor()
      this.textColor = this.getColor()

      if (this.values.length < this.size) {
        // insert
        let front = this.values.slice(0, index)
        let rear = this.values.slice(index)
        let values = front.slice()
        values.push(this.genData())
        values = values.concat(rear)
        this.values = values
      } else if (this.values.length === this.size && replace) {
        // replace
        this.values[index].value = this.genValue()
        this.values = this.values.slice()
      } else {
        // delete
        let front = this.values.slice(0, index)
        let rear = this.values.slice(index + 1)
        let values = front.slice()
        values = values.concat(rear)
        this.values = values
      }
    }
  }
}
