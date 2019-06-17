// import * as React from 'react'

// export interface HelloProps {
//   compiler: string;
//   framework: String;
// }

// // export const Hello = (props: HelloProps) => <h1>Hello from {props.compiler} and {props.framework}</h1>

// export class Hello extends React.Component<HelloProps, {}> {
//   render () {
//     return <h1>Hello from {this.props.compiler} and {this.props.framework}</h1>
//   }
//  }

//  export default function () {
//    return <Hello compiler="Typescript" framework="react"/>
//  }

import * as React from 'react'
import '../TodosHook/Todos.css'

const { useState, useEffect, useRef } = React

export default function () {
  let initList = [ { id: 1, title: '工作', list: [ { id: 1, con: '静态页面开发', status: 'todo' } ] } ]

  // 重新初始化，设置数据
  const TODOLIST = 'todos-hook-ts-list'
  const lists = window.localStorage.getItem(TODOLIST)
  if (lists) {
    initList = JSON.parse(lists)
  }

  const [ list, setList ] = useState(initList)
  const [ active, setActive ] = useState(list.length)
  const [ isEditTitle, setIsEditTitle ] = useState(false)

  const [ menuOp, setMenuOp ] = useState(null)

  const menuRef = useRef(null)

  const newMenu = () => {
    list.reverse()
    const id: number = list.length + 1
    setList([ ...list, { id, title: '代办事项', list: [] } ].reverse())
    setActive(id)
    setMenuOp('new')
  }

  const menuClick = (event: React.MouseEvent<HTMLElement>) => {
    setActive(+((event.target as HTMLElement).dataset.id))
  }

  const activeItem = () => {
    return list.find(item => item.id === active)
  }

  const titleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    activeItem().title = (event.target as HTMLInputElement).value.trim()
    setList([ ...list ])
  }

  const submitTitle = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.keyCode === 13) {
      const val: string = (event.target as HTMLInputElement).value.trim()
      if (!val) {
        window.alert('不能为空')
        return
      }
      setIsEditTitle(false)
      activeItem().title = val
      setList([ ...list ])
    }
  }

  const delAll = () => {
    let index: number
    list.forEach((item, i) => {
      if (item.id === activeItem().id) {
        index = i
      }
    })
    ~index && list.splice(index, 1)

    // 先完成动画，再渲染dom
    menuRef.current.children[ 0 ].classList.add('leave')
    window.setTimeout(() => {
      setList([ ...list ])
      setActive(list.length)
    }, 400);
  }

  const submitItem = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.keyCode === 13) {
      const target = event.target as HTMLInputElement
      const val: string = target.value.trim()
      if (!val) {
        window.alert('不能为空')
        return
      }
      activeItem().list.reverse()
      activeItem().list.push({ id: activeItem().list.length + 1, con: val, status: 'todo' })
      activeItem().list.reverse()
      setList([ ...list ])
      target.value = ''
    }
  }

  type Item = {
    id: string | number,
    status: string
  }

  const changeStatus = (item: Item) => {
    const listItem: Item = activeItem().list.find(obj => obj.id === item.id)
    listItem.status = listItem.status === 'todo' ? 'done' : 'todo'
    setList([ ...list ])
  }

  const delItem = (item: Item) => {
    let index: number
    activeItem().list.forEach((obj, i) => {
      if (obj.id === item.id) {
        index = i
      }
    })
    ~index && activeItem().list.splice(index, 1)
    setList([ ...list ])
  }

  // 动画
  useEffect(() => {
    // 新增执行动画
    if (menuOp === 'new') {
      menuRef.current.children[ 0 ].classList.add('enter')
    }
    // 下次动画有效
    return () => {
      setMenuOp(null)
    }
  }, [ menuOp ])

  // 缓存数据
  useEffect(() => {
    return () => {
      window.localStorage.setItem(TODOLIST, JSON.stringify(list))
    }
  }, [ list ])

  return (
      <div className="container">
          <aside className="menu">
              <p className="list-new" onClick={ newMenu }>⊹ 新增</p>
              <ul onClick={ menuClick } ref={ menuRef }>
                  {list.map(item => (
                      <li className={ [ 'ell', (item.id === active) ? 'active' : '' ].join(' ') } key={ item.id } data-id={ item.id } data-todos={ item.list.filter(obj => obj.status === 'todo').length }>{item.id}. {item.title}</li>
          ))}
              </ul>
          </aside>
          <section className="main">
              {activeItem() ? (
                  <div className="header">
                      <div className={ [ 'title', isEditTitle ? 'non' : '' ].join(' ') }>
                          <h3 onClick={ () => { setIsEditTitle(true) } }>
                              <span>✎</span>
                              <span className="ell" data-todos={ activeItem().list.filter(obj => obj.status === 'todo').length }>{activeItem() && `${ activeItem().id }. ${ activeItem().title }`}</span>
                          </h3>
                          <span className="del-all" onClick={ delAll }>ㄨ</span>
                      </div>
                      <div className={ [ 'title', isEditTitle ? '' : 'non' ].join(' ') }>
                          <input type="text" value={ activeItem() && activeItem().title } placeholder="请输入，回车确认" onChange={ titleChange } onKeyUp={ submitTitle } />
                      </div>
                      <p><span className="item-new">✙</span><input type="text" placeholder="请输入，回车确认" onKeyUp={ submitItem } /></p>
                  </div>
        ) : null}
              <ul>
                  {activeItem() && activeItem().list.map(((item) => (
                      <li key={ item.id } className={ item.status }>
                          <span onClick={ () => changeStatus(item) } className="op">{item.status === 'todo' ? '☐' : '✓'}</span>
                          <span className='con'>{item.id}. {item.con}</span>
                          <span onClick={ () => delItem(item) } className="del-item">ㄨ</span>
                      </li>
          )))}
              </ul>
          </section>
      </div>
  )
}