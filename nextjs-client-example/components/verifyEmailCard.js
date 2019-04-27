import { Component } from "react";
import Router from "next/router";
import { removeCookie } from "./../utils/cookie";
import {
    Alert,
    Form,
    Button,
    FormGroup,
    Label,
    Input,
    Card,
    CardBody,
    Row
  } from "reactstrap";
  import {
    setSecurityQuestion,
    changePassword,
    getSecurityQuestions,
    userInfo,
    resendPIN,
    verifyPIN
  } from "../utils/api";

class VerifyEmailCard extends Component {
  state = {
    isOpen: false
  };

handleEmail = async e => {
    e.preventDefault();
    const result = await resendPIN();
    const resp = await result.json();
    this.setState({ verificationMessage: resp.message });
  };

  handlePin = async e => {
    e.preventDefault();
    if (this.state.pin.trim().length > 0) {
      const result = await verifyPIN(parseInt(this.state.pin));
      const resp = await result.json();
      this.setState({ verificationMessage: resp.message });
    }
  };


handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    return (
      <div>
        {this.props.info &&
            this.props.info.verification &&
              String(this.props.info.verification) == "true" ? null : (
              <Card
                className="interview-card"
                style={{ width: "400px", height: "60%" }}
              >
                <CardBody>
                  <Form>
                    <FormGroup>
                      <Label>Verification Pin</Label>
                      <Input
                        name="pin"
                        maxLength="128"
                        value={this.state.pin}
                        onChange={this.handleChange}
                        required
                      />
                    </FormGroup>
                    <Button
                      color="success"
                      size="lg"
                      onClick={this.handleEmail}
                      style={{ float: "left", width: "49%" }}
                    >
                      Resend Email
                    </Button>
                    <Button
                      color="success"
                      size="lg"
                      onClick={this.handlePin}
                      style={{ float: "right", width: "49%" }}
                    >
                      Submit Pin
                    </Button>
                  </Form>
                </CardBody>
              </Card>
            )}
      </div>
    );
  }
}

export default VerifyEmailCard;
