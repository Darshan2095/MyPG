import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import "../globals.css";
import Providers from "../providers";



export const metadata = {
  title: "My App - User Area",
  description: "This is the user area layout",
  keywords: ["user", "layout", "my app"],
}

metadata.author = "Darshan Babariya";
metadata.twitter = {
  card: "summary_large_image",
  title: "My App - User Area",
  description: "This is the user area layout",
  images: ["/static/twitter-image.png"],
  creator: "@darshan_babariya",
  url: "https://myapp.com",
}
metadata.openGraph = {
  title: "My App - User Area",
  description: "This is the user area layout",
  url: "https://myapp.com",
  siteName: "My App",
  images: [
    {
      url: "/static/og-image.png",
      width: 800,
      height: 600,
    },
  ],
  locale: "en_US",
  type: "website",  
}


export default function RootLayout({ children }) {
  
  return (
    
         <Providers>
      
        <Navbar />
        {children}

        <Footer></Footer>
        </Providers>
      
  );
}
