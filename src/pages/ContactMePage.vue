<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import useValidate from '@vuelidate/core'
import { required, email, minLength, maxLength, helpers} from '@vuelidate/validators'
import { Canvas3D } from '../assets/js/three-helpers/scene'

const canvas = ref(null)
const scene = ref(null)
const formFields = ref({
  email:'',
  message: ''
})
const isLoading = ref(true)

const validators = {
  email: {
    required: helpers.withMessage('Email is required', required),
    email: helpers.withMessage('Email should be a valid email', email)
  },
  message: {
    required: helpers.withMessage('Message is required', required),
    minLength: minLength(4),
    maxLength: maxLength(500)
  }
}
const rules = computed(() => validators)
const $v =  useValidate(rules, formFields)

const onResize = () => {
  const width = window.innerWidth
  const height = window.innerHeight

  if (scene.value) {
    scene.value.onResize(width, height)
  }
}

const onMouseMove = (event) => {
  let windowHalfX = window.innerWidth / 2
  const x = ( event.clientX - windowHalfX ) / 100

  scene.value.moveCamera(x)
}

const resetFields = () => {
  formFields.value = {
    email: '',
    message: ''
  }
}

const submitForm = () => {
  isLoading.value = true

  $v.value.$validate()

  if (!$v.value.$error) {
    // send data to the backend
    alert('Data will be send')
    console.log('Sending data', formFields.value)
    resetFields()

    setTimeout(() => {
      isLoading.value = false
    }, 3000)
  } else {
    alert('form failed validations')
    isLoading.value = false
  }
}

onMounted(() => {
  const canvas3D = new Canvas3D(canvas.value)
  canvas3D.render()
  // canvas3D.showAxesHelper()
  scene.value = canvas3D

  addEventListener('resize', onResize)
  addEventListener('mousemove', onMouseMove)

  isLoading.value = false
})

onUnmounted(() => {
  scene.value.destroyScene()
  removeEventListener('resize', onResize)
  removeEventListener('mousemove', onMouseMove)
})
</script>

<template>
  <div class="w-full  overflow-hidden">
    <div class="absolute float-left max-[981px]:w-full w-96 max-[981px]:px-2.5 min-[981px]:px-10 max-[981px]:pt-10 min-[981px]:pt-24">
      <form class="bg-gray-700 opacity-90 shadow-md rounded-sm px-8 pt-10 pb-8">
        <div class="mb-4">
          <label class="block text-white text-sm font-bold mb-2" for="email">Email*</label>
          <input v-model="formFields.email" :class="`shadow appearance-none border rounded-sm w-full py-2 px-3 text-gray-700 mb-2 leading-tight focus:outline-none focus:shadow-outline ${$v.email.$error ? 'border-red-500' : ''}`" id="email" type="email" placeholder="Start typing" required>
          <p v-if="$v.email.$error" class="text-red-500 text-xs italic">{{ $v.email.$errors[0].$message }}</p>
        </div>
        <div class="mb-6">
            <label class="block text-white text-sm font-bold mb-2" for="message">Message*</label>
            <textarea v-model="formFields.message" cols="3" :class="`shadow appearance-none border rounded-sm w-full max-h-36 py-2 px-3 text-gray-700 mb-2 leading-tight focus:outline-none focus:shadow-outline ${$v.message.$error ? 'border-red-500' : ''}`" id="message" placeholder="Start typing" required></textarea>
            <p v-if="$v.message.$error" class="text-red-500 text-xs italic">{{ $v.message.$errors[0].$message }}</p>
        </div>
        <div class="flex items-center justify-center">
            <button id="submit-button" v-if="!isLoading" @click="submitForm()" class="bg-blue-500 hover:bg-blue-700 text-white font-bold max-[981px]:w-full w-1/2 py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Send
            </button>
            <button id="loading-submit-button" v-else disabled="true" class="bg-blue-500 hover:bg-blue-700 text-white font-bold max-[981px]:w-full py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Loading...
            </button>
        </div>
      </form>
    </div>

    <canvas ref="canvas" class="w-full h-screen bg-black m-0 min-h-[300px]"></canvas>
  </div>
</template>
