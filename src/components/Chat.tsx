import { GET_USER_BY_EMAIL } from "@/apollo/query";
// import { onMessage } from "@/apollo/subscription";
import CircleContext from "@/controller/CircleController";
import { useQuery } from "@apollo/client";
import { useContext, useEffect } from "react";

function Chat() {
  // const [chatMessages, setChatMessages] = useState([]);
  const { state } = useContext(CircleContext);
  const getUser = useQuery(GET_USER_BY_EMAIL);
  // const { data, loading, error } = useSubscription(onMessage, {
  //   variables: { roomId: "1" },
  // });

  // useEffect(() => {
  //   console.log("Subscription data:", data);

  //   if (data && data.broadcast) {
  //     setChatMessages((prevMessages) => [
  //       ...prevMessages,
  //       {
  //         message: data.broadcast.message,
  //         roomId: data.broadcast.roomId,
  //         username: data.broadcast.username,
  //       },
  //     ]);
  //   }
  // }, [data]);
  useEffect(() => {
    console.log(getUser.data);
  });
  const { user } = state;
  // console.log(chatMessages);
  return (
    <div>
      {user?.username}
      {/* {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && (
        <ul>
          {chatMessages.map((message, index) => (
            <li key={index}>
              <strong>{message.username}</strong>: {message.message}
            </li>
          ))}
        </ul>
      )} */}
    </div>
  );
}

export default Chat;
