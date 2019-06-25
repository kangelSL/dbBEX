import React, { Component, useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { getAccounts } from "../../actions/index";
import { updateAccountId } from "../../actions/index";
import AccountDropdownComponent from "../../components/OrderForm/AccountDropdownComponent";
import store from "../../store/store";

// import openSocket from "socket.io-client";
// const socket = openSocket("localhost:4000");

// function AccountDropdown(props) {
//   const [currentAccountId, setAccountId] = useState(1);
//   const [accounts, setAccounts] = useState([]);

//   // useEffect(async () => {});

//   useEffect(() => {
//     socket.emit("getAccounts", {}, function(accountData) {
//       setAccounts(accountData);
//     });
//   }, []);

//   console.log("bananas", accounts);
//   return (
//     <div>
//       <select
//         onChange={e => {
//           setAccountId(e.target.value);
//         }}
//       >
//         {accounts &&
//           accounts.map(account => (
//             <option key={account.id} value={account.id}>
//               {account.name}
//             </option>
//           ))}
//       </select>
//     </div>
//   );
// }

// export default connect(store)(AccountDropdown);

class AccountDropdown extends Component {
  constructor(props) {
    super(props);
    this.onAccountChange = this.onAccountChange.bind(this);
  }

  onAccountChange(event) {
    this.props.updateAccountId(event.target.value);
  }

  componentDidMount() {
    // Call the API to get data
    this.props.getAccounts();
  }

  render() {
    return (
      <div>
        <AccountDropdownComponent
          accounts={this.props.accounts}
          onAccountChange={this.props.onAccountChange}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentAccountId: state.currentAccountId,
    accounts: state.accounts
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onAccountChange: account => {
      dispatch(updateAccountId(account.target.value));
    },
    getAccounts: account => dispatch(getAccounts(account))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountDropdown);
