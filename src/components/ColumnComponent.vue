<template>
  <div class="column">
    <h2>{{ column.name }}</h2>
    <ul>
      <TaskComponent v-for="task in column.tasks" :key="task.id" :task="task"/>
    </ul>
    <form @submit.prevent="addTask">
      <input v-model="newTaskTitle" placeholder="Add task" class="new-task-input"/>
      <button type="submit">+</button>     
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue';
import type { Column } from '../components/types';
import TaskComponent from '../components/TaskComponent.vue';

export default defineComponent({
  name: 'ColumnComponent',
  components: {
    TaskComponent,
  },
  props: {
    column: {
      type: Object as PropType<Column>,
      required: true,
    },
  },
  setup(props) {
    const newTaskTitle = ref('');

    const addTask = () => {
      if (newTaskTitle.value.trim()) {
        props.column.tasks.push({
          id: Date.now(),
          title: newTaskTitle.value,
        });
        newTaskTitle.value = '';
      }
    };

    return {
      newTaskTitle,
      addTask,
    };
  },
});
</script>

<style scoped>
.column {
  background-color: #e0e0e0;
  padding: 16px;
  border-radius: 8px;
  width: 200px;
  margin-right: 16px;
}
</style>
