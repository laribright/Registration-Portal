import type { NextPage } from "next";
import Head from "next/head";
import { toast } from "react-toastify";
import { useState } from "react";

import RegistrationForm from "../components/RegistrationForm/RegistrationForm";
import { schoolModel } from "../models/schoolModel";
import { registerSchool } from "../services/school";

const Home: NextPage = () => {
  const [loading, setLoading] = useState(false);

  const handleFormSumit = async (data: schoolModel) => {
    setLoading(true);
    const { message } = await registerSchool(data);
    setLoading(false);
    toast.success(message);
  };

  return (
    <div>
      <Head>
        <title>Tech Interview</title>
        <meta name="description" content="Tech Interview, Alaribe Bright" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="w-full min-h-[90vh] grid place-content-center">
        <RegistrationForm loading={loading} handleFormSumit={handleFormSumit} />
      </div>
    </div>
  );
};

export default Home;
