import { GetServerSideProps, GetServerSidePropsContext } from "next";
import axios from "axios";

// This page has no UI. It's only used to redirect to the original URL.
const UrlRedirectPage = () => {
  return null;  
};

// Let the server handle getting the original URL before passing it to the client via props.
export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  const { params } = context;

  // Check if params exist, the 'code' parameter exists, and there is only one item in the 'code' array
  if (params && params.code && Array.isArray(params.code) && params.code.length === 1) {
    const code = params.code[0];

    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/getOriginalUrl?code=${code}`);

      return {
        redirect: {
          destination: res.data,
          permanent: false,
        },
      };
    } catch (error: any) {
      if (error.response && error.response.status === 404) {
        return {
          notFound: true,
        };
      } else {
        return {
          redirect: {
            destination: "/",
            permanent: false,
          },
        };
      }
    }
  }

  return {
    notFound: true,
  };
};

export default UrlRedirectPage;
