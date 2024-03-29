import Vue from 'vue'
import Router from 'vue-router'
import BarChart from '@/components/BarChart/route'
import PieChart from '@/components/PieChart/route'
import Percentage from '@/components/Percentage/route'

Vue.use(Router)

export default new Router({
  routes: [
    BarChart,
    PieChart,
    Percentage
  ]
})
