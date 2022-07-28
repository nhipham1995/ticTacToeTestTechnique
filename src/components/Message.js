import React from 'react'

const Message = ({msg, timeOut}) => {
  return (
      <div>
          <div style={{margin: '15px', color: 'blue'}}>
            {(timeOut !== 0)? 'New game will start in: '+ timeOut +'s' : null}
          </div>
          <div style={{fontSize: '35px', color: 'green', marginBottom: '15px'}}>
            {msg}
          </div>
      </div>
  )
}

export default Message