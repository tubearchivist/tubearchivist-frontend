export interface Videos {
  data: Datum[];
  config: Config;
  paginate: Paginate;
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
  grid_items: number;
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
  cookie_import: boolean;
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
  category: string[];
  channel: Channel;
  date_downloaded: number;
  description: string;
  media_url: string;
  player: Player;
  published: string;
  stats: Stats;
  tags: string[];
  title: string;
  vid_last_refresh: string;
  vid_thumb_base64: boolean;
  vid_thumb_url: string;
  youtube_id: string;
}

export interface Channel {
  channel_active: boolean;
  channel_banner_url: string;
  channel_description: string;
  channel_id: string;
  channel_last_refresh: string;
  channel_name: string;
  channel_subs: number;
  channel_subscribed: boolean;
  channel_thumb_url: string;
  channel_tvart_url: boolean;
  channel_views: number;
}

export interface Player {
  watched: boolean;
  duration: number;
  duration_str: string;
}

export interface Stats {
  view_count: number;
  like_count: number;
  dislike_count: number;
  average_rating: null;
}

export interface Paginate {
  page_size: number;
  page_from: number;
  prev_pages: boolean;
  current_page: number;
  max_hits: boolean;
  last_page: boolean;
  next_pages: any[];
  total_hits: number;
}
