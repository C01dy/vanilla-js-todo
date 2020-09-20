const input = document.querySelector('.input-field input');
const collection = document.querySelector('.collection .collection-items');
const addBtn = document.querySelector('.input-field div a');

class Todos {
  get id() {
    return `f${(~~(Math.random() * 1e8)).toString(16)}`;
  }

  get todosHeaderDOMElement() {
    return `
      <li class="collection-header">
        <h4 class="grey-text text-lighten-4">Todo VanillaJS</h4>
        <div class="input-field">
            <input type="text" class="validate brown-text text-lighten-5" />
            <div>
            <a class="btn-floating waves-effect waves-light brown darken-1"
                ><i class="material-icons">add</i></a
            >
            </div>
        </div>
      </li>
      `;
  }

  render() {
    const todos = JSON.parse(localStorage.getItem('todos'));

    const todosDOMElement = todos
      .map((todo) => {
        return `
        <li class="collection-item" id=${todo.id}>
         <div>
            ${todo.text}
          <div href="#!" class="secondary-content">
             <i class="material-icons">done</i>
          </div>
         </div>
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
    if (!localStorage.length) {
      localStorage.setItem(
        'todos',
        JSON.stringify([this.createTodo(this.id, input.value, false)])
      );
    } else {
      const todos = JSON.parse(localStorage.getItem('todos'));
      localStorage.setItem(
        'todos',
        JSON.stringify([...todos, this.createTodo(this.id, input.value, false)])
      );
    }
    this.render();
  }
}

const todos = new Todos();

addBtn.addEventListener('click', () => todos.addTodo());
window.addEventListener('load', () => todos.render());
