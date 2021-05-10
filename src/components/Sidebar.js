import React from 'react';
import styled from 'styled-components';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import CreateIcon from '@material-ui/icons/Create';
import InsertCommentIcon from '@material-ui/icons/InsertComment';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import AppsIcon from '@material-ui/icons/Apps';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import SidebarOption from './SidebarOption';
import AddIcon from '@material-ui/icons/Add';
import { useCollection } from 'react-firebase-hooks/firestore';
import { auth, db } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

function Sidebar() {
	const [channels, loading, error] = useCollection(db.collection('rooms'));
	const [user] = useAuthState(auth);

	return (
		<SidebarContainer>
			<SidebarHeader>
				<SidebarInfo>
					<h2>Community HQ</h2>
					<h3>
						<FiberManualRecordIcon />
						{user.displayName}
					</h3>
				</SidebarInfo>
				<CreateIcon />
			</SidebarHeader>

			<SidebarOption Icon={InsertCommentIcon} title='Threads' />
			<SidebarOption Icon={InboxIcon} title='Mentions & reactions' />
			<SidebarOption Icon={DraftsIcon} title='Saved items' />
			<SidebarOption Icon={BookmarkBorderIcon} title='Channel browser' />
			<SidebarOption Icon={PeopleAltIcon} title='People & user groups' />
			<SidebarOption Icon={AppsIcon} title='Apps' />
			<SidebarOption Icon={FileCopyIcon} title='File browser' />
			<SidebarOption Icon={ExpandLessIcon} title='Show less' />
			<hr />
			<SidebarOption Icon={ExpandMoreIcon} title='Channels' />
			<hr />
			<SidebarOption Icon={AddIcon} addChannelOption title='Add channel' />

			{channels?.docs.map(doc => (
				<SidebarOption key={doc.id} id={doc.id} title={doc.data().name} />
			))}
		</SidebarContainer>
	);
}

export default Sidebar;

const SidebarContainer = styled.div`
	flex: 0.3;
	color: white;
	background-color: var(--primary-color);
	border-top: 1px solid var(--accent-color);
	max-width: 240px;
	margin-top: 60px;

	> hr {
		margin-top: 10px;
		margin-bottom: 10px;
		border: 1px solid var(--accent-color);
	}
`;

const SidebarHeader = styled.div`
	display: flex;
	border-bottom: 1px solid var(--accent-color);
	padding: 13px;

	> .MuiSvgIcon-root {
		padding: 8px;
		color: var(--accent-color);
		font-size: 18px;
		background-color: white;
		border-radius: 999px;
	}
`;

const SidebarInfo = styled.div`
	flex: 1;

	> h2 {
		font-size: 15px;
		font-weight: 900;
		margin-bottom: 5px;
	}

	> h3 {
		display: flex;
		font-size: 13px;
		font-weight: 400;
		align-items: center;
	}

	> h3 > .MuiSvgIcon-root {
		font-size: 14px;
		margin-top: 1px;
		margin-right: 2px;
		color: green;
	}
`;
