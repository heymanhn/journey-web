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
      <div style={styles.popover}>
        <div style={styles.popoverArrowBorder}/>
        <div style={styles.popoverArrow}/>
        <ListGroup style={styles.popoverList}>
          <ListGroupItem style={styles.popoverName}>{name}</ListGroupItem>
          <ListGroupItem style={styles.popoverTBD}>View account</ListGroupItem>
          <ListGroupItem
            style={styles.popoverListItem}
            href="/trips"
          >
            My trips
          </ListGroupItem>
          <ListGroupItem
            style={styles.popoverListItem}
            onClick={onLogoutPress}
          >
            Log out
          </ListGroupItem>
        </ListGroup>
      </div>
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
    borderRadius: 4,
    boxShadow: '0 5px 10px rgba(0,0,0,.2)',
    paddingTop: 3,
    position: 'absolute',
    zIndex: 1
  },
  popoverList: {
    backgroundColor: 'white',
    border: '1px solid #dddddd',
    borderRadius: 4,
    marginBottom: 0,
    padding: 1
  },
  popoverArrow: {
    position: 'absolute',
    width: 0,
    height: 0,
    left: '50%',
    top: -5,
    borderRight: '10px solid transparent',
    borderLeft: '10px solid transparent',
    borderBottom: '10px solid #ffffff',
    transform: 'translate(-50%)',
    zIndex: 1
  },
  popoverArrowBorder: {
    position: 'absolute',
    width: 0,
    height: 0,
    left: '50%',
    top: -6,
    borderRight: '10px solid transparent',
    borderLeft: '10px solid transparent',
    borderBottom: '10px solid #dddddd',
    transform: 'translate(-50%)',
    zIndex: 1
  },
  popoverListItem: {
    border: 'none'
  },
  popoverName: {
    backgroundColor: '#f3f3f3',
    border: 'none',
    cursor: 'default',
    fontWeight: 500,

    // Disable text selection
    MozUserSelect: 'none',
    WebkitUserSelect: 'none',
    msUserSelect: 'none'
  },
  popoverTBD: {
    border: 'none',
    borderTop: '1px solid #e3e3e3',
    color: '#cccccc',
    cursor: 'default',

    // Disable text selection
    MozUserSelect: 'none',
    WebkitUserSelect: 'none',
    msUserSelect: 'none'
  }
};

export default NavigationAvatar;
