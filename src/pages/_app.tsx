import { type AppType } from "next/app";
import { api } from "~/utils/api";
import { SignUpProvider } from "~/context/SignUpContext";
import Layout from "~/components/Layout";
import "~/styles/globals.css";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["cyrillic"],
  variable: "--font-sans",
});

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <main className={`font-sans ${inter.variable}`}>
      <SignUpProvider>
        <Layout >
          <Component {...pageProps} />
        </Layout>
      </SignUpProvider>
    </main>
  );
};

export default api.withTRPC(MyApp);
