import React, { Component } from "react";
import Post from "./Post";

export default class Main extends Component {
  render() {
    return (
      <div>
        <div className="container-fluid mt-5">
          <div className="row">
            <main
              role="main"
              className="col-lg-12 ml-auto mr-auto"
              style={{ maxWidth: "500px" }}
            >
              <div className="content mr-auto ml-auto">
                <p>&nbsp;</p>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const content = this.postContent.value;
                    this.props.createPost(content);
                  }}
                >
                  <div className="form-group mr-sm-2">
                    <input
                      id="postContent"
                      type="text"
                      ref={(input) => {
                        this.postContent = input;
                      }}
                      className="form-control"
                      placeholder="What's on your mind?"
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-primary btn-block">
                    Share
                  </button>
                </form>
                <p>&nbsp;</p>

                {this.props.posts.map((post, idx) => {
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
