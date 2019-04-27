import React, { Component } from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import { List, ListItem } from 'material-ui/List'
import UploadFileIcon from 'material-ui/svg-icons/file/file-upload'
import Subheader from 'material-ui/Subheader'
import Divider from 'material-ui/Divider'
import { TagsInput } from 'components/BasicComponents'
import classes from './SideMenu.scss'
import { constants } from 'utils'
import ActionDescription from 'material-ui/svg-icons/Action/description'
import ActionViewColumn from 'material-ui/svg-icons/Action/view-column'
import FileFolderOpen from 'material-ui/svg-icons/File/folder-open'
import EdittorPieChartOutlined from 'material-ui/svg-icons/Editor/pie-chart-outlined'
import ActionSchedule from 'material-ui/svg-icons/Action/schedule'
import ActionToday from 'material-ui/svg-icons/Action/today'
import ActionViewDay from 'material-ui/svg-icons/Action/view-day'
import ActionViewWeek from 'material-ui/svg-icons/Action/view-week'
import ActionDateRange from 'material-ui/svg-icons/Action/date-range'
import ActionDelete from 'material-ui/svg-icons/Action/delete'
import Contentclear from 'material-ui/svg-icons/Content/clear'

const listItemStyle = { fontSize: '15px', padding: '12px 7px 15px 50px', color: '#343434' }
const StyledListItem = (props) => <ListItem innerDivStyle={listItemStyle} {...props} />

const SecondaryText = (props) => <div {...props} style={{ fontSize: '11px', color: '#aaaaaa', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} />

const leftIconstyle = { 'margin': '10px 0px', 'left': '14px', 'height': '20px' }

const subHeaderStyle = { fontSize: '15px', color: '#3d44ac', lineHeight: '20px', cursor: 'default', fontFamily: 'Roboto, sans-serif' }
const MenuLabel = ({ children, ...props }) => <Subheader {...props} style={subHeaderStyle}>{children}</Subheader>



class SideMenu extends Component {
    render() {
        const {
            performSearchByQuery,
            performSearchBySize,
            performSearchByWhen,
            performSearchByShow,
            performSearchByTag,
            toggleUploadModal,
            setSearchResultView,
            searchView,
            allTags,
            localization
        } = this.props

        return (
            <div className={classes.sideMenuContainer} >
                <RaisedButton
                    label={localization.searchPage.uploadLabel}
                    style={{ margin: '0px 16px 25px 16px' }}
                    labelColor={'#3d44ac'}
                    backgroundColor={'#ffffff'}
                    icon={<UploadFileIcon />}
                    onTouchTap={toggleUploadModal}
                />
                <Divider style={{ marginBottom: '10px' }} />
                <MenuLabel>{localization.searchPage.viewLabel}</MenuLabel>
                <List>
                    <StyledListItem
                        leftIcon = {<ActionDescription style={leftIconstyle}/>}
                        primaryText={localization.searchPage.detailedViewLabel}
                        style=  {{fontWeight: searchView === constants.DETAILED_VIEW ? 'bold' : 'normal'}}
                        onTouchTap={() => setSearchResultView(constants.DETAILED_VIEW)}
                    />
                    <StyledListItem
                        leftIcon = {<ActionViewColumn style={leftIconstyle} />}
                        primaryText={localization.searchPage.tableViewLabel}
                        style={{ fontWeight: searchView === constants.TABLE_VIEW ? 'bold' : 'normal' }}
                        onTouchTap={() => setSearchResultView(constants.TABLE_VIEW)}
                    />
                    <StyledListItem
                        leftIcon = {<FileFolderOpen style={leftIconstyle} />}
                        primaryText={localization.searchPage.folderViewLabel}
                        style={{ fontWeight: searchView === constants.FOLDER_VIEW ? 'bold' : 'normal' }}
                        onTouchTap={() => setSearchResultView(constants.FOLDER_VIEW)}
                    />
                    <StyledListItem
                        leftIcon = {<EdittorPieChartOutlined style={leftIconstyle} />}
                        primaryText={localization.searchPage.statisticsViewLabel}
                        style={{ fontWeight: searchView === constants.STATISTICS_VIEW ? 'bold' : 'normal' }}
                        onTouchTap={() => setSearchResultView(constants.STATISTICS_VIEW)}
                    />
                </List>
                {allTags.length > 0 &&
                    <div>
                        <Divider />
                        <List>
                            <MenuLabel>{localization.searchPage.tagsLabel}</MenuLabel>
                            <TagsInput
                                tags={allTags}
                                showRemoveIcon={false}
                                showAddField={false}
                                performSearchByTag={performSearchByTag}
                                style={{ cursor: 'pointer', paddingLeft: '23px' }}
                            />
                        </List>
                    </div>}
                <Divider style={{ marginBottom: '10px' }} />
                <MenuLabel>{localization.searchPage.timeRangeLabel}</MenuLabel>
                <List>
                    <StyledListItem leftIcon = {<ActionSchedule style={leftIconstyle} />} primaryText={localization.searchPage.todayLabel} onTouchTap={() => performSearchByWhen('today')} />
                    <StyledListItem leftIcon = {<ActionViewDay style={leftIconstyle} />}primaryText={localization.searchPage.yesterdayLabel} onTouchTap={() => performSearchByWhen('yesterday')} />
                    <StyledListItem leftIcon = {<ActionViewWeek style={leftIconstyle} />}primaryText={localization.searchPage.thisWeekLabel} onTouchTap={() => performSearchByWhen('thisweek')} />
                    <StyledListItem leftIcon = {<ActionToday style={leftIconstyle} />} primaryText={localization.searchPage.thisMonthLabel} onTouchTap={() => performSearchByWhen('thismonth')} />
                    <StyledListItem leftIcon = {<ActionDateRange style={leftIconstyle} />}primaryText={localization.searchPage.thisYearLabel} onTouchTap={() => performSearchByWhen('thisyear')} />
                </List>

                <Divider />
                <List>
                    <StyledListItem
                        leftIcon = {<ActionDelete style={leftIconstyle} />}
                        primaryText={localization.searchPage.removedFilesLabel}
                        onTouchTap={() => performSearchByShow('removed')}
                    />
                     <StyledListItem
                        leftIcon = {<Contentclear style={leftIconstyle} />}
                        primaryText={localization.searchPage.clearQueryLabel}
                        onTouchTap={() => performSearchByQuery('')}
                        style={{ color: '#dd6666' }}
                    />
                </List>
            </div>
        )
    }
}

SideMenu.propTypes = {
    performSearchByQuery: React.PropTypes.func.isRequired,
    performSearchBySize: React.PropTypes.func.isRequired,
    performSearchByWhen: React.PropTypes.func.isRequired,
    performSearchByShow: React.PropTypes.func.isRequired,
    performSearchByTag: React.PropTypes.func.isRequired,
    toggleUploadModal: React.PropTypes.func.isRequired,
    setSearchResultView: React.PropTypes.func.isRequired,
    searchView: React.PropTypes.string.isRequired,
    allTags: React.PropTypes.array.isRequired,
    localization: React.PropTypes.object.isRequired
}

export default SideMenu




