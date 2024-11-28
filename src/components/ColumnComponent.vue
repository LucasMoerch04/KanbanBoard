<template>
  <v-card>
    <v-card-title>{{ column.name }}</v-card-title>
    <v-card-text>
      <v-btn @click="addTask">Add Task</v-btn>
      <v-list>
        <v-list-item-group v-for="task in column.tasks" :key="task.id">
          <TaskComponent :task="task" />
        </v-list-item-group>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TaskComponent from '../components/TaskComponent.vue';  

export default defineComponent({
  name: 'ColumnComponent',
  components: { TaskComponent },
  props: {
    column: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const addTask = () => {
      props.column.tasks.push({ id: Date.now(), title: 'New Task' });
    };

    return { addTask };
  },
});
</script>


