import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Container, Col, Row, Card } from "react-bootstrap";
import Chat from 'components/Chat.js';

const useStyles = makeStyles((theme) => ({
	root: {
		marginTop: "4vh",
		textAlign: "center"
	},
	blank: {
		height: "20px",
		width: "auto "
	},
	chat: {
		height: "500px",
		width: "auto"
	}
}));

function ChatContainer(props) {
	const classes = useStyles();

	return (
		<Grid className={classes.root}>
			<Row>
				<Col>
				</Col>
				<Col xs={8}>
					<Row className={classes.blank}></Row>
					<Row className={classes.chat}>
						{/* <Chat targetuser={props.location.state['targetUser']} /> */}
						<Chat />
					</Row>
					<Row className={classes.blank}></Row>
				</Col>
				<Col>
				</Col>
			</Row>
		</Grid>

	);
}

export default ChatContainer;