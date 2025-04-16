module.exports = {
  reactStrictMode: true,
  // output: 'standalone'   ← REMOVE or comment this
};

module.exports = {
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: '/uploads/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
        ],
      },
    ];
  },
};
