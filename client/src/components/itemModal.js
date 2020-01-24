import React, { Component } from "react";
import {
	Button,
	Modal,
	ModalHeader,
	ModalBody,
	Form,
	FormGroup,
	Label,
	Input
} from "reactstrap";
import { connect } from "react-redux";
import { addItem } from "../actions/itemActions";
import uuid from "uuid";

class ItemModal extends Component {
	state = {
		modal: false,
		nanme: ""
	};

	toggle = () => {
		this.setState({
			modal: !this.state.modal
		});
	};

	onChange = e => {
		this.setState({
			[e.target.name]: e.target.value
		});
	};

	onSubmit = e => {
		e.preventDefault();

		const newItem = {
			id: uuid(),
			name: this.state.name
		};

		// add item via addItem action
		this.props.addItem(newItem);
		this.toggle();
	};

	render() {
		return (
			<div>
				<Button
					color="dark"
					style={{ marginTop: "2rem", marginBottom: "2rem" }}
					onClick={this.toggle}
				>
					Add Item
				</Button>

				<Modal isOpen={this.state.modal} toggle={this.toggle}>
					<ModalHeader toggle={this.toggle}>Add to List</ModalHeader>
					<ModalBody>
						<Form onSubmit={this.onSubmit}>
							<FormGroup>
								<Label for="item">Item</Label>
								<Input
									type="text"
									name="name"
									id="item"
									placeholder="Add Item"
									onChange={this.onChange}
								/>
								<Button
									color="dark"
									style={{ marginTop: "2rem" }}
									block
								>
									Add
								</Button>
							</FormGroup>
						</Form>
					</ModalBody>
				</Modal>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	item: state.item
});

export default connect(mapStateToProps, { addItem })(ItemModal);