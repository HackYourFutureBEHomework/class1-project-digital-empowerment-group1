import React, { Component } from "react";
import {
  Card,
  Button,
  CardImg,
  Row,
  Col,
  Container,
  CardImgOverlay
} from "reactstrap";
import { Link } from "react-router-dom";

export default class PathCard extends Component {
  render() {
    const { handleEdit, handleDelete, path } = this.props;
    return (
      <Container>
        <Row>
          <Col xs="12" sm="12" md="12" lg='12' xl="12">
            <Card>
              <Link to={`/paths/${path._id}`}>
                <CardImg
                  top
                  width="100%"
                  src="https://source.unsplash.com/random/328x218?laptop,computer"
                  alt="Card image cap"
                />
                <CardImgOverlay>
                  <h3 className='path-info'>{path.title}</h3>
                </CardImgOverlay>
              </Link>
                  <div className='path-card-buttons'>
                  <Button
                    className="delete-path"
                    onClick={() => {
                      if (window.confirm(`Delete (${path.title})?`))
                        handleDelete(path._id);
                    }}>
                    Delete
                  </Button>
                  <Button className="edit-path" onClick={() => handleEdit(path._id)}>
                    Edit
                  </Button>
                  </div>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}
