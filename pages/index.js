import Head from "next/head";
import Image from "next/image";
import Nav from "../components/Nav";
import PictureItem from "../components/PictureItem";

import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

/* https://www.youtube.com/watch?v=iW39Merz0zE */
const url =
  "https://raw.githubusercontent.com/bobziroll/scrimba-react-bootcamp-images/master/images.json";
export async function getServerSideProps() {
  const res = await fetch(url);
  const data = await res.json();
  return {
    props: {
      data,
    },
  };
}

export default function Home({ data }) {
  /* console.log("data", data); */

  /* const testData = [
    "https://photos.smugmug.com/photos/i-HGQDK9V/0/XL/i-HGQDK9V-XL.jpg",
    "https://photos.smugmug.com/photos/i-BS3QMBH/0/O/i-BS3QMBH-O.jpg",
    "https://photos.smugmug.com/photos/i-6G6sDvx/0/XL/i-6G6sDvx-XL.jpg",
    "https://photos.smugmug.com/photos/i-NHZJvc5/0/XL/i-NHZJvc5-XL.jpg",
    "https://photos.smugmug.com/photos/i-9smfnjZ/0/O/i-9smfnjZ.jpg",
    "https://photos.smugmug.com/photos/i-9bpz85C/0/XL/i-9bpz85C-XL.jpg",
    "https://photos.smugmug.com/photos/i-2nMTfbh/0/XL/i-2nMTfbh-XL.jpg",
    "https://photos.smugmug.com/photos/i-LJvCbhZ/0/XL/i-LJvCbhZ-XL.jpg",
    "https://photos.smugmug.com/photos/i-7hFSCzm/0/XL/i-7hFSCzm-XL.jpg",
  ]; */

  return (
    <div className="">
      <Head>
        <title>PicSome App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav />

      {/* BODY SECTION */}
      <div className="//p-8 flex justify-center items-center">
        <div className="w-11/12 max-w-6xl py-4">
          <ResponsiveMasonry
            columnsCountBreakPoints={{ 350: 1, 750: 2, 1000: 3, 1200: 4 }}
          >
            <Masonry gutter="12px">
              {data.map((item, i) => (
                <PictureItem key={i} item={item} />
              ))}
              {/* {testData.map((item, i) => (
              <div className="" key={i}>
                <img src={item} alt="" />
              </div>
            ))} */}
            </Masonry>
          </ResponsiveMasonry>
        </div>
      </div>
    </div>
  );
}
