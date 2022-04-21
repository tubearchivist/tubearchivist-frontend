import type { GetServerSideProps, NextPage } from "next";
import { getSession, useSession } from "next-auth/react";
import { useState } from "react";
import { dehydrate, QueryClient, useQuery } from "react-query";
import { CustomHead } from "../components/CustomHead";
import { Layout } from "../components/Layout";
import NextImage from "next/image";
import { getDownloads, sendDeleteAllQueuedIgnored, sendDeleteVideoQueuedIgnored, sendMoveVideoQueuedIgnored } from "../lib/getDownloads";
import { sendDownloads } from "../lib/getDownloads";
import RescanIcon from "../images/icon-rescan.svg";
import DownloadIcon from "../images/icon-download.svg";
import AddIcon from "../images/icon-add.svg";
import GridViewIcon from "../images/icon-gridview.svg";
import ListViewIcon from "../images/icon-listview.svg";
import StopIcon from "../images/icon-stop.svg";
import CloseIcon from "../images/icon-close.svg";
import { getTAUrl } from "../lib/constants";

const TA_BASE_URL = getTAUrl();

type ViewStyle = "grid" | "list";
type IgnoredStatus = boolean;
type FormHidden = boolean;
type ErrorMessage = string;
type PageNumber = number;

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

    await queryClient.prefetchQuery(["downloads", session.ta_token.token, false, 1], () =>
        getDownloads(session.ta_token.token, false, 1)
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

    const [ignoredStatus, setIgnoredStatus] = useState<IgnoredStatus>(false);
    const [pageNumber, setPageNumber] = useState<PageNumber>(1);

    const {
        data: downloads,
        error,
        isLoading,
        refetch,
    } = useQuery(
        ["downloads", session.ta_token.token, ignoredStatus, pageNumber],
        () => getDownloads(session.ta_token.token, ignoredStatus, pageNumber),
        {
            enabled: !!session?.ta_token?.token,
            refetchInterval: 1500,
            refetchIntervalInBackground: false,
        }
    );

    const [formHidden, setFormHidden] = useState<FormHidden>(true);
    const [viewStyle, setViewStyle] = useState<ViewStyle>(downloads?.config?.default_view?.downloads);
    const [errorMessage, setErrorMessage] = useState<ErrorMessage>(null);

    const handleSetViewstyle = (selectedViewStyle: ViewStyle) => {
        setViewStyle(selectedViewStyle);
    };
    
    const handleSetIgnoredStatus = (selectedIgnoredStatus: IgnoredStatus) => {
        setIgnoredStatus(selectedIgnoredStatus);
        refetch();
    };

    const handleSetFormHidden = (selectedFormHidden: FormHidden) => {
        setFormHidden(selectedFormHidden);
    };

    const handleSetErrorMessage = (selectedErrorMessage: ErrorMessage) => {
        setErrorMessage(selectedErrorMessage);
    };

    const handleSetPageNumber = (selectedPageNumber: PageNumber) => {
        setPageNumber(selectedPageNumber);
    };

    const addToDownloadQueue = event => {
        event.preventDefault();
        sendDownloads(session.ta_token.token, event.target.vid_url.value).then(() => {
            handleSetErrorMessage(null);
            handleSetFormHidden(true);
        })
        .catch(error => handleSetErrorMessage(error.message));
    }
    const handleMoveVideoQueuedIgnored = (session: string, youtube_id: string, status: string) => {
        sendMoveVideoQueuedIgnored(session, youtube_id, status).then(() => {
            handleSetErrorMessage(null);
        })
        .catch(error => handleSetErrorMessage(error.message));
    }
    const handleDeleteVideoQueuedIgnored = (session: string, youtube_id: string) => {
        sendDeleteVideoQueuedIgnored(session, youtube_id).then(() => {
            handleSetErrorMessage(null);
        })
        .catch(error => handleSetErrorMessage(error.message));
    }

    const handleDeleteAllQueuedIgnored = (session: string, filter: string) => {
        sendDeleteAllQueuedIgnored(session, filter).then(() => {
            handleSetErrorMessage(null);
        })
        .catch(error => handleSetErrorMessage(error.message));
    }

    return (
        <>
            <CustomHead title="Downloads" />
            
            <Layout>
                <div className="boxed-content">
                    <div className="title-bar">
                        <h1>Downloads</h1>
                    </div>
                    <div id="notifications">
                        {(error || !downloads?.data) && !isLoading &&
                            <div className="error notification">
                                <h3>API Connection Error</h3>
                                <p></p>
                            </div>
                        }
                        {errorMessage &&
                            <div className="error notification">
                                <h3>Failed to add downloads to the queue.</h3>
                                <p>{errorMessage}</p>
                            </div>
                        }
                        {
                            // <div className="info notification">
                            //     <h3>Adding new videos to download queue.</h3>
                            //     <p>Extracting lists</p>
                            //     <p>Progress: 0/0</p>
                            // </div>
                        }
                        {
                            // <div className="info notification">
                            //     <h3>Rescanning channels and playlists.</h3>
                            //     <p>Looking for new videos.</p>
                            // </div>
                        }
                        {
                            // <div className="info notification">
                            //     <h3>Downloading: `VIDEO_TITLE`</h3>
                            //     <p>processing</p>
                            //     <p>`DOWNLOADED_PERCENTAGE`% of `VIDEO_SIVE``VIDEO_SIZE_UNIT` at `DOWNLOAD_SPEED``DOWNLOAD_SPEED_UNIT` - time left: `DOWNLOAD_TIME_LEFT`</p>
                            //     <p>processing</p>
                            //     <p>Moving</p>
                            //     <p>Completed</p>
                            // </div>
                        }
                    </div>
                    <div id="downloadControl">
                        {/* Appears when video is downloading */}
                        {/* <div className="dl-control-icons"> 
                            <NextImage
                                width={30}
                                height={30}
                                src={StopIcon}
                                alt="stop icon"
                                title="Stop Download Queue"
                                id="stop-icon"
                                onClick={() => console.log("stopQueue()")}
                            />
                            <NextImage
                                width={30}
                                height={30}
                                src={CloseIcon}
                                alt="kill icon"
                                title="Kill Download Queue"
                                id="kill-icon"
                                onClick={() => console.log("killQueue()")}
                            />
                        </div> */}
                    </div>
                    <div className="info-box info-box-3">
                        <div className="icon-text">
                            <NextImage
                                width={80}
                                height={80}
                                src={RescanIcon}
                                alt="rescan-icon"
                                title="Rescan subscriptions"
                                // className="rotate-img" // Set when rescanning
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
                                // className="bounce-img" // Set when video is downloading
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
                                onClick={() => formHidden ? handleSetFormHidden(false) : handleSetFormHidden(true)}
                            />
                            <p>Add to download queue</p>
                            {!formHidden &&
                                <div className="show-form">
                                    <form id="hidden-form" onSubmit={addToDownloadQueue}>
                                        <textarea name="vid_url" cols={40} rows={4} placeholder="Enter Video Urls or IDs here..." required id="id_vid_url" spellCheck="false" />
                                        <button type="submit">Add to download queue</button>
                                    </form>
                                </div>
                            }
                        </div>
                    </div>
                    <div className="view-controls">
                        <div className="toggle">
                            <span>Show only ignored videos:</span>
                            <div className="toggleBox">
                                <input
                                    id="show_ignored_only"
                                    onChange={() => handleSetIgnoredStatus(!ignoredStatus)}
                                    type="checkbox"
                                    checked={ignoredStatus}
                                />
                                <label htmlFor="" className={ignoredStatus ? "onbtn" : "ofbtn"}>
                                    {ignoredStatus ? "On" : "Off"}
                                </label>
                            </div>
                        </div>
                        <div className="view-icons">
                            <div className="view-icons-margin">
                                <NextImage
                                    width={30}
                                    height={34}
                                    src={GridViewIcon}
                                    alt="grid view"
                                    title="Switch to grid view"
                                    onClick={() => handleSetViewstyle("grid")}
                                />
                            </div>
                            {/* <img src="{% static 'img/icon-gridview.svg' %}" onclick="changeView(this)" data-origin="downloads" data-value="grid" alt="grid view"> */}
                            <div className="view-icons-margin">
                                <NextImage
                                    width={30}
                                    height={34}
                                    src={ListViewIcon}
                                    alt="list view"
                                    title="Switch to list view"
                                    onClick={() => handleSetViewstyle("list")}
                                />
                            </div>
                            {/* <img src="{% static 'img/icon-listview.svg' %}" onclick="changeView(this)" data-origin="downloads" data-value="list" alt="list view"> */}
                        </div>
                    </div>
                    {ignoredStatus && 
                        <div className="title-split">
                            <h2>Ignored from download</h2>
                            <button onClick={() => handleDeleteAllQueuedIgnored(session.ta_token.token, "ignore")} title="Remove all ignored videos.">Remove all ignored</button>
                        </div>
                    }
                    {!ignoredStatus && 
                        <div className="title-split">
                            <h2>Download queue</h2>
                            <button onClick={() => handleDeleteAllQueuedIgnored(session.ta_token.token, "pending")} title="Remove all videos from the queue.">Remove all queued</button>
                        </div>
                    }
                    <h3>Total videos: {downloads?.paginate?.total_hits} {!downloads?.paginate?.total_hits && !downloads?.message && !ignoredStatus && <p>No videos queued for download. Press rescan subscriptions to check if there are any new videos.</p>}</h3>
                    <div className={`dl-list ${viewStyle}`}>                       
                        {!isLoading && !error && !downloads?.message &&
                            downloads?.data?.map((video) => {
                                return (
                                    <div key={video?.youtube_id} className={`dl-item ${viewStyle}`}>
                                        <div className={`dl-thumb ${viewStyle}`}>
                                            <img src={`${TA_BASE_URL.server}${video?.vid_thumb_url}`} alt="video_thumb"></img>
                                            {ignoredStatus && <span>ignored</span>}
                                            {/* {% if show_ignored_only %} */}
                                                {/* <span>ignored</span> */}
                                            {!ignoredStatus && <span>queued</span>}
                                            {/* {% else %} */}
                                                {/* <span>queued</span> */}
                                            {/* {% endif %} */}
                                        </div>
                                        <div className={`dl-desc ${viewStyle}`}>
                                            <h3>{video?.title}</h3>
                                            {video?.channel_indexed && <a href={`/channel/${video?.channel_id}`}>{video?.channel_name}</a>}
                                            {/* {% if video.source.channel_indexed %} */}
                                                {/* <a href="{% url 'channel_id' video.source.channel_id %}">{{ video.source.channel_name }}</a> */}
                                            {!video?.channel_indexed && <span>{video?.channel_name}</span>}
                                            {/* {% else %} */}
                                                {/* <span>{{ video.source.channel_name }}</span> */}
                                            {/* {% endif %} */}
                                            <p>Published: {video?.published} | Duration: {video?.duration} | {video?.youtube_id}</p>
                                            {/* <p>Published: {{ video.source.published }} | Duration: {{ video.source.duration }} | {{ video.source.youtube_id }}</p> */}
                                            {ignoredStatus &&
                                                <div>
                                                    <button className="button-padding" title="Move this video to the download queue." onClick={() => handleMoveVideoQueuedIgnored(session.ta_token.token, video?.youtube_id, "pending")}>Add to queue</button>
                                                    <button className="button-padding" title="Remove this video from the ignored list." onClick={() => handleDeleteVideoQueuedIgnored(session.ta_token.token, video?.youtube_id)}>Remove</button>
                                                </div>
                                            }        
                                            {/* {% if show_ignored_only %} */}
                                                {/* <button data-id="{{ video.source.youtube_id }}" onclick="forgetIgnore(this)">Forget</button> */}
                                                {/* <button data-id="{{ video.source.youtube_id }}" onclick="addSingle(this)">Add to queue</button> */}
                                            {!ignoredStatus &&
                                                <div>
                                                    <button className="button-padding" title="Ignore this video." onClick={() => handleMoveVideoQueuedIgnored(session.ta_token.token, video?.youtube_id, "ignore")}>Ignore</button>
                                                    <button className="button-padding" title="Download this video now." onClick={() => console.log("downloadNow(this)")}>Download now</button>
                                                    <button className="button-padding" title="Remove this video from the queue." onClick={() => handleDeleteVideoQueuedIgnored(session.ta_token.token, video?.youtube_id)}>Remove</button>
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
                <div className="boxed-content">
                    <div className="pagination">
                        {pageNumber != 1 ? <a className="pagination-item" onClick={() => handleSetPageNumber(1)}>First</a> : ``}  
                        {downloads?.paginate?.prev_pages &&
                            downloads?.paginate?.prev_pages?.map((page) => {
                                return (
                                    <a key={`${page}`} className="pagination-item" onClick={() => handleSetPageNumber(page)}>{page}</a>
                            )})
                        }
                        <span>&lt; Page {pageNumber}</span>
                        <span> &gt;</span>
                        {downloads?.paginate?.next_pages &&
                            downloads?.paginate?.next_pages?.map((page) => {
                                return (
                                    <a key={`${page}`} className="pagination-item" onClick={() => handleSetPageNumber(page)}>{page}</a>
                            )})
                        }
                        {downloads?.paginate?.next_pages?.forEach((page) => 
                            <a className="pagination-item" onClick={() => handleSetPageNumber(page)}>{page}</a>
                        )}
                        {downloads?.paginate?.last_page &&
                            <a className="pagination-item" onClick={() => handleSetPageNumber(downloads?.paginate?.last_page)}> Last ({downloads?.paginate?.last_page}) </a>
                        }
                    </div>
                </div>
                {/* <script type="text/javascript" src="{% static 'progress.js' %}"></script> */}
            </Layout>
        </>
    );
};

export default Download;
