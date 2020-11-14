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
    this.name = obj.name
    this.age = obj.age
    this.salary = obj.salary
    this.city = obj.city
  }

  // remove() {
  //   document.querySelector('button').addEventListener('click', (ev) => {
  //
  //   })
  // }

  render() {
    this.elem = `
      <tr>
        <td>${this.name}</td>
        <td>${this.age}</td>
        <td>${this.salary}</td>
        <td>${this.city}</td>
        <td><button>X</button></td>
      </tr>
    `
    return this.elem
  }
}

export default class UserTable {
  constructor(rows) {
    this.rows = {}
    for (let i in rows) {
      this.rows[i] = new Row(rows[i])
    }
    this.elem = document.createElement('TABLE')
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
    `)
  }
  renderRow() {
    for (const i of Object.keys(this.rows)) {
      // console.log(this.rows[i].render())
      this.rows[i].render()
    }
  }
}


