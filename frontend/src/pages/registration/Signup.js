import React, { useState } from "react";
import {
  Button,
  Input,
  Modal,
  Space,
} from "../../components/general";
import "./Registration.css";
import accountManager from "../../utils/AccountManager";

const Signup = () => {
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [cardNumber, setCardNumber] = useState("");

  const handleSignUp = () => {
    accountManager.addAccount(emailAddress, password, cardNumber);
  };

  return (
    <Modal borderRadius={10}>
      <div className="content">
        <h1>Create Your Account</h1>
        <p>
          Sign up today and start exploring our collection of books, resources,
          and more.
        </p>
        <Input
          type="email"
          placeholder="Email address"
          value={emailAddress}
          onChange={(value) => {
            setEmailAddress(value);
          }}
          fullWidth
        />
        <Space />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(value) => {
            setPassword(value);
          }}
          fullWidth
        />
        <Space />
        <Input
          type="number"
          placeholder="Library Card Number"
          value={cardNumber}
          onChange={(value) => {
            setCardNumber(value);
          }}
          fullWidth
        />
        <Space />
        <Button
          size="l"
          borderRadius={4}
          onClick={() => handleSignUp()}
          fullWidth
        >
          Sign Up
        </Button>
        <Space />
        <p>
          Already have an account? <a href="/login">Log In</a>
        </p>
      </div>
    </Modal>
  );
};

export default Signup;
