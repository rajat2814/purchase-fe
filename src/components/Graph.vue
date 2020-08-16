<template>
  <div class="chart-wrapper">
    <div class="parent">
      <h4 class="child">Start Date</h4>
      <vueye-datepicker class="child" v-model="startDate" color="#4466ee" format="dd/mm/yyyy" />
    </div>
    <div class="parent">
      <h4 class="child">End Date</h4>
      <vueye-datepicker class="child" v-model="endDate" color="#4466ee" format="dd/mm/yyyy"/>
    </div>
    <div class="parent">
      <button class="button child" @click="filterData()">Filter</button>
    </div>
    <chart :options="chartOptionsBar"></chart>
  </div>
</template>

<script>

import { appAxios } from "@/plugins/axios";
import 'echarts/lib/component/title';
import VueyeDatepicker from "vueye-datepicker";

export default {
  name: 'Graph',
  components: {
    VueyeDatepicker
  },
  data: () => ({
    startDate: {
      value: new Date(),
      formattedValue:''
    },
    endDate: {
      value: new Date(),
      formattedValue:''
    },
    chartOptionsBar: {
      tooltip: {
          
        },
      legend: {
        data: ['bar']
      },
      xAxis: {
        data: []
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: 'bar',
          type: 'bar',
          data: []
        }
      ],
      title: {
        text: 'Month Wise Purchase Quantity',
        x: 'center',
        textStyle: {
          fontSize: 24
        }
      },
      color: ['#127ac2']
    }
  }),
  watch: {
    startDate() {
      // alert('here')
    }
  },
  async created() {
    var dateOffset = (24*60*60*1000) * 5; //5 days
    var myDate = new Date();
    myDate.setTime(myDate.getTime() - dateOffset);
    this.start_date.value = myDate
    const response = await appAxios({ method: 'get', url: 'v1/purchase/purchase-data/' });
    if (response.status === 200) {
      this.chartOptionsBar.xAxis.data = response.data.month
      this.chartOptionsBar.legend.data = response.data.month
      this.chartOptionsBar.series = [{
        'type': 'bar',
        data: response.data.quantity
      }]
    }
  },
  methods: {
    async filterData() {

      let url = `v1/purchase/purchase-data/?start_date=${this.startDate.formattedValue}&end_date=${this.endDate.formattedValue}`

      const response = await appAxios({ method: 'get', url: url });
      if (response.status === 200) {
        this.chartOptionsBar.xAxis.data = response.data.month
        this.chartOptionsBar.legend.data = response.data.month
        this.chartOptionsBar.series = [{
          'type': 'bar',
          data: response.data.quantity
        }]
      }
    }
  }
}
</script>

<style scoped>
  .chart-wrapper {
    width: 100%;
    height: 500px;
  }
  .echarts {
    width: 100%;
    height: 100%;
  }
  .child {
    display: inline-block;
    margin: 10px;
  }
  .button {
    background-color: #4CAF50; /* Green */
    border: none;
    color: white;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    cursor: pointer;
  }
</style>