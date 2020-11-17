/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
     *          name: '',
     *          age: 25,
     *          salary: '1000',
     *          city: 'Petrozavodsk'
     *   },
 *
 * @constructor
 */
/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      },ы
 *
 * @constructor
 */
class Row {
  constructor(obj) {
    this.name = obj.name;
    this.age = obj.age;
    this.salary = obj.salary;
    this.city = obj.city;
  }
  onClick = function(event) {
    console.log(event.target);
  }
  render() {
    this.elem = document.createElement('TR')
    this.elem.innerHTML = `
        <td>${this.name}</td>
        <td>${this.age}</td>
        <td>${this.salary}</td>
        <td>${this.city}</td>
        <td><button>X</button></td>
      `
    this.elem.querySelector('button').addEventListener('click', this.onClick);
    return this.elem;
  }
}

export default class UserTable {
  constructor(rows) {
    this.rows = {};
    for (let i in rows) {
      this.rows[i] = new Row(rows[i]);
    }
    this.elem = document.createElement('TABLE');
    this.elem.insertAdjacentHTML('afterbegin', `
      <thead>
        <tr>
          <th>Имя</th>
          <th>Возраст</th>
          <th>Зарплата</th>
          <th>Город</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        ${this.renderRow()}
      </tbody>
    `);
  }
  renderRow() {
    // let usersTable = '';
    for (const i of Object.keys(this.rows)) {
      // usersTable +=
      console.log(typeof (this.rows[i].render()))
    }

    // return usersTable;
  }
}


