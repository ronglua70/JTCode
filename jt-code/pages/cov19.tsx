import React, {useEffect, useState} from "react";

import Head from "next/head";
import Covid19 from "modules/Covid19";

const Cov19Page = () => {

  return (<div>
      <Head>
        <title>Cov19</title>
        <meta name="description" content="Be better" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Covid19/>
  </div>);
}

export default Cov19Page;