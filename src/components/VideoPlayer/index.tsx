import dynamic from "next/dynamic";

const DynamicVideoPlayer = dynamic(() => import("./VideoPlayer"));
export default DynamicVideoPlayer;
