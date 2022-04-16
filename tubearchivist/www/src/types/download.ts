export interface Download {
  data: Datum[];
  config: Config;
  paginate: boolean;
}

export interface Config {
  archive: Archive;
  default_view: DefaultView;
  subscriptions: Subscriptions;
  downloads: Downloads;
  application: Application;
  scheduler: Scheduler;
}

export interface Application {
  app_root: string;
  cache_dir: string;
  videos: string;
  file_template: string;
  colors: string;
  enable_cast: boolean;
  REDIS_HOST: string;
  es_url: string;
  es_auth: string[];
  HOST_UID: number;
  HOST_GID: number;
}

export interface Archive {
  sort_by: string;
  sort_order: string;
  page_size: number;
}

export interface DefaultView {
  home: string;
  channel: string;
  downloads: string;
  playlist: string;
}

export interface Downloads {
  limit_count: boolean;
  limit_speed: boolean;
  sleep_interval: number;
  autodelete_days: boolean;
  format: boolean;
  add_metadata: boolean;
  add_thumbnail: boolean;
  subtitle: boolean;
  subtitle_source: boolean;
  subtitle_index: boolean;
  throttledratelimit: boolean;
  integrate_ryd: boolean;
  integrate_sponsorblock: boolean;
}

export interface Scheduler {
  update_subscribed: boolean;
  download_pending: boolean;
  check_reindex: CheckReindex;
  check_reindex_days: number;
  thumbnail_check: CheckReindex;
  run_backup: CheckReindex;
  run_backup_rotate: number;
}

export interface CheckReindex {
  minute: string;
  hour: string;
  day_of_week: string;
}

export interface Subscriptions {
  auto_search: boolean;
  auto_download: boolean;
  channel_size: number;
}

export interface Datum {
  active: boolean;
  category: Category[];
  channel: Channel;
  date_downloaded: number;
  description: string;
  media_url: string;
  player: Player;
  playlist: Playlist[];
  published: string;
  stats: Stats;
  tags: string[];
  title: string;
  vid_last_refresh: LastRefresh;
  vid_thumb_base64: string;
  vid_thumb_url: string;
  youtube_id: string;
}

export enum Category {
  ScienceTechnology = "Science & Technology",
}

export interface Channel {
  channel_active: boolean;
  channel_banner_url: ChannelBannerURL;
  channel_description: string;
  channel_id: ChannelID;
  channel_last_refresh: LastRefresh;
  channel_name: ChannelName;
  channel_subs: number;
  channel_subscribed: boolean;
  channel_thumb_url: ChannelThumbURL;
  channel_tvart_url: boolean;
  channel_views: number;
  channel_indexed: boolean;
}

export enum ChannelBannerURL {
  CacheChannelsUCFhXFikryT4AFcLkLw2LBLABannerJpg = "/cache/channels/UCFhXFikryT4aFcLkLw2LBLA_banner.jpg",
}

export enum ChannelID {
  UCFhXFikryT4AFcLkLw2LBLA = "UCFhXFikryT4aFcLkLw2LBLA",
}

export enum LastRefresh {
  The05APR2022 = "05 Apr, 2022",
}

export enum ChannelName {
  NileRed = "NileRed",
}

export enum ChannelThumbURL {
  CacheChannelsUCFhXFikryT4AFcLkLw2LBLAThumbJpg = "/cache/channels/UCFhXFikryT4aFcLkLw2LBLA_thumb.jpg",
}

export interface Player {
  watched: boolean;
  duration: number;
  duration_str: string;
}

export enum Playlist {
  PLbaramj7Nly5K5AsvQoI9PJQhy47PfDAF = "PLbaramj7Nly5K5AsvQoI9PJQhy47pfDAf",
}

export interface Stats {
  view_count: number;
  like_count: number;
  dislike_count: number;
  average_rating: null;
}
