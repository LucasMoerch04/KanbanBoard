<template>
  <v-card
    class="task-card"
    :key="task.id"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <v-card-title>{{ task.title }}</v-card-title>

    <!-- Description, shown only when hovering -->
    <v-card-subtitle
      class="task-description"
      v-if="isHovered"
      aria-hidden="!isHovered"
    >
      {{ task.description }}
    </v-card-subtitle>

    <!-- Task remove button, shown only when hovering over the card -->
    <v-btn
      @click="removeTask"
      small
      color="red"
      class="remove-task-btn"
      v-if="isHovered"
      aria-label="Remove task"
    >
      Remove
    </v-btn>
  </v-card>
</template>

  
  <script lang="ts">
  import { defineComponent, ref } from 'vue';
  
  export default defineComponent({
    name: 'TaskComponent',
    props: {
      task: {
        type: Object,
        required: true,
      },
    },
    setup(props, { emit }) {
      // State for hover effect
      const isHovered = ref(false);
  
      // Emit event to remove task
      const removeTask = () => {
        emit('remove-task', props.task);
      };
  
      return {
        isHovered,
        removeTask,
      };
    },
  });
  </script>
  
  <style scoped>
  .task-card {
    margin-bottom: 10px;
    padding: 10px;
    background-color: #424141;
    cursor: pointer;
    border-radius: 4px;
    position: relative;
    transition: background-color 0.3s ease;
  }
  
  .task-card:hover {
    background-color: #555;
  }
  
  .task-description {
    color: #aaa;
    font-size: 0.9em;
    padding: 5px;
    white-space: normal;
    word-wrap: break-word;
  }
  
  .remove-task-btn {
    position: absolute;
    top: 5px;
    right: 5px;
  }
  </style>
  