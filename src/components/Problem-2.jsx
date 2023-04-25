import axios from "axios";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const Problem2 = () => {
	const [contacts, setContacts] = useState([]);
	const [modalState, setModalState] = useState();
	const [showModal, setShowModal] = useState(false);

	const handleShow = (e) => {
		setShowModal(true);
		setModalState(e.target.value);

		if (e.target.value === "A") {
			fetchContactData();
		} else {
			const filterContact = contacts.filter(
				(contact) =>
					contact.country.name.toLowerCase().trim() === "united states".trim()
			);
			setContacts(filterContact);
		}
	};

	const handleClose = () => setShowModal(false);

	const fetchContactData = async () => {
		const result = await axios.get(
			"https://contact.mediusware.com/api/contacts/"
		);

		setContacts(result.data.results);
	};
	useEffect(() => {
		fetchContactData();
	}, []);

	return (
		<div className="container">
			<div className="row justify-content-center mt-5">
				<h4 className="text-center text-uppercase mb-5">Problem-2</h4>
				<div className="d-flex justify-content-center gap-3">
					<button
						value="A"
						onClick={(e) => handleShow(e)}
						className="btn btn-lg btn-outline-primary"
						type="button"
					>
						All Contacts
					</button>
					<button
						value="B"
						onClick={(e) => handleShow(e)}
						className="btn btn-lg btn-outline-warning"
						type="button"
					>
						US Contacts
					</button>
				</div>
				<Modal show={showModal} onHide={handleClose}>
					<Modal.Header closeButton>
						<Modal.Title>Contact Modal {modalState} </Modal.Title>
					</Modal.Header>

					<Modal.Body>
						<div className="d-flex justify-content-center gap-3">
							<button
								value="A"
								onClick={(e) => handleShow(e)}
								className="btn btn-lg btn-outline-primary"
								type="button"
							>
								All Contacts
							</button>
							<button
								value="B"
								onClick={(e) => handleShow(e)}
								className="btn btn-lg btn-outline-warning"
								type="button"
							>
								US Contacts
							</button>
							<button
								className="btn btn-lg btn-outline-primary"
								onClick={handleClose}
							>
								Close
							</button>
						</div>

						<div>
							{contacts?.map((contact) => (
								<React.Fragment key={contact.id}>
									<p>{contact.phone}</p>
								</React.Fragment>
							))}
						</div>
					</Modal.Body>

					<Modal.Footer></Modal.Footer>
				</Modal>
			</div>
		</div>
	);
};

export default Problem2;
