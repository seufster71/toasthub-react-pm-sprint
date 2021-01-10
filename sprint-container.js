/*
 * Copyright (C) 2020 The ToastHub Project
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use-strict';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as sprintActions from './sprint-actions';
import fuLogger from '../../core/common/fu-logger';
import SprintView from '../../memberView/pm_sprint/sprint-view';
import SprintModifyView from '../../memberView/pm_sprint/sprint-modify-view';
import BaseContainer from '../../core/container/base-container';

class PMSprintContainer extends BaseContainer {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		this.props.actions.init();
	}
	
	getState = () => {
		return this.props.pmsprint;
	}
	
	getForm = () => {
		return "PM_SPRINT_FORM";
	}
	
	onOption = (code,item) => {
		fuLogger.log({level:'TRACE',loc:'PMTeamContainer::onOption',msg:" code "+code});
		if (this.onOptionBase(code,item)) {
			return;
		}
		
		switch(code) {
			case 'EDIT_ROLE': {
				this.onEditRoles(item);
				break;
			}
		}
	}

	render() {
		fuLogger.log({level:'TRACE',loc:'SprintContainer::render',msg:"Hi there"});
		if (this.props.pmsprint.isModifyOpen) {
			return (
				<SprintModifyView
				itemState={this.props.pmsprint}
				appPrefs={this.props.appPrefs}
				onSave={this.onSave}
				onCancel={this.onCancel}
				inputChange={this.inputChange}
				/>
			);
		} else if (this.props.pmsprint.items != null) {
			return (
				<SprintView
				itemState={this.props.pmsprint}
				appPrefs={this.props.appPrefs}
				onListLimitChange={this.onListLimitChange}
				onSearchChange={this.onSearchChange}
				onSearchClick={this.onSearchClick}
				onPaginationClick={this.onPaginationClick}
				onOrderBy={this.onOrderBy}
				closeModal={this.closeModal}
				onOption={this.onOption}
				inputChange={this.inputChange}
				session={this.props.session}
				/>
			);
		} else {
			return (<div> Loading... </div>);
		}
	}
}

PMSprintContainer.propTypes = {
	appPrefs: PropTypes.object,
	actions: PropTypes.object,
	pmsprint: PropTypes.object,
	session: PropTypes.object
};

function mapStateToProps(state, ownProps) {
  return {appPrefs:state.appPrefs, pmsprint:state.pmsprint, session:state.session};
}

function mapDispatchToProps(dispatch) {
  return { actions:bindActionCreators(sprintActions,dispatch) };
}

export default connect(mapStateToProps,mapDispatchToProps)(PMSprintContainer);
