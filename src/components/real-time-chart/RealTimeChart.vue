<script setup>
import { ref, onMounted, watch } from 'vue'
import ApexChart from 'vue3-apexcharts'

const props = defineProps({
  id: String,
  title: String,
  serieName: String,
  height: Number,
  initialData: Array,
  lastData: Object
})

const chart = ref(null)
const series = ref([{
  name: props.serieName || '',
  data: []
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
  if (series.value[0].data.length - 60 > 0) {
    series.value[0].data = series.value[0].data.slice(series.value[0].data.length - 60, series.value[0].data.length)
  }
}

const mapInitialData = () => {
  const data = props.initialData.map(params => {
    return { x: params.date, y: params[props.id] }
  })

  return data
}

watch(
  () => props.initialData,
  (initialData) => {
    if (initialData && initialData.length > 0) {
      const mappedData = mapInitialData()
      series.value[0].data = mappedData
    }
  }
)

watch(
  () => props.lastData,
  (lastData) => {
    // Adding a new value to the dataset
    if (chart.value !== null) {
      series.value[0].data.push({ x: lastData.date, y: lastData.value })

      // Updating the chart
      // chart.value.updateSeries([{ data }])
    }
  }
)

onMounted(() => {
  // every 60 seconds, we reset the data to prevent memory leaks
  window.setInterval(function () {
    if (chart.value !== null) {
      removeOldData()

      chart.value.updateSeries(series.value, false, true)
    }
  }, 10000)
})
</script>

<template>
  <div id="chart" class="w-full">
    <ApexChart v-if="series[0].data.length > 0" type="line" :height="height" ref="chart" :options="chartOptions" :series="series" />
  </div>
</template>
