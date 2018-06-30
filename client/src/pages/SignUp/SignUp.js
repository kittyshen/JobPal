import React, { Component } from "react";
import DeleteBtn from "../../components/DeleteBtn";
import Jumbotron from "../../components/Jumbotron";
import ModalContainer from "../../components/ModalContainer";
import API from "../../utils/API";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import "./SignUp.css"


class SignUp extends Component {
  state = {
    articles: [],
  };

  componentDidMount() {
    this.loadArticles();
  }

  loadArticles = () => {
    API.getArticlesSaved()
      .then(res =>
        this.setState({ articles: res.data})
      )
      .catch(err => console.log(err));
  };


  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-12">
            <Jumbotron id="signupJumbotron">
              <h3 style={{color:"grey",margin:"-1.5em"}}>Sign Up</h3>

              <form id="signupForm">
                <div className="form-group">
                    <div className="form-group">
                      <label className ="label-control" for="cohort">Select a Cohort if you belong to any or leave it as general</label>
                      <select className="custom-select" id="cohort_name" >
                        <option>general</option>
                        <option>TellmeTellme</option>
                        <option>Farley's gang</option>

                      </select>
                    </div>
                  <label className ="label-control">User Name (unique id you use to log into our website)</label>
                  <input placeholder="User Name" type="text" className="form-control" id="user_name"/>
                  <br/>
                  <label className ="label-control">Your Email</label>
                  <input placeholder="email" type="text" className="form-control" id="email"/>
                  <br/>
                  <label className ="label-control">Password (6-12 number or characters)</label>
                  <input placeholder="Password" type="text" className="form-control" id="password"/>
                  <button type="submit" id="signup_btn" class="btn btn-success btn-info submit">Submit</button>

                </div>
						  </form>
            </Jumbotron>
          </Col>
          {/* <Col size="sm-12">

            {this.state.articles.length ? (
              <List>
                {this.state.articles.map(article => (
                  <ListItem key={article._id}>
                    <h4>
                      {article.title}  
                      <DeleteBtn onClick={() => this.deleteArticle(article._id)} />
                    </h4>
                    <span>{article.summary}</span>
                    <a href= {article.link}>  {article.link} </a>
                    <br/>
                    <ModalContainer id={article._id} />
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>Meow Meow, nothing saved</h3>
            )}
          </Col> */}
        </Row>
        
      </Container>
    );
  }
}

export default SignUp;
