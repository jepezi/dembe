import React from 'react';
import PropTypes from 'prop-types'

function syncComponent(chunkName, mod) {
  const Component = mod.default ? mod.default : mod

  function SyncComponent(props) {
    if(props.context.chunks) {
      props.context.chunks.push(chunkName)
    }

    return <Component {...props} />
  }

  SyncComponent.propTypes = {
    context: PropTypes.object,
  }

  return SyncComponent
}

export const AsyncHome = syncComponent('Home', require('./Home/Home'))
export const AsyncAbout = syncComponent('About', require('./About/About'))
