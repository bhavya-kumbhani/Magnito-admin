// const protocol = "http";
// const host = "192.168.29.77:5050/api/v1";

const protocol = "https";
const host = "api.magnitochemicals.com/api/v1"; // for live
// const host = "api.magnito.rejoicehub.com/api/v1";

const port = "";
const trailUrl = "";

const hostUrl = `${protocol}://${host}${port ? ":" + port : ""}/`;
const endpoint = `${protocol}://${host}${port ? ":" + port : ""}${trailUrl}`;

export default {
  protocol: protocol,
  host: host,
  port: port,
  apiUrl: trailUrl,
  endpoint: endpoint,
  hostUrl: hostUrl,
};
