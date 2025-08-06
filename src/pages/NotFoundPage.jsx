import React from "react";
import { Link } from "react-router";

export default function NotFoundPage() {
  return (
    <div>
      <h1>Error 404</h1>
      <p>This Route is Not Found in Your Page</p>
      <Link to={"/"}>Go Home </Link>
    </div>
  );
}
