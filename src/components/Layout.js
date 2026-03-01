import Header from "./Header";
import Footer from "./Footer";

export default function Layout({ children }) {
  return (
    <div style={layout}>
      <Header />

      <main style={main}>
        {children}
      </main>

      <Footer />
    </div>
  );
}

const layout = {
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
};

const main = {
  flex: 1,
};