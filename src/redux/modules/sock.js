let sockJS = new SockJS("http://localhost:8080/chatting");  // Socket connection URL
let stompClient = Stomp.over(sockJS);  // Get return

stompClient.debug= () => {};

export const ChatContainer = ({}) => {
    const [contents, setContents] = React.useState([]);
    const [username, setUsername] = React.useState('');
    const [message, setMessage] = React.useState("");

    React.useEffect(() => {
        stompClient.connect({}, () => {
            stompClient.subscribe('/topic/userEmail', (data) => {  // Room differentiation by email
                const newMessage = JSON.parse(data.body);
                addMessage(newMessage);
            });
        });
    }, [contents]);

    const handleEnter = (username, content) => {
        const newMessage = { username, content };
        stompClient.send("/app/chat/send", {}, JSON.stringify(newMessage)); // Send message
        setMessage("");
    };

    const addMessage = (message) => {
        setContents(prev => [...prev, message]);
    };

    return (
        <div className={"container"}>
            <ChatPresenter
                contents={contents}
                handleEnter={handleEnter}
                message={message}
                setMessage={setMessage}
                username={username}
                setUsername={setUsername}
            />
        </div>
    );
};
