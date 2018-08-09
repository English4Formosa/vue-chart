export default {
  data () {
    let size = 8
    return {
      size,
      values: Array(size).fill(1),
      count: 0,
      width: 500
    }
  },
  created () {
    this.values = this.values.map(this.genData.bind(this))
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
    genData () {
      this.count++
      return {
        value: this.genValue(),
        label: 'label ' + this.count
      }
    },
    update () {
      let index = Math.floor(Math.random() * this.values.length)
      let insert = Math.floor(Math.random() * 2)
      this.width = Math.ceil(Math.random() * 200 + 300)

      if (this.values.length <= this.size && insert) {
        let front = this.values.slice(0, index)
        let rear = this.values.slice(index + 1)
        let values = front.slice()
        values.push(this.genData())
        values = values.concat(rear)
        this.values = values
      } else if (this.values.length <= this.size) {
        this.values[index].value = this.genValue()
        this.values = this.values.slice()
      } else {
        let front = this.values.slice(0, index)
        let rear = this.values.slice(index + 1)
        let values = front.slice()
        values = values.concat(rear)
        this.values = values
      }
    }
  }
}
