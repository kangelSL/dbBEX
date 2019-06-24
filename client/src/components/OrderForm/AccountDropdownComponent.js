import React, { Component } from "react";
// import "../styles/App.scss";
import "../../styles/form.scss";

const AccountDropdownComponent = ({ accounts, onAccountChange }) => (
  <div className="accountDropdown">
    <select onChange={onAccountChange}>
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
