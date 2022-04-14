import dynamic from "next/dynamic";

const DynamicVideoList = dynamic(() => import("./VideoList"));
export default DynamicVideoList;
