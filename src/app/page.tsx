import { redirect } from "next/navigation";

const Home = () => {
  redirect("/auth/sign-in");
};

export default Home;
