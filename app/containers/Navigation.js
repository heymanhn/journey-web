'use strict';

import { connect } from 'react-redux';
import NavigationBar from 'app/components/NavigationBar';

const mapStateToProps = (state) => {
  return {
    user: state.authState.user
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavigationBar);
