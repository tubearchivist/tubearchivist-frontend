export interface Channel {
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
