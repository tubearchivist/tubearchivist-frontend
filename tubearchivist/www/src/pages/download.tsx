import type { GetServerSideProps, NextPage } from "next";
import { getSession, useSession } from "next-auth/react";
import { useState } from "react";
import { dehydrate, QueryClient, useQuery } from "react-query";
import { CustomHead } from "../components/CustomHead";
import { Layout } from "../components/Layout";
import NextImage from "next/image";
import { TA_BASE_URL } from "../lib/constants";
import { getDownloads } from "../lib/getDownloads";
import RescanIcon from "../images/icon-rescan.svg";
import DownloadIcon from "../images/icon-download.svg";
import AddIcon from "../images/icon-add.svg";
import GridViewIcon from "../images/icon-gridview.svg";
import ListViewIcon from "../images/icon-listview.svg";


type ViewStyle = "grid" | "list";
type IgnoredStatus = boolean;

export const getServerSideProps: GetServerSideProps = async (context) => {
    const queryClient = new QueryClient();
    const session = await getSession(context);

    if (!session) {
        return {
            redirect: {
                destination: "/auth/login",
                permanent: false,
            },
        };
    }

    await queryClient.prefetchQuery(["downloads", session.ta_token.token], () =>
        getDownloads(session.ta_token.token)
    );

    return {
        props: {
            dehydratedState: dehydrate(queryClient),
            session,
        },
    };
};

