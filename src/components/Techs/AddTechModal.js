import React, { useState} from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import nextId from 'react-id-generator';
import { addTech } from '../../actions/techActions';
import M from 'materialize-css/dist/js/materialize.min.js';

const AddTechModal = ({addTech}) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState(false);
    const onSubmit = () => {
        const newId = nextId();
        if (firstName === '' || lastName === '') {
            M.toast({ html: 'Please enter the Technicians first name and last name' })
        } else {
            addTech({
                firstName,
                lastName,
                id: newId
            })
            M.toast({ html: `${firstName} ${lastName} has been added as a technician` })
            //Clear Fields
            setFirstName('');
            setLastName('');
        }
    }
    return (
        <div id='add-tech-modal' className='modal' >
            <div className="modal-content">
                <h4>Add New Technician</h4>
                <div className="row">
                    <div className="input-field">
                        <input
                            type="text"
                            name="firstName"
                            value={firstName}
                            onChange={e => setFirstName(e.target.value)}
                        />
                        <label htmlFor="firstName" className="active">
                            First Name
                        </label>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field">
                        <input
                            type="text"
                            name="lastName"
                            value={lastName}
                            onChange={e => setLastName(e.target.value)}
                        />
                        <label htmlFor="lastName" className="active">
                            Last Name
                        </label>
                    </div>
                </div>
                <div className="modal-footer">
                    <a href="#!" onClick={onSubmit} className="modal-close waves-effect waves-light btn">Enter</a>
                </div>
            </div>
        </div>
    )
}
AddTechModal.propTypes = {
    addTech: PropTypes.func.isRequired,
}


export default connect(null, {addTech})(AddTechModal);
