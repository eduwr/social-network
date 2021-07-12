import React from "react";
import Identicon from "identicon.js";

export default function Post({ post, tipPost }) {
  return (
    <div className="card mb-4">
      <div className="card-header">
        <img
          alt="Identicon"
          className="mr-2"
          width="30"
          height="30"
          src={`data:image/png;base64,${new Identicon(
            post.author,
            30
          ).toString()}`}
        />
        <small className="text-muted">{post.author}</small>
      </div>
      <ul id="postList" className="list-group list-group-flush">
        <li className="list-group-item">
          <p>{post.content}</p>
        </li>
        <li className="list-group-item py-2">
          <small className="float-left mt-1 text-muted">
            TIPS:{" "}
            {window.web3.utils.fromWei(post.tipAmount.toString(), "Ether")} ETH
          </small>
          <button
            name={post.id}
            onClick={(e) => {
              // const id = e.target.name;
              const tipAmount = window.web3.utils.toWei("0.1", "Ether");

              tipPost(post.id, tipAmount);
            }}
            className="btn btn-link btn-sm float-right pt-0"
          >
            <span>TIP 0.1 ETH</span>
          </button>
        </li>
      </ul>
    </div>
  );
}
