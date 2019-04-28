import { Component } from "react";
import withAuth from "../components/withAuth";
import NavBar from "../components/navbar";
import VerifyEmailCard from "../components/verifyEmailCard";
import {
  Dropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu
} from "reactstrap";
import {
  setSecurityQuestion,
  changePassword,
  getSecurityQuestions,
  userInfo,
  resendPIN,
  verifyPIN
} from "../utils/api";
import {
  Alert,
  Form,
  Button,
  FormGroup,
  Label,
  Input,
  Card,
  CardBody,
  Row,
  CardTitle
} from "reactstrap";
import { setCookie, getCookie } from "./../utils/cookie";

class ProfilePage extends Component {
  state = {
    dropdownOpen: false,
    questionIdx: -1,
    answer: "",
    questions: [],
    oldPassword: "",
    newPassword1: "",
    newPassword2: "",
    passwordChangeMessage: "",
    securityPassword: "",
    submittedSecurity: false,
    successSubmitSecurity: false
  };

  async componentWillMount() {
    await this.getInfo();
    const resp = await (await getSecurityQuestions()).json();
    if (resp.questions) {
      this.setState({ questions: resp.questions });
    }
  }

  getInfo = async () => {
    const result = await userInfo();
    const response = await result.json();
    this.setState({
      info: {
        email: response.user_email,
        role: response.user_role,
        verification: response.user_verified
      }
    });
    const resp = await (await getSecurityQuestions()).json();
    if (resp.questions) {
      this.setState({ questions: resp.questions });
    }
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  toggle = () => {
    this.setState({ dropdownOpen: !this.state.dropdownOpen });
  };
  pickDropDown = (idx, e) => {
    this.setState({ questionIdx: idx });
  };
  handleSubmit = async e => {
    e.preventDefault();
    if (this.state.questionIdx !== -1 && this.state.answer.trim().length > 0) {
      const result = await setSecurityQuestion(
        this.state.questionIdx,
        this.state.answer,
        this.state.securityPassword
      );
      const resp = await result.json();
      this.setState({ submittedSecurity: true });
      if (resp.status === 200) {
        this.setState({ successSubmitSecurity: true });
      } else {
        this.setState({ successSubmitSecurity: false });
      }
      setTimeout(() => {
        this.setState({
          successSubmitSecurity: false,
          submittedSecurity: false
        });
      }, 1500);
    }
  };

  handlePassChange = async e => {
    e.preventDefault();
    if (this.state.newPassword1 === this.state.newPassword2) {
      const result = await changePassword(
        this.state.oldPassword,
        this.state.newPassword1
      );
      const response = await result.json();
      if (!response.token) {
        this.setState({ responseMessage: response.message });
      } else {
        this.setState({ responseMessage: response.message });
        setCookie("token", response.token);
      }
    } else {
      this.setState({ responseMessage: "Passwords do not match" });
    }
  };

  render() {
    const { submittedSecurity, successSubmitSecurity } = this.state;
    return (
      <div>
        <NavBar />
        {submittedSecurity && successSubmitSecurity && (
          <Alert color="primary">
            Successfully Submitted Security Question
          </Alert>
        )}
        {submittedSecurity && !successSubmitSecurity && (
          <Alert color="primary">Unable to Submit Security Question</Alert>
        )}

        {this.state.responseMessage && (
          <Alert color="primary">{this.state.responseMessage}</Alert>
        )}
        {this.state.verificationMessage && (
          <Alert color="primary">{this.state.verificationMessage}</Alert>
        )}

        <Card
          className="interview-card"
          style={{ width: "25%", padding: "2%" }}
        >
          <CardTitle>
            <h2 style={{ textAlign: "center", paddingTop: "10px" }}>
              Profile{" "}
            </h2>

            <div
              className="interview-card"
              style={{
                width: "400px",
                height: "60%",
                marginLeft: "10%",
                marginRighht: "10%"
              }}
            >

              <CardBody>
                <Form>
                  <FormGroup>
                    <Label>Old Password</Label>
                    <Input
                      name="oldPassword"
                      type="password"
                      maxLength="128"
                      value={this.state.oldPassword}
                      onChange={this.handleChange}
                      required
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>New Password</Label>
                    <Input
                      name="newPassword1"
                      type="password"
                      maxLength="128"
                      value={this.state.newPassword1}
                      onChange={this.handleChange}
                      required
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>Confirm Password</Label>
                    <Input
                      name="newPassword2"
                      type="password"
                      maxLength="128"
                      value={this.state.newPassword2}
                      onChange={this.handleChange}
                      required
                    />
                  </FormGroup>
                  <Button
                    color="success"
                    size="lg"
                    onClick={this.handlePassChange}
                    style={{ float: "left", width: "100%" }}
                  >
                    Change Password
                  </Button>
                </Form>
              </CardBody>
            </Card>
            <VerifyEmailCard info={this.state.info}/> 
          </Row>
        )}
      </div>
    );
  }
}

export default withAuth(ProfilePage);
