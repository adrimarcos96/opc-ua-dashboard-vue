<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import useValidate from '@vuelidate/core'
import { required, email, minLength, maxLength, helpers} from '@vuelidate/validators'
import { Canvas3D } from '../assets/js/three-helpers/scene'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

const toastOptions = {
  theme: 'light',
  position: toast.POSITION.BOTTOM_RIGHT,
  transition: toast.TRANSITIONS.FLIP
}
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

const resetForm = () => {
  formFields.value = {
    email: '',
    message: ''
  }
  $v.value.$reset()
}

const submitForm = (event) => {
  event.preventDefault()

  isLoading.value = true

  $v.value.$validate()

  if (!$v.value.$error) {
    // send data to the backend
    console.log('Sending data', formFields.value)

    setTimeout(() => {
      isLoading.value = false
      console.log('Data sent', formFields.value)

      // Show success message
      toast.success('Message sent successfully', toastOptions)
      resetForm()
    }, 3000)
  } else {
    isLoading.value = false

    // Show error message
    toast.error('Error sending message', toastOptions)
  }
}

onMounted(() => {
  const canvas3D = new Canvas3D(canvas.value)
  canvas3D.render()
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
      <form class="bg-gray-700 opacity-90 shadow-md rounded-sm px-8 pt-8 pb-8">
        <div class="flex items-center justify-center mb-3">
          <p class="text-xl text-white"> Contact me</p>
        </div>
        <div class="mb-4">
          <label class="block text-white text-sm mb-2" for="email">Email*</label>
          <input v-model="formFields.email" :class="`shadow appearance-none border rounded-sm w-full h-12 py-2 px-3 text-gray-700 mb-2 leading-tight focus:outline-none focus:shadow-outline ${$v.email.$error ? 'border-red-500' : ''}`" id="email" type="email" placeholder="Your email">
          <p v-if="$v.email.$error" class="text-red-500 text-xs italic">{{ $v.email.$errors[0].$message }}</p>
        </div>
        <div class="mb-6">
          <label class="block text-white text-sm mb-2" for="message">Message*</label>
          <textarea v-model="formFields.message" cols="3" :class="`shadow appearance-none border rounded-sm w-full max-h-36 min-h-12 py-2 px-3 text-gray-700 mb-2 leading-tight focus:outline-none focus:shadow-outline ${$v.message.$error ? 'border-red-500' : ''}`" id="message" placeholder="Write a message"></textarea>
          <p v-if="$v.message.$error" class="text-red-500 text-xs italic">{{ $v.message.$errors[0].$message }}</p>
        </div>
        <div class="flex items-center justify-center">
          <button id="submit-button" v-if="!isLoading" @click="submitForm($event)" class="bg-blue-500 hover:bg-blue-700 text-white font-bold max-[981px]:w-full w-1/2 h-12 py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Send
          </button>
          <button id="loading-submit-button" v-else disabled="true" class="bg-blue-500 hover:bg-blue-700 text-white font-bold max-[981px]:w-full h-12 py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Loading...
          </button>
        </div>
      </form>
    </div>

    <canvas ref="canvas" class="w-full h-screen bg-black m-0 min-h-[300px]"></canvas>
    </div>
</template>
