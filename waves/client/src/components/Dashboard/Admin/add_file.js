import React, { Component } from 'react';
import UserLayout from '../../../hoc/userLayout';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import { Link } from 'react-router-dom';

import { USER_SERVER } from '../../utils/misc';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faPlusCircle from '@fortawesome/fontawesome-free-solid/faPlusCircle';
import CircularProgress from '@material-ui/core/CircularProgress';

class AddFile extends Component {
  constructor() {
    super();
    this.state = {
      formSuccess: false,
      formError: false,
      uploading: false,
      files: []
    };
  }

  componentDidMount() {
    axios.get(`${USER_SERVER}/admin_files`).then(response => {
      this.setState({ files: response.data });
    });
  }

  onDrop(files) {
    this.setState({ uploading: true });
    let formData = new FormData();
    const config = {
      header: { 'content-type': 'multipart/form-data' }
    };

    formData.append('file', files[0]);

    axios.post(`${USER_SERVER}/uploadfile`, formData, config).then(response => {
      if (response.data.success) {
        this.setState({ formSuccess: true, formError: false, uploading: false }, () => {
          setTimeout(() => {
            this.setState({ formSuccess: false });
          }, 2000);
        });
      }
    });
  }

  showFileList = () =>
    this.state.files
      ? this.state.files.map((item, i) => (
          <li key={i}>
            <Link to={`${USER_SERVER}/download/${item}`} target="_self">
              {item}
            </Link>
          </li>
        ))
      : null;

  render() {
    return (
      <UserLayout>
        <h1>Upload file</h1>
        <div>
          <Dropzone onDrop={e => this.onDrop(e)} multiple={false} className="dropzone_box">
            <div className="wrap">
              <FontAwesomeIcon icon={faPlusCircle} />
            </div>
          </Dropzone>
          {this.state.uploading ? (
            <div className="dropzone_box" style={{ textAlign: 'center', paddingTop: '60px' }}>
              <CircularProgress style={{ color: '#00bcd4' }} thickness={7} />
            </div>
          ) : null}
          <div style={{ clear: 'both' }}>
            {this.state.formSuccess ? <div className="form_success">Success</div> : null}
            {this.state.formError ? <div className="error_label">Please check your data</div> : null}
          </div>
          <hr />
          <div>
            <ul>{this.showFileList()}</ul>
          </div>
        </div>
      </UserLayout>
    );
  }
}

export default AddFile;
