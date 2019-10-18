import React from 'react'

function TaskDetails(props) {
      const {toggleTaskDetails} = props
    return (
      <div className="right-column" id="rightColumn">
              <div className="inner tasks-bar right">
                  <div className="task-icon">
                      <i id="tasksIcon-right" className="material-icons">radio_button_unchecked</i>
                  </div>
                  <div className="task-input">
                      <input id="tasksInput-right" type="text" readOnly/>
                  </div>
              </div>
              <div className="right-scroll">
                  <div className="right steps">
              <div id="subTasks" className="inner">
                  <div className="subTask">
                      <div className="task-icon">
                          <i className="material-icons">radio_button_unchecked</i>
                      </div>
                      <div className="task-input">
                          <input id="SubTasksInput" type="text"/>
                      </div>
                  </div>
              </div>
              <div className="inner new-task-right">
                  <div className="task-icon">
                      <label htmlFor="newSubTask-input">
                          <i className="material-icons">add</i>
                      </label>
                  </div>
                  <div className="task-input">
                      <input id="newSubTask-input" type="text" placeholder="Add step"/>
                  </div>
              </div>
          </div>
          <div className="right my-day">
              <div className="inner">
                  <span>
                      <i className="material-icons" >
                          wb_sunny
                      </i>
                  </span>
                  <span className="right-inner-text">Add to My Day</span>
              </div>
          </div>
          <div className="right options">
              <div className="inner">
                  <span>
                      <i className="material-icons" >
                          access_alarm
                      </i>
                  </span>
                  <span className="right-inner-text">Remind me</span>
              </div>
              <div className="inner">
                  <span>
                      <i className="material-icons" >
                          today
                      </i>
                  </span>
                  <span className="right-inner-text">Add due date</span>
              </div>
              <div className="inner">
                  <span>
                      <i className="material-icons" >
                          repeat
                      </i>
                  </span>
                  <span className="right-inner-text">Repeat</span>
              </div>
          </div>
          <div className="right add-files">
              <div className="inner">
                  <span>
                      <i className="material-icons" >
                          attach_file
                      </i>
                  </span>
                  <span className="right-inner-text">Add file</span>
              </div>
          </div>
          <div className="right notes">
              <div className="inner">
                  <span contentEditable="true" id="add-notes"></span>
              </div>
          </div>
          </div>
          <div className="footer">
              <div className="footer-close-btn">
                  <i id="close-right-column" className="material-icons"
                    onClick={toggleTaskDetails}>arrow_forward</i>
              </div>
          </div>
      </div>
    )
}

export default TaskDetails