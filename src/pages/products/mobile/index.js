import Head from "next/head";
import { useEffect , useContext } from "react";
import ProductsList from "../../../components/templates/ProductsList";
import ApiDataContext from "../../../context/ApiContext";

const Mobile = ({ data , filteredData }) => {

  const apiDataContext = useContext(ApiDataContext);
  const setApiData = apiDataContext[1];

  useEffect(() => setApiData(data),[data]);

  return (
    <>
      <Head>
        <title>&lrm;</title>
        <link rel="icon" href="/" />
      </Head>
      <div className="w-full h-screen flex flex-col justify-start items-center bg-[#242424] pt-32 px-5">
        <div className="w-full h-auto py-10">
          <ProductsList data={filteredData} />
        </div>
      </div>
    </>
  );
};

export default Mobile;

export const getStaticProps = async () => {
  const res = await fetch(`${process.env.BASE_URL}/products`);
  const data = await res.json();
  const filteredData = data.filter((item) => item.category === "mobile");

  return {
    props: {
      data,
      filteredData,
    },
  };
};
