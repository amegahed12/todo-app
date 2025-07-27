import React from "react";
import { Link } from "react-router";

export default function NotFoundPage() {
  return (
    <div>
      This Route is Not Found in Your Page
      <Link to={"/"}>Go Home </Link>
    </div>
  );
}
