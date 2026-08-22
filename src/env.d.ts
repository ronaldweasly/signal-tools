/// <reference types="astro/client" />

type ENV = {
  ASSETS: Fetcher;
};

type Runtime = import('@astrojs/cloudflare').Runtime<ENV>;

declare namespace App {
  interface Locals extends Runtime {}
}
