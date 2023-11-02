<script setup>
import { ref, onMounted, watch } from 'vue'
import ApexChart from 'vue3-apexcharts'

const props = defineProps({
  title: String,
  serieName: String,
  height: Number,
  lastData: Object
})

let data = []

const chart = ref(null)
const series = ref([{
  name: props.serieName || '',
  data: data.slice()
}])
const chartOptions = ref({
  chart: {
    id: 'realtime',
    height: props.height,
    type: 'line',
    animations: {
      enabled: true,
      easing: 'linear',
      dynamicAnimation: {
        speed: 1000
      }
    },
    toolbar: {
      show: false
    },
    zoom: {
      enabled: false
    }
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    curve: 'straight',
    width: 2
  },
  title: {
    text: props.title,
    align: 'center',
    style: {
      fontSize:  '18px',
      fontWeight:  'bold',
      fontFamily:  undefined,
      color:  '#263238'
    }
  },
  markers: {
    size: 0
  },
  xaxis: {
    type: 'datetime',
    range: 300000
  },
  yaxis: {
    max: 100,
    min: 0,
    title: { text: props.serieName }
  },
  legend: {
    show: false
  },
  tooltip: {
    x: {
      show: true,
      format: 'dd MMM hh:mm:ss',
      formatter: undefined
    },
    y: {
      formatter: undefined,
      title: {
        formatter: (seriesName) => seriesName+ ':'
      }
    }
  }
})

const removeOldData = () => {
  if (data.length - 60 > 0) {
    data = data.slice(data.length - 60, data.length)
  }
}

watch(
  () => props.lastData,
  (lastData) => {
    // Adding a new value to the dataset
    if (chart.value !== null) {
      data.push({ x: lastData.date, y: lastData.value })

      // Updating the chart
      chart.value.updateSeries([{ data }])
    }
  }
)

onMounted(() => {
  // every 60 seconds, we reset the data to prevent memory leaks
  window.setInterval(function () {
    if (chart.value !== null) {
      removeOldData()

      chart.value.updateSeries([{
        data
      }], false, true)
    }
  }, 60000)
})
</script>

<template>
  <div id="chart" class="w-full">
    <ApexChart type="line" :height="height" ref="chart" :options="chartOptions" :series="series" />
  </div>
</template>
