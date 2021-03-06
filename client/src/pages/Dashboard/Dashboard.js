import React ,{ Component } from "react";
import { Col, Row, Container } from "../../components/Grid";
import BackBtn from "../../components/BackBtn";
import NextBtn from "../../components/NextBtn";
import Jumbotron from "../../components/Jumbotron";
import {ModalTrashCan, ModalAddJob, ModalContainer} from "../../components/ModalContainer";
import API from "../../utils/API";
// import { Link } from "react-router-dom";
import "./Dashboard.css"

class  Dashboard extends Component {
  constructor(props) {
    super(props);
    // create a ref to store the  DOM element
    this.state = {
      jobs: [],
    };  
  }

  componentDidMount() {
    this.loadUser();
    this.loadJobs();
  }

  //need to load a user to save the user's infomation into session storage other wise if user is newly registered, they won't have any job data so there won't be userID and cohortID can be extracted
  loadUser(){
    API.findAUser()
    .then(res=>{
      console.log(res.data);
      //store user info to the session storage for later use for the chart
      sessionStorage.setItem("userID",res.data.id)
      sessionStorage.setItem("cohortID",res.data.CohortId);
      sessionStorage.setItem("username",res.data.user_name);
    })
  }

  loadJobs = () => {
    API.getUserJobs()
      .then(res =>{
        console.log(res.data);
 
        if(res.data)
          this.setState({ jobs: res.data})
      })
      .catch(err => console.log(err));
  };

  deleteJob = (id) =>{
    API.delUserJob(id)
    .then(res=>{
      console.log(res.data);
      this.loadJobs();
    })
    .catch(err =>console.log(err))
  }

  //define a moveJob function take child element callback function as argument
  movejob = (id,loc,callback) => {
    callback(id,loc);
    clearTimeout(p);
    const p = setTimeout(this.loadJobs,250); //due to asychonize of above callback function, need to use setTimeout to wait till database update finish before reload the page
  }

  
  render() {

      return (
        <Container fluid>
          <Row>
          <Col size="md-12">
            <Jumbotron id="dashJumbo">
              <h3>User Dashboard </h3>
                
                  <div className="card-deck ">
                    <div className="card">
                      <img className="card-img-top" src="assets/images/applied-icon.png" alt="Card cap" />
                      {/* <span className="btn" id="newJob">
                        <img className="card-img-overlay" height="80px" src="assets/images/add-icon.png" alt="Add new job" />
                      </span> */}
                      <ModalAddJob/>
                      <div className="card-body">
                        <h4 className="card-title text-center">Applied Jobs</h4>
                        <ul>
                          {this.state.jobs.filter(i => i.loc1 ===true&&i.hide === false).map(job => (
                            <div className="alert alert-info" key={job.id}>
                              <li>
                                <ModalContainer id={job.id}/>

                                <button className="btn card-del delete-btn" onClick={()=>this.deleteJob(job.id)} data-id={job.id} id={`delete${job.id}`}>x</button>
                                <p> {job.job_title}</p>
                                <p> Company: {job.company_name}</p>
                                <p> Link:
                                  <a href={job.job_link}>Click here</a>
                                </p>
                                {/* <form id="control" > */}
                                  <NextBtn  movejob={this.movejob} id={`next${job.id}`} data_loc="1" data_id={job.id}>next</NextBtn>
                                {/* </form> */}
                              </li>
                            </div>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <div className="card">
                      <img className="card-img-top" src="assets/images/phone-icon.png" alt="Card cap" />
                      <div className="card-body">
                        <h4 className="card-title text-center">Phone Interview</h4>
                        <ul>
                          {this.state.jobs.filter(i => i.loc2 ===true&&i.hide === false).map(job => (
                            <div className="alert alert-info " key={job.id}>
                              <li>
                                <ModalContainer id={job.id}/>
                                <button className="btn card-del delete-btn" onClick={()=>this.deleteJob(job.id)} data-id={job.id} id={`delete${job.id}`}>x</button>
                                <p> {job.job_title}</p>
                                <p> Company: {job.company_name}</p>
                                <p> Link:
                                  <a href={job.job_link}>Click here</a>
                                </p>
                                {/* <form id="control" > */}
                                  {/* <button type="submit" className="btn btn-primary backbtn" id={`back${job.id}`} data-loc="2" data-id={job.id}>back</button> */}
                                  <BackBtn  movejob={this.movejob} id={`back${job.id}`} data_loc="2" data_id={job.id}>back</BackBtn>
                                  <NextBtn  movejob={this.movejob} id={`next${job.id}`} data_loc="2" data_id={job.id}>next</NextBtn>
                                {/* </form> */}
                              </li>
                            </div>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <div className="card">
                      <img className="card-img-top" src="assets/images/on-site-icon.png" alt="Card cap" />
                      <div className="card-body">
                        <h4 className="card-title text-center">Site Interview</h4>
                        <ul>
                          {this.state.jobs.filter(i => i.loc3 ===true&&i.hide === false).map(job => (
                            <div className="alert alert-info " key={job.id}>
                              <li>
                                <ModalContainer id={job.id}/>

                                <button className="btn card-del delete-btn" onClick={()=>this.deleteJob(job.id)} data-id={job.id} id={`delete${job.id}`}>x</button>

                                <p> {job.job_title}</p>
                                <p> Company: {job.company_name}</p>
                                <p> Link:
                                  <a href={job.job_link}>Click here</a>
                                </p>
                                {/* <form id="control" > */}
                                  <BackBtn movejob={this.movejob} id={`back${job.id}`} data_loc="3" data_id={job.id}>back</BackBtn>
                                  <NextBtn  movejob={this.movejob} id={`next${job.id}`} data_loc="3" data_id={job.id}>next</NextBtn>
                                {/* </form> */}
                              </li>
                            </div>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <div className="card">
                      <img className="card-img-top" src="assets/images/outcome-icon.png" alt="Card cap" />
                      <ModalTrashCan/>
                      <div className="card-body">
                        <h4 className="card-title text-center">Offer</h4>
                        <ul>
                          {this.state.jobs.filter(i => i.loc4 ===true&&i.hide === false).map(job => (
                            <div className="alert alert-info " key={job.id}>
                              <li>
                                <ModalContainer id={job.id}/>
                                <button className="btn card-del delete-btn" onClick={()=>this.deleteJob(job.id)} data-id={job.id} id={`delete${job.id}`}>x</button>
                                <p> {job.job_title}</p>
                                <p> Company: {job.company_name}</p>
                                <p> Link:
                                  <a href={job.job_link}>Click here</a>
                                </p>
                                {/* <form id="control" > */}
                                  <BackBtn movejob={this.movejob} id={`back${job.id}`} data_loc="4" data_id={job.id}>back</BackBtn>
                                  {/* <button type="submit" className="btn btn-primary nextbtn" id={`next${jsob.id}`} data-loc="4" data-id={job.id}>next</button> */}
                                {/* </form> */}
                              </li>
                            </div>
                          )
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>
                  {this.state.jobs.length ? (
                    <p id="filler2"> &nbsp; </p>
                  )
                  : (
                    <p id="filler"> &nbsp; </p>
                  )}
              </Jumbotron>
            </Col>
          </Row>
          
        </Container>
      )
  }
}

export default Dashboard;
