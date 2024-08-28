import { SocketProvider } from "../../context/SocketProvider";
import Layout from "./Layout";

const DosenBimbinganChat = () => {
  return (
    <div>
    <SocketProvider>
      <Layout />
    </SocketProvider></div>
  )
}

export default DosenBimbinganChat