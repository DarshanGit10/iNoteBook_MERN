import React from 'react'

export default function Alert(props) {

  function capitalize(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }
  return (
    <>
      <div style={{ height: '50px' }}>
        {props.alert && props.alert.ty !== null ? (
          <div className={`alert alert-${props.alert.ty} alert-dismissible fade show`} role="alert" >
            <strong>{capitalize(props.alert.ty)}</strong>: {props.alert.msg}
          </div>
        ) : null}
      </div> </>
  );


}