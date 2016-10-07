'use strict';

import React, { Component, PropTypes } from 'react';
import {
  Button,
  ListGroup,
  ListGroupItem,
  Overlay
} from 'react-bootstrap';
import { viewLandingPage, viewTripsPage } from 'app/actions/navigation';
import { colors, dimensions } from 'app/constants';

class NavigationAvatar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gravatarFocused: false,
      tooltipVisible: false
    };
  }

  render() {
    const { name, onLogoutPress, picture, viewLandingPage } = this.props;
    const { gravatarFocused, tooltipVisible } = this.state;

    const accountPopover = (
      <ListGroup style={styles.popover}>
        <ListGroupItem style={styles.popoverName}>{name}</ListGroupItem>
        <ListGroupItem style={styles.popoverTBD}>View Account</ListGroupItem>
        <ListGroupItem href="/trips">My Trips</ListGroupItem>
        <ListGroupItem onClick={onLogoutPress}>Log Out</ListGroupItem>
      </ListGroup>
    );

    return (
      <div>
        <div
          ref={x => this.gravatar = x}
          style={styles.gravatarBackground}

          // Attach to these mouse events to mimic active state for profile pic
          onMouseUp={this.onGravatarInactive.bind(this)}
          onDragEnd={this.onGravatarInactive.bind(this)}
          onMouseDown={this.onGravatarActive.bind(this)}

          // Display the popover on click
          onClick={this.toggleTooltipVisible.bind(this)}
        >
          <img
            src={picture}
            style={gravatarFocused ? styles.gravatarDimmed : styles.gravatar}
          />
        </div>

        <Overlay
          animation={false}
          onHide={this.hideTooltip.bind(this)}
          placement="bottom"
          rootClose
          show={tooltipVisible}
          target={this.gravatar}
        >
          {accountPopover}
        </Overlay>
      </div>
    );
  }

  toggleTooltipVisible() {
    this.setState({ tooltipVisible: !this.state.tooltipVisible });
  }

  hideTooltip() {
    this.setState({ tooltipVisible: false });
  }

  onGravatarInactive() {
    this.setState({ gravatarFocused: false });
  }

  onGravatarActive() {
    this.setState({ gravatarFocused: true });
  }
}

NavigationAvatar.propTypes = {
  name: PropTypes.string.isRequired,
  onLogoutPress: PropTypes.func.isRequired,
  picture: PropTypes.string.isRequired
};

const styles = {
  gravatar: {
    borderRadius: '50%',
    cursor: 'pointer',
    width : 40
  },
  gravatarBackground: {
    backgroundColor: 'black',
    borderRadius: '50%'
  },
  gravatarDimmed: {
    borderRadius: '50%',
    width : 40,
    opacity: 0.8
  },
  popover: {
    boxShadow: '0 5px 10px rgba(0,0,0,.2)',
    borderRadius: 4,
    paddingTop: 5,
    position: 'absolute',
    zIndex: 1
  },
  popoverName: {
    backgroundColor: '#eeeeee',
    cursor: 'default',
    fontWeight: 500,

    // Disable text selection
    MozUserSelect: 'none',
    WebkitUserSelect: 'none',
    msUserSelect: 'none'
  },
  popoverTBD: {
    color: '#cccccc',
    cursor: 'default',

    // Disable text selection
    MozUserSelect: 'none',
    WebkitUserSelect: 'none',
    msUserSelect: 'none'
  }
};

export default NavigationAvatar;
