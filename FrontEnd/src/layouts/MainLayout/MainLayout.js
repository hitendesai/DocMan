import React, { Component, PropTypes } from 'react'
import MainMenu from './components/MainMenu'
import { AmbarResponsiveLogo } from 'components/BasicComponents'
import AppBarTitle from './components/AppBarTitle'
import AppBar from 'material-ui/AppBar'
import LinearProgress from 'material-ui/LinearProgress'
import { User } from 'components/BasicComponents'



import classes from './MainLayout.scss'



class MainLayout extends Component {
    render() {
        const {
            children,
            fetching,
            changeLocation,
            location,
            toggleSideMenu,
            isSideMenuOpen,
            header,
            mode,
            version,
            allowedRoutes,
            setPageTitle,
            setAppHeader,
            auth,
            state,
            localization
        } = this.props

        return (
        
            <div style={{ height: '100%' }}>
                <div style={{ height: '100%' }}>
                <div style={{ width: '100%', height: '100%', overflowY: 'hidden', paddingTop: '64px' }}>
                        <div style={{ height: '100%', overflowY: 'auto' }}>
                            {React.cloneElement(children, { setPageTitle: setPageTitle, setAppHeader: setAppHeader })}
                        </div>
                    </div>
                    {fetching && <LinearProgress style={{ position: 'fixed', top: '64px'}} color="#FFAB00" />}
                    <AppBar
                        title={<AppBarTitle
                            data={header}
                            fetching={fetching}
                            currentApplicationState={state}
                        />}
                        style={{ position: 'fixed', top: 0, left: 0, backgroundColor: '#3d44ac', boxShadow: '0 0 15px rgba(0, 0, 0, 0.1)'}}
                        zDepth={2}
                        onRightIconButtonTouchTap={toggleSideMenu}
                        iconElementRight={
                        <MainMenu
                            isOpen={isSideMenuOpen}
                            currentLocation={location}
                            toggleMainMenu={toggleSideMenu}
                            changeLocation={changeLocation}
                            mode={mode}
                            allowedRoutes={allowedRoutes} 
                            auth={auth}
                            localization={localization}
                        />}
                        iconElementLeft={<div style={{ display: 'flex', flexDirection: 'row' }}>
                            <AmbarResponsiveLogo version={version} mode={mode} />
                        </div>}
                        />
                    </div>
                </div>
    
            )
        }

    static propTypes = {
        version: React.PropTypes.string.isRequired,
        children: React.PropTypes.element.isRequired,
        fetching: React.PropTypes.bool.isRequired,
        isSideMenuOpen: React.PropTypes.bool.isRequired,
        toggleSideMenu: React.PropTypes.func.isRequired,

        location: React.PropTypes.string.isRequired,
        changeLocation: React.PropTypes.func.isRequired,
        header: React.PropTypes.object.isRequired,



        setAppHeader: React.PropTypes.func.isRequired,
        setPageTitle: React.PropTypes.func.isRequired,

        auth: React.PropTypes.string.isRequired,

        state: React.PropTypes.object.isRequired
    }
}

export default MainLayout
