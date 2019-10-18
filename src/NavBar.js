import React from 'react'

function NavBar(props) {
    const {isNavBarOpen} = props
    const {lists} = props
    const {addList} = props
    return (
      <div id="nav-bar" className="nav-left">
          <div className="nav-header">
              <button id="menu-btn"
                onClick={props.toggleMenu}>
                <i className="material-icons">menu</i>
              </button>
          </div>
          <div className="nav-content">
              <ul>
                  <div className="nav-item">
                      <li>
                          <div className="item-icon">
                              <i className="material-icons">wb_sunny</i>
                          </div>
                          <div className= { isNavBarOpen
                                            ? "item-description display" : "item-description"}>
                              <span>My Day</span>
                          </div>
                      </li>
                  </div>
                  <div className="nav-item">
                      <li>
                          <div className="item-icon">
                              <i className="material-icons">star_border</i>
                          </div>
                          <div className= { isNavBarOpen
                                            ? "item-description display" : "item-description"}>
                              <span>Important</span>
                          </div>
                      </li>
                  </div>
                  <div className="nav-item">
                      <li>
                          <div className="item-icon">
                              <i className="material-icons">date_range</i>
                          </div>
                          <div className= { isNavBarOpen
                                            ? "item-description display" : "item-description"}>
                              <span>Planned</span>
                          </div>
                      </li>
                  </div>
                  <div className="nav-item">
                      <li>
                          <div className="item-icon green">
                              <i className="material-icons">person_outline</i>
                          </div>
                          <div className= { isNavBarOpen
                                            ? "item-description display" : "item-description"}>
                              <span>Assigned To Me</span>
                          </div>
                      </li>
                  </div>
                  <div id="listsMenu" className="nav-item lists">
                    {lists.map(list => (
                        <Lists key={list.id} status={isNavBarOpen} list={list}
                            {...props}></Lists>
                    ))}
                  </div>
                  <div className="nav-item empty">
                  </div>
              </ul>
              <div className="add-list">
                  <div className="add-list-icon">
                      <label htmlFor="addList-input">
                          <i id="add-btn" className="material-icons" value="close">add</i>
                      </label>
                  </div>
                  <div className= { isNavBarOpen
                                    ? "item-description add-list-input display"
                                    : "item-description add-list-input"}>
                      <input name="name" id="addList-input" type="text" maxLength="255"
                            placeholder="New list"
                            onKeyUp={addList}/>
                  </div>
              </div>
            </div>
        </div>
    )
}

function Lists(props) {
    const {list} = props
    const {status} = props
    const {setCurrentList} = props
    const displayClass = status ? "display" : ""
    const grayClass = (props.currentList.id === list.id) ? "" : "gray-color"
    return (
        <li onClick={() => setCurrentList(list)}>
            <div className="item-icon">
                <i className="material-icons">list</i>
            </div>
            <div className= {`item-description ${displayClass} ${grayClass}`}>
                <span>{list.name}</span>
            </div>
        </li>
    )
}

export default NavBar