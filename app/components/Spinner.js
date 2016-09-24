'use strict';

import React, { Component } from 'react';

class Spinner extends Component {
  /*
   * Copyright (c) 2016 Cheng Lou
   * Borrowed from: https://github.com/chenglou/react-spinner
   */
  render() {
    let bars = [];
    const props = this.props;

    for (let i = 0; i < 12; i++) {
      let barStyle = {};
      barStyle.WebkitAnimationDelay = barStyle.animationDelay =
        (i - 12) / 10 + 's';

      barStyle.WebkitTransform = barStyle.transform =
        'rotate(' + (i * 30) + 'deg) translate(146%)';

      bars.push(
        <div style={barStyle} className="react-spinner_bar" key={i} />
      );
    }

    return (
      <div
        {...props}
        className={(props.className || '') + ' react-spinner'}
        style={styles.spinner}
      >
        {bars}
      </div>
    );
  }
}

const styles = {
  spinner: {
    position: 'relative',
    width: 30,
    height: 30,
    top: '50%',
    left: '50%'
  }
};

export default Spinner;