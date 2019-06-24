import React, { Component } from "react";
// import "../styles/App.scss";
// import "../../components/styles/Form.scss";

const AccountDropdownComponent = ({ accounts, onAccountChange }) => (
  <div className="formBody" style={{ width: 200 }}>
    <select className="formElement" onChange={onAccountChange}>
      {accounts &&
        accounts.map(account => (
          <option key={account.id} value={account.id}>
            {account.name}
          </option>
        ))}
    </select>
  </div>
);

export default AccountDropdownComponent;