const Download: NextPage = () => {
    const { data: session } = useSession();
    const {
        data: downloads,
        error,
        isLoading,
    } = useQuery(
        ["downloads", session.ta_token.token],
        () => getDownloads(session.ta_token.token),
        {
            enabled: !!session?.ta_token?.token,
        }
    );

    const [viewStyle, setViewStyle] = useState<ViewStyle>("grid");
    const [ignoredStatus, setIgnoredStatus] = useState<IgnoredStatus>(false);

    const handleSetViewstyle = (selectedViewStyle: ViewStyle) => {
        setViewStyle(selectedViewStyle);
    };

    const handleSetIgnoredStatus = (selectedIgnoredStatus: IgnoredStatus) => {
        setIgnoredStatus(selectedIgnoredStatus);
    };

    return (
        <>
            <CustomHead title="Downloads" />
            
            <Layout>
                <div className="boxed-content">
                    <div className="title-bar">
                        <h1>Downloads</h1>
                    </div>
                    <div id="notifications"></div>
                    <div id="downloadControl"></div>
                    <div className="info-box info-box-3">
                        <div className="icon-text">
                            <NextImage
                                width={80}
                                height={80}
                                src={RescanIcon}
                                alt="rescan-icon"
                                title="Rescan subscriptions"
                                onClick={() => console.log("rescanPending()")}
                            />
                            {/* <img id="rescan-icon" onclick="rescanPending()" src="{% static 'img/icon-rescan.svg' %}" alt="rescan-icon"></img> */}
                            <p>Rescan subscriptions</p>
                        </div>
                        <div className="icon-text">
                            <NextImage
                                width={80}
                                height={80}
                                src={DownloadIcon}
                                alt="download-icon"
                                title="Start download"
                                onClick={() => console.log("dlPending()")}
                            />
                            {/* <img id="download-icon" onclick="dlPending()" src="{% static 'img/icon-download.svg' %}" alt="download-icon"></img> */}
                            <p>Start download</p>
                        </div>
                        <div className="icon-text">
                            <NextImage
                                width={80}
                                height={80}
                                src={AddIcon}
                                alt="add-icon"
                                title="Add to download queue"
                                onClick={() => console.log("showForm()")}
                            />
                            <p>Add to download queue</p>
                            <div className="show-form">
                                <form id="hidden-form" action="/downloads/" method="post">
                                {/* {% csrf_token %}
                                    {{ subscribe_form }} */}
                                <button type="submit">Add to download queue</button>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="view-controls">
                        <div className="toggle">
                            <span>Show only ignored videos:</span>
                            {ignoredStatus &&
                                <div className="toggleBox">
                                    <input
                                        id="show_ignored_only"
                                        onChange={() => handleSetIgnoredStatus(false)}
                                        type="checkbox"
                                        checked
                                    />
                                    <label htmlFor="" className="onbtn">
                                        On
                                    </label>
                                </div>
                            }
                            {!ignoredStatus &&
                                <div className="toggleBox">
                                    <input
                                        id="show_ignored_only"
                                        onChange={() => handleSetIgnoredStatus(true)}
                                        type="checkbox"
                                    />
                                    <label htmlFor="" className="ofbtn">
                                        Off
                                    </label>
                                </div>
                            }
                        </div>
                        <div className="view-icons">
                            <NextImage
                                width={30}
                                height={34}
                                src={GridViewIcon}
                                alt="grid view"
                                title="Switch to grid view"
                                onClick={() => handleSetViewstyle("grid")}
                            />
                            {/* <img src="{% static 'img/icon-gridview.svg' %}" onclick="changeView(this)" data-origin="downloads" data-value="grid" alt="grid view"> */}
                            <NextImage
                                width={30}
                                height={34}
                                src={ListViewIcon}
                                alt="list view"
                                title="Switch to list view"
                                onClick={() => handleSetViewstyle("list")}
                            />
                            {/* <img src="{% static 'img/icon-listview.svg' %}" onclick="changeView(this)" data-origin="downloads" data-value="list" alt="list view"> */}
                        </div>
                    </div>
                        {ignoredStatus && 
                            <div className="title-split">
                                <h2>Ignored from download</h2>
                                <button onClick={() => console.log("deleteQueue(this)")} data-id="ignore" title="Delete all previously ignored videos from the queue">Delete all ignored</button>
                            </div>
                        }
                        {!ignoredStatus && 
                            <div className="title-split">
                                <h2>Download queue</h2>
                                <button onClick={() => console.log("deleteQueue(this)")} data-id="pending" title="Delete all pending videos from the queue">Delete all queued</button>
                            </div>
                        }
                    <h3>Total videos: {downloads?.data?.length} {!downloads?.data?.length && <p>No videos queued for download. Press rescan subscriptions to check if there are any new videos.</p>}</h3>
                    <div className={`dl-list  ${viewStyle}`}>
                        {downloads.data &&
                            downloads?.data?.map((video) => {
                                return (
                                    <div key={video?.youtube_id} className={`dl-item ${viewStyle}`} >
                                        <div className={`dl-thumb ${viewStyle}`}>
                                            <img src={`${TA_BASE_URL}${video?.vid_thumb_url}`} alt="video_thumb"></img>
                                            {ignoredStatus && <span>ignored</span>}
                                            {/* {% if show_ignored_only %} */}
                                                {/* <span>ignored</span> */}
                                            {!ignoredStatus && <span>queued</span>}
                                            {/* {% else %} */}
                                                {/* <span>queued</span> */}
                                            {/* {% endif %} */}
                                        </div>
                                        <div className={`dl-desc ${viewStyle}`}>
                                            <h3>{video?.title}Video Title</h3>
                                            {video?.channel?.channel_indexed && <a href={`/channel/${video?.channel?.channel_id}`}>{video?.channel?.channel_name} Channel Name Link</a>}
                                            {/* {% if video.source.channel_indexed %} */}
                                                {/* <a href="{% url 'channel_id' video.source.channel_id %}">{{ video.source.channel_name }}</a> */}
                                            {!video?.channel?.channel_indexed && <span>{video?.channel?.channel_name} Channel Name No Link</span>}
                                            {/* {% else %} */}
                                                {/* <span>{{ video.source.channel_name }}</span> */}
                                            {/* {% endif %} */}
                                            <p>Published: {video?.published} | Duration: {video?.player?.duration_str} | {video?.youtube_id}</p>
                                            {/* <p>Published: {{ video.source.published }} | Duration: {{ video.source.duration }} | {{ video.source.youtube_id }}</p> */}
                                            {ignoredStatus &&
                                                <div>
                                                    <button data-id={`${video?.youtube_id}`} onClick={() => console.log("forgetIgnore(this)")}>Forget</button>
                                                    <button data-id={`${video?.youtube_id}`} onClick={() => console.log("addSingle(this)")}>Add to queue</button>
                                                </div>
                                            }        
                                            {/* {% if show_ignored_only %} */}
                                                {/* <button data-id="{{ video.source.youtube_id }}" onclick="forgetIgnore(this)">Forget</button> */}
                                                {/* <button data-id="{{ video.source.youtube_id }}" onclick="addSingle(this)">Add to queue</button> */}
                                            {!ignoredStatus &&
                                                <div>
                                                    <button data-id={`${video?.youtube_id}`} onClick={() => console.log("toIgnore(this)")}>Ignore</button>
                                                    <button id={`${video?.youtube_id}`} data-id={`${video?.youtube_id}`} onClick={() => console.log("downloadNow(this)")}>Download now</button>
                                                </div>
                                            }
                                            {/* {% else %} */}
                                                {/* <button data-id="{{ video.source.youtube_id }}" onclick="toIgnore(this)">Ignore</button> */}
                                                {/* <button id="{{ video.source.youtube_id }}" data-id="{{ video.source.youtube_id }}" onclick="downloadNow(this)">Download now</button> */}
                                            {/* {% endif %} */}
                                        </div>
                                    </div>
                                );
                            })
                        }
                        {/* {% if results %} */}
                            {/* {% for video in results %} */}
                                {/* <div className="dl-item {{ view_style }}" id="dl-{{ video.source.youtube_id }}"> */}
                                    {/* <div className="dl-thumb {{ view_style }}"> */}
                                        {/* <img src="/cache/{{ video.source.vid_thumb_url }}" alt="video_thumb"> */}
                                        {/* {% if show_ignored_only %} */}
                                            {/* <span>ignored</span> */}
                                        {/* {% else %} */}
                                            {/* <span>queued</span> */}
                                        {/* {% endif %} */}
                                    {/* </div> */}
                                    {/* <div className="dl-desc {{ view_style }}"> */}
                                        {/* <h3>{{ video.source.title }}</h3> */}
                                        {/* {% if video.source.channel_indexed %} */}
                                            {/* <a href="{% url 'channel_id' video.source.channel_id %}">{{ video.source.channel_name }}</a> */}
                                        {/* {% else %} */}
                                            {/* <span>{{ video.source.channel_name }}</span> */}
                                        {/* {% endif %} */}
                                        {/* <p>Published: {{ video.source.published }} | Duration: {{ video.source.duration }} | {{ video.source.youtube_id }}</p> */}
                                        {/* {% if show_ignored_only %} */}
                                            {/* <button data-id="{{ video.source.youtube_id }}" onclick="forgetIgnore(this)">Forget</button> */}
                                            {/* <button data-id="{{ video.source.youtube_id }}" onclick="addSingle(this)">Add to queue</button> */}
                                        {/* {% else %} */}
                                            {/* <button data-id="{{ video.source.youtube_id }}" onclick="toIgnore(this)">Ignore</button> */}
                                            {/* <button id="{{ video.source.youtube_id }}" data-id="{{ video.source.youtube_id }}" onclick="downloadNow(this)">Download now</button> */}
                                        {/* {% endif %} */}
                                    {/* </div> */}
                                {/* </div> */}
                            {/* {% endfor %} */}
                        {/* {% endif %} */}
                        
                    </div>
                </div>
                {/* <script type="text/javascript" src="{% static 'progress.js' %}"></script> */}
            </Layout>
        </>
    );
};

export default Download;