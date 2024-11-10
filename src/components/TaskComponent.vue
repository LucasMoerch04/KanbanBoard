<template>
    <li class="task">
      {{ task.title }}
    </li>
  </template>
  
  <script lang="ts">
  import { defineComponent, PropType } from 'vue';
  import type { Task } from '../components/types';
  
  export default defineComponent({
    name: 'TaskComponent',
    props: {
      task: {
        type: Object as PropType<Task>,
        required: true,
      },
    },
  });
  </script>
  
  <style scoped>
  .task {
    padding: 8px;
    background-color: #f0f0f0;
    border-radius: 4px;
    margin-bottom: 4px;
  }
  </style>
  