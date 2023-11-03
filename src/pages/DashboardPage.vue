<script setup>
import { ref, onMounted } from 'vue'
import RealTimeChart from '../components/real-time-chart/RealTimeChart.vue'
import { getParamsDataInRealTime, getInitialParamsData } from '../services/paramtersService'

const params = ref({
  date: new Date(),
  temperature: '-',
  pressure: '-',
  humidity: '-'
})

const data = ref([])

const getData = () => {
  setInterval(() => {
    const data = getParamsDataInRealTime()

    params.value = {
      date: data.date,
      temperature: `${data.temperature} °C`,
      pressure: `${data.pressure} Pa`,
      humidity: `${data.humidity} %`
    }
  }, 5000)
}

onMounted(() => {
  getData()
  const fetchedData = getInitialParamsData()
  data.value = fetchedData

  const lastParams = fetchedData[fetchedData.length - 1]
  params.value = {
    date: lastParams.date,
    temperature: `${lastParams.temperature} °C`,
    pressure: `${lastParams.pressure} °C`,
    humidity: `${lastParams.humidity} °C`
  }
})
</script>

<template>
  <div>
    <div id="tite-section" class="p-5">
      <h1 class="text-xl text-black">Dashboard</h1>
    </div>

    <div id="summary-section" class="flex h-32 w-full mb-5">
      <div class="w-full h-full flex flex-col justify-center items-center bg-slate-700 border-white border-x-2">
        <p class="text-white text-2xl">{{ params.temperature }}</p>
        <p class="text-white text-base">temperature</p>
      </div>
      <div class="w-full h-full flex flex-col justify-center items-center bg-slate-700">
        <p class="text-white text-2xl">{{ params.pressure }}</p>
        <p class="text-white text-base">pressure</p>
      </div>
      <div class="w-full h-full flex flex-col justify-center items-center bg-slate-700 border-x-2">
        <p class="text-white text-2xl">{{ params.humidity }}</p>
        <p class="text-white text-base">humidity</p>
      </div>
    </div>

    <div id="chats-section" class="w-full flex flex-wrap justify-center items-center mb-5 min-[981px]:px-5">
      <div class="w-full mb-5">
        <RealTimeChart id="temperature" title="Temperature last 5 minutes" serieName="Temperature (°C)" :height="250" :initialData="data" :lastData="{ date: params.date, value: params.temperature }" />
      </div>
      <div class="w-full min-[981px]:w-[48%] min-[981px]:mr-[2%] mb-5">
        <RealTimeChart id="pressure" title="Pressure last 5 minutes" serieName="Pressure (Pa)" :height="250" :initialData="data" :lastData="{ date: params.date, value: params.pressure }" />
      </div>
      <div class="w-full min-[981px]:w-[48%] min-[981px]:ml-[2%] mb-5">
        <RealTimeChart id="humidity" title="Humidity last 5 minutes" serieName="Humidity (%)" :height="250" :initialData="data" :lastData="{ date: params.date, value: params.humidity }" />
      </div>
    </div>
  </div>
</template>
