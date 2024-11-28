<template>
  <v-app>
    <v-container>
      <v-row>
        <v-col 
          :cols="getColumnWidth(columns.length)" 
          v-for="column in columns"
          :key="column.id"
          class="d-flex flex-column"
        >
          <v-card class="task-column-card">
            <v-card-title class="d-flex justify-between align-center">
              <span class="column-title">{{ column.name }}</span>
              <v-btn @click="toggleTaskInput(column)" small class="ml-auto">+</v-btn>
            </v-card-title>
            <v-card-text>
              <v-alert v-if="column.errorMessage" type="error" >
                {{ column.errorMessage }}
              </v-alert>
              <v-text-field
                v-if="column.showTaskInput"
                v-model="column.newTaskTitle"
                label="New Task Title"
                outlined
              />
              <v-textarea
                v-if="column.showTaskInput"
                v-model="column.newTaskDescription"
                label="Task Description (Optional)"
                outlined
              />
              <v-btn
                v-if="column.showTaskInput"
                @click="addTask(column)"
                small
                color="primary"
              >
                Add Task
              </v-btn>

              <!-- Draggable tasks -->
              <draggable
                v-model="column.tasks"
                :group="'tasks'"
                item-key="id"
                class="task-list"
              >
                <template #item="{ element }">
                  <task-component
                    :task="element"
                    :key="element.id"
                    @remove-task="removeTask(column, element)"
                  />
                </template>
              </draggable>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <v-row class="add-column-row" justify="center">
        <v-col cols="12" class="d-flex justify-center">
          <v-btn @click="toggleColumnInput" class="add-column-btn" block>
            Add Column
          </v-btn>
        </v-col>
      </v-row>

      <v-row v-if="showColumnInput" class="new-column-input">
        <v-col cols="12" class="d-flex justify-center">
          <v-text-field
            v-model="newColumnTitle"
            label="New Column Title"
            @keyup.enter="addColumn"
            outlined
            block
          />
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import draggable from 'vuedraggable';
import TaskComponent from '../components/TaskComponent.vue';

export default defineComponent({
  name: 'KanbanBoard',
  components: {
    draggable,
    TaskComponent,
  },
  setup() {
    const defaultColumns = [
      { id: 1, name: 'To Do', tasks: [], newTaskTitle: '', newTaskDescription: '', showTaskInput: false, errorMessage: '' },
      { id: 2, name: 'In Progress', tasks: [], newTaskTitle: '', newTaskDescription: '', showTaskInput: false, errorMessage: '' },
      { id: 3, name: 'Done', tasks: [], newTaskTitle: '', newTaskDescription: '', showTaskInput: false, errorMessage: '' },
    ];

    const loadColumns = () => {
      const savedColumns = localStorage.getItem('kanbanColumns');
      return savedColumns ? JSON.parse(savedColumns) : defaultColumns;
    };

    const columns = ref(loadColumns());
    const newColumnTitle = ref('');
    const showColumnInput = ref(false);

    watch(
      columns,
      (newColumns) => {
        localStorage.setItem('kanbanColumns', JSON.stringify(newColumns));
      },
      { deep: true }
    );

    const toggleTaskInput = (column: any) => {
      column.showTaskInput = !column.showTaskInput;
      column.errorMessage = '';
    };

    const addTask = (column: any) => {
      if (column.newTaskTitle.trim() === '') {
        column.errorMessage = 'Task title is required.';
        return;
      }

      column.tasks.push({
        id: Date.now(),
        title: column.newTaskTitle,
        description: column.newTaskDescription,
      });
      column.newTaskTitle = '';
      column.newTaskDescription = '';
      column.showTaskInput = false;
      column.errorMessage = '';
    };

    const removeTask = (column: any, task: any) => {
      column.tasks = column.tasks.filter((t: any) => t.id !== task.id);
    };

    const toggleColumnInput = () => {
      showColumnInput.value = !showColumnInput.value;
    };

    const addColumn = () => {
      if (newColumnTitle.value.trim() !== '') {
        columns.value.push({
          id: Date.now(),
          name: newColumnTitle.value,
          tasks: [],
          newTaskTitle: '',
          newTaskDescription: '',
          showTaskInput: false,
          errorMessage: '',
        });
        newColumnTitle.value = '';
        showColumnInput.value = false;
      }
    };

    const getColumnWidth = (numColumns: number) => (numColumns <= 3 ? Math.floor(12 / numColumns) : 3);

    return { columns, addTask, addColumn, newColumnTitle, toggleTaskInput, toggleColumnInput, showColumnInput, removeTask, getColumnWidth };
  },
});
</script>

<style scoped>
.task-column-card {
  margin-bottom: 10px;
  padding: 10px;
  background-color: #272626;
  cursor: pointer;
  border-radius: 4px;
  position: relative;
}

.task-list {
  padding: 0;
}

.v-btn {
  margin-bottom: 10px;
  color: #02e502;
  font-size: 1.2em;
}

.add-column-btn {
  margin-top: 10px;
  color: #109010;
  font-size: 1.2em;
  width: 100%;
}

.new-column-input {
  margin-top: 20px;
}

.new-column-input .v-text-field {
  width: 100%;
}

.column-title {
  flex-grow: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: calc(100% - 40px);
}
</style>
