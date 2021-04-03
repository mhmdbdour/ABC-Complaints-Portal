import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getusers, updaterole } from '../../actions/superAdmin';


const AdminDashboard = ({ getusers, user: { users }, updaterole }) => {

    useEffect(() => {
        getusers();
    }, [getusers, users]);

    const [edit, setedit] = useState('');
    const [formData, setFormData] = useState({
        role: "user",
    });

    const { role } = formData;

    const onChange = e =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        window.scrollTo(0, 0);
        setedit("");
        const id = edit;
        await updaterole(id, role);
        setFormData({
            role: "user",
        });
    }

    return (
        <Fragment>
            {users.map((user) => (

                edit === user._id ?
                    <div className="card mb-3">
                        <div className="card-body">
                            <h5 className="card-title">name: {user.name} </h5>
                            <h5 className="card-title">email: {user.email} </h5>
                            <hr />
                            <form onSubmit={onSubmit}>
                                <div style={{ display: 'flex', alignItems: "center" }}>

                                    <h5 className='card-title float-left text-success mr-3'  >role:</h5>
                                    <select name='role' value={role} onChange={onChange} class="form-control w-50 mb-2" autoFocus>
                                        <option value='user' >user</option>
                                        <option value='admin' >admin</option>
                                        <option value='superAdmin' >superAdmin</option>
                                    </select>
                                </div>
                                <button onClick={() => setedit("")} className="btn btn-info float-right">Cancel</button>
                                <button type="submit" class="btn btn-primary float-right mr-3">Submit</button>
                            </form>
                        </div>
                    </div>
                    :
                    <div className="card mb-3">
                        <div className="card-body">
                            <h5 className="card-title">name: {user.name} </h5>
                            <h5 className="card-title">email: {user.email} </h5>
                            <h5 className="card-title">role: {user.role} </h5>
                            <hr />
                            <button onClick={() => setedit(user._id)} className="btn btn-info float-right  mr-3">edit</button>
                        </div>
                    </div>
            ))}
        </Fragment>
    );
};

AdminDashboard.propTypes = {
    getusers: PropTypes.func.isRequired,
    updaterole: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    user: state.user
});


export default connect(mapStateToProps, { getusers, updaterole })(AdminDashboard);