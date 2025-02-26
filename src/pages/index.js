import { useRouter } from "next/router";
import React, { useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';


const Component = () => {
  const router = useRouter();
  useEffect(() => {
    router.push("/dashboard");
  });
  return <div></div>;
};

export default Component;
