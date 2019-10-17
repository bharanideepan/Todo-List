import React from 'react';

class NavBar extends React.Component{
  render() {
    const {isNavBarOpen} = this.props;
    const {lists} = this.props;
    const {setCurrentList} = this.props;
    const {addList} = this.props;
    const {handleChange} = this.props;
    const {text} = this.props;
    return (
      <div id="nav-bar" className="nav-left">
          <div className="nav-header">
              <button id="menu-btn"
                onClick={this.props.toggleMenu}>
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
                            setCurrentList={setCurrentList}></Lists>
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
                      <input id="addList-input" type="text" maxLength="255" placeholder="New list"
                            onKeyUp={addList} onChange={handleChange} value={text}/>
                  </div>
              </div>
            </div>
         </div>
        )
    }
}

class Lists extends React.Component{
  render(){
      const {list} = this.props;
      const {status} = this.props;
      const {setCurrentList} = this.props
    return (
        <li onClick={() => setCurrentList(list)}>
            <div className="item-icon">
                <i className="material-icons">list</i>
            </div>
            <div className= {status ? "item-description display" : "item-description"}>
                <span>{list.name}</span>
            </div>
        </li>
    );
  }
}

export default NavBar;