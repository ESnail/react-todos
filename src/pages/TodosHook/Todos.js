import React, { useState, useEffect, useRef } from 'react'
import './Todos.css'

function Todos () {
  let initList = [ { id: 1, title: '工作', list: [ { id: 1, con: '静态页面开发', status: 'todo' } ] } ]
  // 重新初始化，设置数据
  let lists = window.localStorage.getItem('todos-hook-list')
  lists = lists ? JSON.parse(lists) : initList
  initList = lists
  const [ list, setList ] = useState(initList)
  const [ active, setActive ] = useState(list.length)
  const [ isEditTitle, setIsEditTitle ] = useState(false)

  const [ menuOp, setMenuOp ] = useState(null)

  const menuRef = useRef(null)

  const newMenu = () => {
    list.reverse()
    const id = list.length + 1
    setList([ ...list, { id, title: '代办事项', list: [] } ].reverse())
    setActive(id)
    setMenuOp('new')
  }

  const menuClick = (event) => {
    setActive(+event.target.dataset.id)
  }

  const activeItem = () => {
    return list.find(item => item.id === active)
  }

  const titleChange = (event) => {
    activeItem().title = event.target.value.trim()
    setList([ ...list ])
  }

  const submitTitle = (event) => {
    if (event.keyCode === 13) {
      const val = event.target.value.trim()
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
    let index
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

  const submitItem = (event) => {
    if (event.keyCode === 13) {
      const val = event.target.value.trim()
      if (!val) {
        window.alert('不能为空')
        return
      }
      activeItem().list.reverse()
      activeItem().list.push({ id: activeItem().list.length + 1, con: val, status: 'todo' })
      activeItem().list.reverse()
      setList([ ...list ])
      event.target.value = ''
    }
  }

  const changeStatus = (item) => {
    const listItem = activeItem().list.find(obj => obj.id === item.id)
    listItem.status = listItem.status === 'todo' ? 'done' : 'todo'
    setList([ ...list ])
  }

  const delItem = (item) => {
    let index
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
      window.localStorage.setItem('todos-hook-list', JSON.stringify(list))
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
                          <h3 onClick={ () => {setIsEditTitle(true)} }>
                              <span>✎</span>
                              <span className="ell" data-todos={ activeItem().list.filter(obj => obj.status === 'todo').length }>{activeItem() && `${ activeItem().id }. ${ activeItem().title }`}</span>
                          </h3>
                          <span className="del-all" onClick={ delAll }>ㄨ</span>
                      </div>
                      <div className={ [ 'title', isEditTitle ? '' : 'non' ].join(' ') }>
                          <input type="text" value={ activeItem() && activeItem().title } placeholder="请输入，回车确认" onChange={ titleChange } onKeyUp={ submitTitle }/>
                      </div>
                      <p><span className="item-new">✙</span><input type="text" placeholder="请输入，回车确认" onKeyUp={ submitItem } /></p>
                  </div>
        ): null}
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

export default Todos