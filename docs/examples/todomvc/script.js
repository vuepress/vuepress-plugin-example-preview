const STORAGE_KEY = 'todos-vuejs-2.0'
const todoStorage = {
  fetch () {
    const todos = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    todos.forEach(function (todo, index) {
      todo.id = index
    })
    todoStorage.uid = todos.length
    return todos
  },
  save (todos) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  },
}

// visibility filters
const filters = {
  all (todos) {
    return todos
  },
  active (todos) {
    return todos.filter(function (todo) {
      return !todo.completed
    })
  },
  completed (todos) {
    return todos.filter(function (todo) {
      return todo.completed
    })
  },
}

export default {
  // app initial state
  data () {
    return {
      todos: todoStorage.fetch(),
      newTodo: '',
      editedTodo: null,
      visibility: 'all',
    }
  },

  created () {
    // handle routing
    const onHashChange = () => {
      const visibility = window.location.hash.replace(/#\/?/, '')
      if (filters[visibility]) {
        this.visibility = visibility
      } else {
        window.location.hash = ''
        this.visibility = 'all'
      }
    }

    window.addEventListener('hashchange', onHashChange)
    onHashChange()
  },

  // watch todos change for localStorage persistence
  watch: {
    todos: {
      handler (todos) {
        todoStorage.save(todos)
      },
      deep: true,
    },
  },

  // computed properties
  // https://vuejs.org/guide/computed.html
  computed: {
    filteredTodos () {
      return filters[this.visibility](this.todos)
    },
    remaining () {
      return filters.active(this.todos).length
    },
    allDone: {
      get () {
        return this.remaining === 0
      },
      set (value) {
        this.todos.forEach(function (todo) {
          todo.completed = value
        })
      },
    },
  },

  filters: {
    pluralize (n) {
      return n === 1 ? 'item' : 'items'
    },
  },

  // methods that implement data logic.
  // note there's no DOM manipulation here at all.
  methods: {
    addTodo () {
      const value = this.newTodo && this.newTodo.trim()
      if (!value) {
        return
      }
      this.todos.push({
        id: todoStorage.uid++,
        title: value,
        completed: false,
      })
      this.newTodo = ''
    },

    removeTodo (todo) {
      this.todos.splice(this.todos.indexOf(todo), 1)
    },

    editTodo (todo) {
      this.beforeEditCache = todo.title
      this.editedTodo = todo
    },

    doneEdit (todo) {
      if (!this.editedTodo) {
        return
      }
      this.editedTodo = null
      todo.title = todo.title.trim()
      if (!todo.title) {
        this.removeTodo(todo)
      }
    },

    cancelEdit (todo) {
      this.editedTodo = null
      todo.title = this.beforeEditCache
    },

    removeCompleted () {
      this.todos = filters.active(this.todos)
    },
  },

  // a custom directive to wait for the DOM to be updated
  // before focusing on the input field.
  // https://vuejs.org/guide/custom-directive.html
  directives: {
    'todo-focus' (el, binding) {
      if (binding.value) {
        el.focus()
      }
    },
  },
}
