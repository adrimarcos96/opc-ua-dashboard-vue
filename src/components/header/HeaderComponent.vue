<script setup>
import { ref } from  'vue'
import { routes } from '../../routes'
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';

const sidebarOptions = ref(routes)
const isActiveMobileSidebar = ref(false)
const menuIcon = ref(faBars)
const closeIcon = ref(faXmark)

const showMobilMenu = () => {
  isActiveMobileSidebar.value = true
}

const hideMobileMenu = () => {
  isActiveMobileSidebar.value = false
}
</script>

<template>
  <header>
    <!-- Sidebar desktop-->
    <div class="h-screen w-[250px] bg-neutral-800 flex flex-col justify-between max-[981px]:hidden" >
      <div id="sidebar-body">
        <div class="py-8">
          <h1 class="text-white text-2xl text-center">OPC UA</h1>
        </div>

        <div class="h-px bg-white mx-3"></div>

        <div id="sidebar-options" class="mt-5">
          <div :key="option.id" v-for="option of sidebarOptions" class="w-full h-14 hover:bg-gray-500 mb-2 flex items-center">
            <svg-icon class="ml-7 text-white" :fa-icon="option.icon" :size="30"></svg-icon>
            <router-link :to="option.path" class="block h-full w-full text-left pl-3 pt-3 text-lg text-white">{{ option.label }}</router-link>
          </div>
        </div>
      </div>

      <div id="sidebar-footer" class="w-full h-28 flex flex-col justify-center items-center bg-neutral-700">
        <h1 class="text-white text-sm">© 2023 </h1>
        <h1 class="text-white text-sm">Adrián Marcos Quintana</h1>
        <h1 class="text-white text-sm">All rights reserved</h1>
      </div>
    </div>

    <!-- Mobile header -->
    <div class="fixed z-40 w-full h-24 bg-neutral-800 min-[981px]:hidden flex items-center justify-between px-10">
      <h1 class="text-white text-2xl">OPC UA</h1>
      <button class="h-14 w-14 text-white text-xl cursor-pointer flex items-center justify-center" @click="showMobilMenu">
        <svg-icon :fa-icon="menuIcon" :size="35" flip="horizontal"></svg-icon>
      </button>
    </div>

    <!-- Mobile menu-->
    <div v-if="isActiveMobileSidebar" class="absolute top-0 z-50 h-screen w-screen bg-white flex-col min-[981px]:hidden overflow-hidden" >
      <div id="sidebar-title" class="py-8 ">
        <button class="float-right h-10 w-10 text-black text-xl cursor-pointer flex items-center justify-center mr-10" @click="hideMobileMenu">
          <svg-icon :fa-icon="closeIcon" :size="35" flip="horizontal"></svg-icon>
        </button>
        <h1 class="text-black text-2xl text-left pl-10 pt-8">OPC UA</h1>
      </div>
      <div class="h-px bg-black mx-3"></div>
      <div id="sidebar-options" class="mt-5">
        <div :key="option.id" v-for="option of sidebarOptions" class="w-full h-14 hover:bg-gray-500 mb-2 flex items-center">
          <svg-icon class="ml-10 text-black" :fa-icon="option.icon" :size="30"></svg-icon>
          <router-link :to="option.path" @click="hideMobileMenu" class="block h-full w-full text-left pl-3 pt-3 text-xl text-black">{{ option.label }}</router-link>
        </div>
      </div>
    </div>
  </header>
</template>
