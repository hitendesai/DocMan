import { connect } from 'react-redux'
import { stateValueExtractor } from 'utils/'
import {
  postConfigRequest,
  checkIfAllowed,
  toggleSideMenu,
  changeLocation,
  setAppHeader,
} from '../modules/MainLayout'

import MainLayout from 'layouts/MainLayout/MainLayout'

const mapDispatchToProps = {
  postConfigRequest,
  toggleSideMenu,
  changeLocation,
  setAppHeader,
}

const mapStateToProps = (state, ownProps) => {
  return ({
    fetching: state['global'].fetching,
    children: ownProps.children,
    location: state['router'].locationBeforeTransitions.pathname,
    isSideMenuOpen: state['global'].isSideMenuOpen,
    header: state['global'].header,
    mode: state['core'].mode,
    version: state['core'].version,
    auth: state['core'].auth,
    state: state,
    localization: stateValueExtractor.getLocalization(state)
  })
}

export default connect(mapStateToProps, mapDispatchToProps)(MainLayout)