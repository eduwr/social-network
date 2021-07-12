import React, { Component } from "react";
import Web3 from "web3";

import "./App.css";
import Navbar from "./Navbar";
import Post from "./Post";

import SocialNetwork from "../abis/SocialNetwork.json";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      account: "",
      socialNetwork: null,
      postCount: 0,
      posts: [],
    };
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying metamask"
      );
    }
  }

  async componentWillMount() {
    await this.loadWeb3();

    await this.loadBlockchainData();
  }

  async loadBlockchainData() {
    const web3 = window.web3;

    const [account] = await web3.eth.getAccounts();

    this.setState({ account });

    // Network ID
    const networkId = await web3.eth.net.getId();
    const networkData = SocialNetwork.networks[networkId];
    if (networkData) {
      const socialNetwork = web3.eth.Contract(
        SocialNetwork.abi,
        networkData.address
      );

      this.setState({ socialNetwork });

      const postCount = await socialNetwork.methods.postCount().call();
      this.setState({ postCount });

      for (let i = 1; i <= postCount; i++) {
        const post = await socialNetwork.methods.posts(i).call();
        this.setState({
          posts: [...this.state.posts, post],
        });
      }
    } else {
      window.alert("SocialNetwork contract not deployed to detected network.");
    }
    // Address
    // ABI
  }

  render() {
    return (
      <div>
        <Navbar account={this.state.account} />
        <div className="container-fluid mt-5">
          <div className="row">
            <main
              role="main"
              className="col-lg-12 ml-auto mr-auto"
              style={{ maxWidth: "500px" }}
            >
              <div className="content mr-auto ml-auto">
                {this.state.posts.map((post, idx) => {
                  return <Post post={post} key={idx} />;
                })}
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
