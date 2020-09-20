const input = document.querySelector('.input-field input');
const collection = document.querySelector('.collection .collection-items');
const addBtn = document.querySelector('.input-field div a');
// const inputForm = document.querySelector('.input-field');

class Todos {
  get id() {
    return `f${(~~(Math.random() * 1e8)).toString(16)}`;
  }

  render() {
    const todos = JSON.parse(localStorage.getItem('todos'));

    const todosDOMElement = todos
      .map((todo) => {
        return `
        <li class="collection-item" id=${todo.id}>
            ${todo.text}
          <form href="#!" class="secondary-content">
          <label>
            <input type="checkbox" class="filled-in" ${todo.isCompleted ? 'checked' : ''}/>
            <span></span>
          </label>
          </form>
        </li>
        `;
      })
      .join('');

    collection.innerHTML = todosDOMElement;
  }

  createTodo(id, text, isCompleted) {
    return { id, text, isCompleted };
  }

  addTodo() {
    if (!localStorage.length && input.value.length) {
      localStorage.setItem(
        'todos',
        JSON.stringify([this.createTodo(this.id, input.value, false)])
      );
    } else if (input.value.length) {
      const todos = JSON.parse(localStorage.getItem('todos'));
      localStorage.setItem(
        'todos',
        JSON.stringify([...todos, this.createTodo(this.id, input.value, false)])
      );
    } else {
      alert('Put something')
    }
    this.render();
  }

  toggleComplete() {
    document.body.addEventListener("click", e => {
      if (e.target.classList.contains('filled-in')) {
        const id = e.path[3].id;
        const todos = JSON.parse(localStorage.getItem('todos'));
        const itemIdx = todos.findIndex(item => item.id === id);
        const item = todos[itemIdx]
        
        localStorage.setItem('todos', JSON.stringify([
          ...todos.slice(0, itemIdx),
          this.createTodo(item.id, item.text, !item.isCompleted),
          ...todos.slice(itemIdx + 1)
        ]))
      }
    })
  }
}

const todos = new Todos();

addBtn.addEventListener('click', () => todos.addTodo());
window.addEventListener('load', () => todos.render());
todos.toggleComplete();
