import type { GetServerSideProps, NextPage } from "next";
import { getSession, useSession } from "next-auth/react";
import { useState } from "react";
import { dehydrate, QueryClient, useQuery } from "react-query";
import { CustomHead } from "../components/CustomHead";
import { Layout } from "../components/Layout";
import NextImage from "next/image";
import RescanIcon from "../images/icon-rescan.svg";
import DownloadIcon from "../images/icon-download.svg";
import AddIcon from "../images/icon-add.svg";
import GridViewIcon from "../images/icon-gridview.svg";
import ListViewIcon from "../images/icon-listview.svg";

type ViewStyle = "grid" | "list";

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

    return {
        props: {
            dehydratedState: dehydrate(queryClient),
            session,
        },
    };
};

const Download: NextPage = () => {

    const [viewStyle, setViewStyle] = useState<ViewStyle>("grid");

    const handleSetViewstyle = (selectedViewStyle: ViewStyle) => {
        setViewStyle(selectedViewStyle);
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
                            <div className="toggleBox">
                                <input
                                id="show_ignored_only"
                                onClick={() => console.log("toggleCheckbox(this)")}
                                type="checkbox"
                                />
                                {/* {% if not show_subed_only %} */}
                                <label htmlFor="" className="ofbtn">
                                Off
                                </label>
                                {/* {% else %} */}
                                <label htmlFor="" className="onbtn">
                                On
                                </label>
                                {/* {% endif %} */}
                            </div>
                        </div>
                        <div className="view-icons">
                            <NextImage
                                width={30}
                                height={44}
                                src={GridViewIcon}
                                alt="grid view"
                                title="Switch to grid view"
                                onClick={() => handleSetViewstyle("grid")}
                            />
                            {/* <img src="{% static 'img/icon-gridview.svg' %}" onclick="changeView(this)" data-origin="downloads" data-value="grid" alt="grid view"> */}
                            <NextImage
                                width={30}
                                height={44}
                                src={ListViewIcon}
                                alt="list view"
                                title="Switch to list view"
                                onClick={() => handleSetViewstyle("list")}
                            />
                            {/* <img src="{% static 'img/icon-listview.svg' %}" onclick="changeView(this)" data-origin="downloads" data-value="list" alt="list view"> */}
                        </div>
                    </div>
                    <div className="title-split">
                        {/* {% if show_ignored_only %} */}
                            <h2>Ignored from download</h2>
                            <button data-id="ignore" title="Delete all previously ignored videos from the queue">Delete all ignored</button>
                                {/* onclick="deleteQueue(this)" */}
                        {/* {% else %} */}
                            <h2>Download queue</h2>
                            <button data-id="pending" title="Delete all pending videos from the queue">Delete all queued</button>
                                {/* onclick="deleteQueue(this)" */}
                        {/* {% endif %} */}
                    </div>
                    {/* <h3>Total videos: {channels?.data?.length}</h3> */}
                    {/* <div className="dl-list {{ view_style }}"> */}
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
                    {/* </div> */}
                </div>
                {/* <script type="text/javascript" src="{% static 'progress.js' %}"></script> */}
            </Layout>
        </>
    );
};

export default Download;