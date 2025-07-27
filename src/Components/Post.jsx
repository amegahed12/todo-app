import React from "react";

export default function Post({ body, title }) {
  return (
    <div className="p-2 border border-yellow-500 my-2">
      <h3 className="font-bold text-xl">{title}</h3>
      <p>{body}</p>
    </div>
  );
}
