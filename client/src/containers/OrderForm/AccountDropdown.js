import React, { Component } from "react";
import { connect } from "react-redux";
import { getAccounts } from "../../actions/index";
import { updateAccountId } from "../../actions/index";
import AccountDropdownComponent from "../../components/OrderForm/AccountDropdownComponent";

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
