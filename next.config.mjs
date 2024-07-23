/** @type {import('next').NextConfig} */
const nextConfig = {
  //redireces devolver un objeto de donde va un pagina
  redirects() {
    return [
      {
        source: "/",
        destination: "/ListUser",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
