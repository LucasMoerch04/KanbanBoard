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
                <span>{{ column.name }}</span>
                <v-btn @click="toggleTaskInput(column)" small class="ml-auto">+</v-btn> <!-- Right-align the button -->
              </v-card-title>
              <v-card-text>
                <!-- Task input field, shown when toggleTaskInput is true -->
                <v-text-field
                  v-if="column.showTaskInput"
                  v-model="column.newTaskTitle"
                  label="New Task Title"
                  outlined
                />
                <v-textarea
                  v-if="column.showTaskInput"
                  v-model="column.newTaskDescription"
                  label="Task Description"
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
  
        <!-- Add column button -->
        <v-row class="add-column-row" justify="center">
          <v-col cols="12" class="d-flex justify-center">
            <v-btn @click="toggleColumnInput" class="add-column-btn" block>
              Add Column
            </v-btn>
          </v-col>
        </v-row>
  
        <!-- New column input  -->
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
  import { defineComponent, ref } from 'vue';
  import draggable from 'vuedraggable'; // Import draggable component
  import TaskComponent from '../components/TaskComponent.vue';
  
  export default defineComponent({
    name: 'KanbanBoard',
    components: {
      draggable,
      TaskComponent,
    },
    setup() {
      const defaultColumns = [
        { id: 1, name: 'To Do', tasks: [], newTaskTitle: '', newTaskDescription: '', showTaskInput: false },
        { id: 2, name: 'In Progress', tasks: [], newTaskTitle: '', newTaskDescription: '', showTaskInput: false },
        { id: 3, name: 'Done', tasks: [], newTaskTitle: '', newTaskDescription: '', showTaskInput: false },
      ];
  
      // Initialize columns
      const columns = ref(defaultColumns);
  
      const newColumnTitle = ref('');
      const showColumnInput = ref(false);
  
      // Toggle visibility of the task input field
      const toggleTaskInput = (column: any) => {
        column.showTaskInput = !column.showTaskInput;
      };
  
      // Add task to a column
      const addTask = (column: any) => {
        if (column.newTaskTitle.trim() !== '' && column.newTaskDescription.trim() !== '') {
          column.tasks.push({
            id: Date.now(),
            title: column.newTaskTitle,
            description: column.newTaskDescription,
          });
          column.newTaskTitle = ''; 
          column.newTaskDescription = ''; 
          column.showTaskInput = false; 
        }
      };
  
      // Remove task
      const removeTask = (column: any, task: any) => {
        column.tasks = column.tasks.filter((t: any) => t.id !== task.id);
      };
  
      // Toggle visibility of the add column input
      const toggleColumnInput = () => {
        showColumnInput.value = !showColumnInput.value;
      };
  
      // Add a new column
      const addColumn = () => {
        if (newColumnTitle.value.trim() !== '') {
          columns.value.push({
            id: Date.now(),
            name: newColumnTitle.value,
            tasks: [],
            newTaskTitle: '', 
            newTaskDescription: '', 
            showTaskInput: false, 
          });
          newColumnTitle.value = '';
          showColumnInput.value = false; 
        }
      };
  
      // Calculate column width based on the number of columns
      const getColumnWidth = (numColumns: number) => {
        if (numColumns <= 3) {
          return Math.floor(12 / numColumns); // Distribute evenly for 1-3 columns
        }
        return 3; // Default for 4 columns or more
      };
  
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
  </style>
  